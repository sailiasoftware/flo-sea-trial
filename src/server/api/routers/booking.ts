import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { catchTrpcError } from "@/utils/server";

export const bookingRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		try {
			const bookings = await ctx.db.booking.findMany({
				include: {
					activities: {
						include: {
							activity: {
								include: {
									ressources: true,
								},
							},
						},
					},
					user: true,
				},
			});

			return bookings;
		} catch (error) {
			catchTrpcError(error);
		}
	}),

	create: publicProcedure
		.input(
			z.object({
				activityId: z.number(),
				userEmail: z.email(),
				bookingStart: z.date(),
				bookingEnd: z.date(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const { activityId, bookingStart, bookingEnd, userEmail } = input;

				const transaction = await ctx.db.$transaction(async (db) => {
					const activity = await db.activity.findUnique({
						where: {
							id: activityId,
						},
						include: {
							ressources: true,
						},
					});

					if (!activity) {
						throw new Error("Activity not found");
					}

					const { ressources } = activity;

					// 1. Fetch internal ressource, including the available items
					// @TODO - This should be wrapped in Promises (create async wrapper func)
					for await (const ressource of ressources) {
						const { quantity, ressourceId } = ressource;

						const internalRessource = await ctx.db.ressource.findUnique({
							where: {
								id: ressourceId,
							},
							include: {
								items: {
									where: {
										OR: [
											// Item is not booked at all
											{
												AND: [{ bookedAt: null }, { bookedUntil: null }],
											},
											// Item's booking ends before booking starts
											{
												bookedUntil: { lt: bookingStart },
											},
											// Item's booking starts after booking ends
											{
												bookedAt: { gt: bookingEnd },
											},
										],
									},
								},
							},
						});

						if (!internalRessource) {
							throw new Error("Ressource not found");
						}

						// 2. Check if the required quantity of items is availabe
						const { items } = internalRessource;
						console.log("ITEMS", items);
						if (items.length < quantity) {
							throw new Error("Not enough items available");
						}

						// 3. Change the status of the available items to "BOOKED"
						const iProms = [];

						for (let i = 0; i < quantity; i++) {
							const it = items[i];
							if (it) {
								iProms.push(
									await ctx.db.ressourceItem.update({
										where: {
											id: it.id,
										},
										data: {
											bookedAt: bookingStart,
											bookedUntil: bookingEnd,
										},
									}),
								);
							}
						}
						await Promise.all(iProms);
					}

					// 4. Finally, create the booking
					// @TODO - (currently with a fake user name)
					const booking = await ctx.db.booking.create({
						data: {
							name: `Booking ${activity?.name}`,
							starts: bookingStart,
							ends: bookingEnd,
							activities: {
								create: {
									activityId,
								},
							},
							user: {
								connectOrCreate: {
									where: {
										email: userEmail,
									},
									create: {
										name: "John Doe",
										email: userEmail,
									},
								},
							},
						},
					});

					if (!booking) {
						throw new Error("Booking not created");
					}

					return booking;
				});

				if (!transaction) {
					throw new Error("Booking not created");
				}

				return transaction;
			} catch (error) {
				catchTrpcError(error);
			}
		}),
});
