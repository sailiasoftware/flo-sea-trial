import type { FormErrorProps } from "./types";

/**
 * -----------------------------------------------------------
 *   Form Error
 * -----------------------------------------------------------
 * @todo write a description
 *
 * @returns React Component
 */
export const FormError: React.FC<FormErrorProps> = ({
	error,
	...paragraphProps
}) => {
	const { className, ...rest } = paragraphProps;

	if (!error) {
		return null;
	}

	return <p className="mt-2 text-destructive text-sm">{error}</p>;
};
