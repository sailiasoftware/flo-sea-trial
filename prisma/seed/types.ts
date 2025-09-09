import type { PrismaClient } from "@prisma/client";

export type SeedParams = {
	prisma: PrismaClient;
};

export type SeedResults = Map<string, Record<string, unknown>[]>;

export type CallbackType = (
	params: SeedParams,
	prevResult?: SeedResults,
) => Promise<Record<string, unknown>[]>;
