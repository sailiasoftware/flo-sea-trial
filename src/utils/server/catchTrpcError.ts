import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

/**
 * 4. ERROR HANDLING
 *
 * This is a helper function to catch Prisma errors and throw them as tRPC errors.
 */
export const catchTrpcError = (error: unknown) => {
	if (error instanceof PrismaClientKnownRequestError) {
		throw new TRPCError({
			message: error.message,
			code: "BAD_REQUEST",
			cause: error.cause,
		});
	}

	if (error instanceof Error) {
		throw new TRPCError({
			message: error.message,
			code: "INTERNAL_SERVER_ERROR",
			cause: error.cause,
		});
	}

	throw new TRPCError({
		code: "INTERNAL_SERVER_ERROR",
		message: "An unexpected error occurred, please try again later.",
		cause: "unidentified",
	});
};
