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
						schedules: true
					},
				});

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
				schedules: z.array(z.object({
					start: z.date(),
					end: z.date(),
					weekday: z.enum(Day).optional(),
					date: z.date().optional(),
					repeat: z.enum(RepeatType).optional(),
				})),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, ressources } = input;

			try {
				const activity = await ctx.db.activity.create({
					data: {
						name: name,
						schedules: {	
							create: input.schedules.map((s) => ({
								starts: s.start,
								ends: s.end,
								weekday: s.weekday,
								date: s.date,
							})),
						},
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
