import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ressourceRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		const ressources = await ctx.db.ressource.findMany({
			include: {
				items: true,
			},
		});

		return ressources;
	}),
});
