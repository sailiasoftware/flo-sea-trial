"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import type { $ZodIssue } from "zod/v4/core";
import type { THandleFormActionErrorParams } from "@/types";

/**
 * -----------------------------------------------------------
 *  Get Zod Errors
 * -----------------------------------------------------------
 * Returns an object of Zod errors keyed by the field names of
 * a specific Zod schema.
 *
 *
 * @param params  The input params.
 * @returns       @todo - add return
 * -----------------------------------------------------------
 *
 * @example
 * // Example usage
 * const inputFields = {
 *   name: data.get("name"),
 *   email: data.get("email"),
 * }
 *
 * const zodErrors = getZodErrors<typeof inputFields>(validation.error.issues);
 * cosole.log(zodErrors?.name);
 * //                    ^ `name` is inferred
 */
export const getZodErrors = async <T extends Record<string, unknown>>(
	// zodIssues?: TZodIssue<string | number>[],
	zodIssues?: $ZodIssue[],
): Promise<Record<keyof T, string> | undefined> => {
	if (!zodIssues) {
		return;
	}

	const errors: Record<string, string> = {};
	for (const zodIssue of zodIssues) {
		errors[zodIssue.path[0] as string] = zodIssue.message;
	}

	return errors as Record<keyof T, string>;
};

/**
 * -----------------------------------------------------------
 *  Handle Form Action Error
 * -----------------------------------------------------------
 * @todo - write a description! Don't be lazy!
 *
 * @param params  The input params.
 * @returns       @todo - add return
 */
export const handleFormActionError = async <T extends Record<string, unknown>>(
	params: THandleFormActionErrorParams<T>,
	options?: { convertErrorMsgs?: { needle: string; msg: string }[] },
) => {
	const { error, data } = params;

	const convert = (original: string) => {
		const conv = options?.convertErrorMsgs;
		if (conv) {
			for (const errs of conv) {
				if (original.includes(errs.needle)) {
					return errs.msg;
				}
			}

			return original;
		}

		return original;
	};

	if (error instanceof PrismaClientKnownRequestError) {
		return {
			data: data,
			error: convert((error.meta?.cause as string) || error.message),
		};
	}

	if (error instanceof TRPCError) {
		return {
			data: data,
			error: convert(error.message),
		};
	}

	if (error instanceof Error) {
		return {
			data: data,
			error: convert(error.message),
		};
	}

	return {
		data: data,
		error: "An unknown error occurred.",
	};
};
