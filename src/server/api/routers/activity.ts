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

	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1, { message: "Name is required" }),
				ressources: z.array(z.object({ id: z.number(), quantity: z.number() })),
        start: z.date(),
        end: z.date(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, ressources } = input;

			try {
				const activity = await ctx.db.activity.create({
					data: {
						name: name,
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
			} catch (error) {
				catchTrpcError(error);
			}
		}),
});
