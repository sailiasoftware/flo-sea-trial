import { cn } from "@/utils";
import type { FormGroupProps } from "./types";

/**
 * -----------------------------------------------------------
 *   Form Group
 * -----------------------------------------------------------
 * A wrapper element for form elements. If you set the `legend`
 * property, it will render a `legend` element with the text
 * in the upper left corner and render a border around the
 * content.
 *
 * @returns React Component
 */
export const FormGroup: React.FC<FormGroupProps> = ({
	children,
	className,
	legend,
	...props
}) => {
	return (
		<fieldset
			className={cn(
				"flex flex-col gap-4 p-1",
				legend && "rounded border border-text-forground p-4",
				className,
			)}
			{...props}
		>
			{legend && (
				<legend className="text-muted-foreground text-xs">{legend}</legend>
			)}
			{children}
		</fieldset>
	);
};
