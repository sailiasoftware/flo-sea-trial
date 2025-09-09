"use server";

import type { Activity } from "@prisma/client";
import type z from "zod";
import { db } from "@/server/db";
import type { TAction } from "@/types";
import { getZodErrors, handleFormActionError } from "@/utils/server";
import { createActivitySchema } from "./createActivitySchema";

/**
 * -----------------------------------------------------------
 *  Create Activity Action
 * -----------------------------------------------------------
 *
 * @param params  The input params.
 * @returns       @todo - add return
 */
export const createActivityAction: TAction<
	z.infer<typeof createActivitySchema>,
	Activity
> = async (_, data) => {
	const validation = createActivitySchema.safeParse(data);

	try {
		if (validation.success) {
			const activity = await db.activity.create({
				data: {
					name: validation.data.name,
					ressources: {
						create: validation.data.ressourceIds.map((r) => ({
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
				throw new Error("Failed to create activity");
			}

			return {
				success: activity,
			};
		}

		const zodErrors = await getZodErrors(validation.error.issues);

		// Return result including validation erros
		return {
			data: validation.data,
			zodError: zodErrors,
		};
	} catch (error) {
		console.log(error);
		const err = await handleFormActionError({
			error: error,
			data: validation.data,
		});

		return err;
	}
};
