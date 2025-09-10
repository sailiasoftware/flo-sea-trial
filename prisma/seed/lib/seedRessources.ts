import type { SeedParams } from "../types";

const ressources = [
	{
		name: "Laser",
		numItems: 5,
	},
	{
		name: "Single Kayak",
		numItems: 3,
	},
	{
		name: "Double Kayak",
		numItems: 2,
	},
	{
		name: "Paddle",
		numItems: 6,
	},
	{
		name: "Live Jacket",
		numItems: 25,
	},
];

export const seedRessources = async (params: SeedParams) => {
	const { prisma } = params;

	const resultPromises = [];
	for (const ressource of ressources) {
		resultPromises.push(
			prisma.ressource.create({
				data: {
					name: ressource.name,
					items: {
						create: Array.from({ length: ressource.numItems }, (_, i) => ({
							status: "AVAILABLE",
						})),
					},
				},
			}),
		);
	}

	const results = await Promise.all(resultPromises);
	return results;
};
