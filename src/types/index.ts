// --------------------------
//  Action Types
// -------------------------

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

/**
 *  Generic Type for Form State
 * ------------------------------------
 * This type is used with the `useFormState` hook and defines
 * `prevState` and `state`.
 */
export type TFormState<Data, Success> = {
	data?: Data;
	success?: Success;
	error?: string;
	zodError?: Record<keyof Data, string>;
};

/**
 *  Generic Type for Form Actions
 * ------------------------------------
 * This method only works in conjuction with `zod-form-state`. By using
 * this package, the `FormData` interface can be correctly inferred and
 * passed to the return statment of the form action.
 */
export type TAction<Data, Success> = (
	prevState: TFormState<Data, Success>,
	data: FormData,
) => Promise<TFormState<Data, Success>>;

export type THandleFormActionErrorParams<T extends Record<string, unknown>> = {
	error: unknown;
	data?: T;
};

/**
 * Helper Type for Router Outputs. Use this to infer the output of a specific
 * TRPC procedure.
 *
 * @usage `type OutputExample = RouterOutput["tenant"]["getCurrentTenant"];`
 */
export type RouterOutput = inferRouterOutputs<AppRouter>;

/**
 * Helper Type for Router Inputs. Use this to infer the input of a specific
 * TRPC procedure.
 *
 * @usage `type InputExample = RouterInput["tenant"]["getCurrentTenant"];`
 */
export type RouterInput = inferRouterInputs<AppRouter>;
