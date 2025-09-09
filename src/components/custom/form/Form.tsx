import { cn } from "@/utils/client";
import type { FormProps } from "./types";

/**
 * -----------------------------------------------------------
 *   Form
 * -----------------------------------------------------------
 * A customisable form component.
 *
 * @returns React Component
 */
export const Form: React.FC<FormProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<form
			className={cn("flex w-full flex-col gap-4", className)}
			autoComplete="on"
			{...props}
		>
			{children}
		</form>
	);
};
