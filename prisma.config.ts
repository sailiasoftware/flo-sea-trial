import "dotenv/config";
import type { PrismaConfig } from "prisma";

export default {
	schema: "./prisma",
	migrations: {
		seed: "bun run prisma/seed/seed.ts",
	},
} satisfies PrismaConfig;
