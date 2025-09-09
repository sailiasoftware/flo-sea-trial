import type { Ressource } from "@prisma/client";
import type { CallbackType } from "../types";

// MORE COMPLEX! WILL CONTINUE LATER IF TIME

export const seedActivities: CallbackType = async (params, prevResults) => {
	const { prisma } = params;

	const ressources = prevResults?.get("Ressources") as Ressource[] | undefined;

	if (ressources) {
		const boats = ressources.filter((ressource) => ressource.name === "Laser");
		const sKayaks = ressources.filter(
			(ressource) => ressource.name === "Single Kayak",
		);
		const dKayaks = ressources.filter(
			(ressource) => ressource.name === "Double Kayak",
		);
		const paddles = ressources.filter(
			(ressource) => ressource.name === "Paddle",
		);
		const liveJackets = ressources.filter(
			(ressource) => ressource.name === "Live Jacket",
		);

		const activities = [
			{
				name: "3 person boat hire",
				ressources: [boats.slice()],
			},
			{
				name: "2 person boat hire",
			},
			{
				name: "1 person boat hire",
			},
			{
				name: "Single-person kayak",
			},
			{
				name: "Double-person kayak",
			},
		];
	}

	prisma;

	const result = [];
	// for await (const role of UtilityRole.ROLES) {
	// 	const utilityRole = await prisma.role.create({
	// 		data: {
	// 			id: role,
	// 			isUtilityRole: true,
	// 			permissions: new UtilityRole().getPermissions(role),
	// 		},
	// 	});

	// 	result.push(utilityRole);
	// }

	// return result;
	return [];
};
