import { Day, RepeatType } from "@prisma/client";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { catchTrpcError } from "@/utils/server";

export const activityRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		const activities = await ctx.db.activity.findMany();
		return activities;
	}),

	listForBooking: publicProcedure.query(async ({ ctx }) => {
		const activities = await ctx.db.activity.findMany({
			include: {
				ressources: {
					include: {
						ressource: {
							include: {
								items: {
									where: {
										status: { not: "DAMAGED" },
									},
								},
							},
						},
					},
				},
			},
		});

		return activities;
	}),

	get: publicProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { id } = input;

			try {
				const activity = await ctx.db.activity.findUnique({
					where: {
						id: id,
					},
					include: {
						bookings: {
							include: {
								booking: true,
							},
						},
					},
				});

				console.dir(activity, { depth: null });

				if (!activity) {
					throw new Error("Activity not found");
				}

				return activity;
			} catch (error) {
				catchTrpcError(error);
			}
		}),

	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1, { message: "Name is required" }),
				ressources: z.array(z.object({ id: z.number(), quantity: z.number() })),
				startTime: z.date(),
				endTime: z.date(),
				startDate: z.date().optional(),
				repeat: z.enum(RepeatType).optional(),
				weekdays: z.array(z.enum(Day)).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, ressources } = input;

			console.log(input);

			try {
				const activity = await ctx.db.activity.create({
					data: {
						name: name,
						starts: input.startTime,
						ends: input.endTime,
						date: input.startDate,
						repeat: input.repeat,
						days: input.weekdays,
						ressources: {
							create: ressources.map((r) => ({
								quantity: r.quantity,
								ressource: {
									connect: {
										id: r.id,
									},
								},
							})),
						},
					},
				});

				if (!activity) {
					throw new Error("Activity not created");
				}

				return activity;
			} catch (error) {
				catchTrpcError(error);
			}
		}),
});
