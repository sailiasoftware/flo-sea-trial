import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { catchTrpcError } from "@/utils/server";

export const bookingRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				activityId: z.number(),
				bookedSlot: z.date(),
				userEmail: z.email(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const { activityId, bookedSlot, userEmail } = input;

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

					// Set booking period
					const bookedAt = new Date(bookedSlot);
					bookedAt.setHours(activity.starts.getHours());
					bookedAt.setMinutes(activity.starts.getMinutes());
					bookedAt.setSeconds(activity.starts.getSeconds());

					const bookedUntil = new Date(bookedSlot);
					bookedUntil.setHours(activity.ends.getHours());
					bookedUntil.setMinutes(activity.ends.getMinutes());
					bookedUntil.setSeconds(activity.ends.getSeconds());

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
												bookedUntil: { lt: bookedAt },
											},
											// Item's booking starts after booking ends
											{
												bookedAt: { gt: bookedUntil },
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
											bookedAt: bookedAt,
											bookedUntil: bookedUntil,
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
							slot: bookedSlot,
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
