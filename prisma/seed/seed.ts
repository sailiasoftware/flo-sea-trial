import { PrismaClient } from "@prisma/client";
import { seedActivities, seedRessources } from "./lib";
import type { CallbackType, SeedResults } from "./types";

/**
 * ------------------------------------------------------
 *  CLASS: Seed
 * ------------------------------------------------------
 * A very rudimentary class to seed the database. This class
 * registers seeders and runs them in sequence. If an error
 * occurs during seeding, the process will print the error and
 * exit with a status code of 1. Furthermore, the class will
 * print the results of the seeding process.
 * ------------------------------------------------------
 */
class Seed {
	/**
	 * The Prisma client instance.
	 * We will use this to interact with the database.
	 */
	private prisma: PrismaClient;

	/**
	 * An array of seeders. Each seeder is an object with a
	 * `seed` property that describes the seeder and a `callback`
	 * property that is a function that seeds the database.
	 */
	private seeders: {
		seed: string;
		callback: CallbackType;
	}[];

	/**
	 * A record of results for each seeder. Each result is an array of
	 * objects that describe the result of the seeding process.
	 */
	private resultMap: SeedResults = new Map();

	/**
	 * A record of errors for each seeder.
	 */
	private seedErr: Record<string, Error> = {};

	/**
	 * The class constructor.
	 */
	public constructor() {
		this.prisma = new PrismaClient();
		this.seeders = this.registerSeeders();
	}

	/**
	 * Registers seeders.
	 * @returns An array of seeders.
	 */
	private registerSeeders = () => {
		return [
			{
				seed: "Ressources",
				callback: seedRessources,
			},
			// {
			// 	seed: "Activities",
			// 	callback: seedActivities,
			// },
		];
	};

	/**
	 * Seeds the database.
	 */
	public seed = async () => {
		for await (const seeder of this.seeders) {
			try {
				const result = await seeder.callback(
					{ prisma: this.prisma },
					this.resultMap,
				);

				this.resultMap.set(seeder.seed, result);
			} catch (error) {
				if (error instanceof Error) {
					this.seedErr[seeder.seed] = error;
				} else {
					this.seedErr[seeder.seed] = new Error("An unknown error occurred.");
				}
			}
		}

		await this.prisma.$disconnect();

		if (Object.keys(this.seedErr).length > 0) {
			console.error(this.seedErr);
			process.exit(1);
		}

		console.log("\n\nSEEDING RESULTS -------------------------------");
		console.log(this.resultMap.entries());
		process.exit(0);
	};
}

new Seed().seed();
