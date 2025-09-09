import type { InputHTMLAttributes } from "react";
import type { InputProps } from "../input/Input";

type RequiredInputProps = Required<Pick<InputProps, "name">>;
type InputType = Extract<InputProps["type"], string> | "currency";

export interface FormControlProps
	extends Omit<InputProps, "name" | "type">,
		RequiredInputProps {
	type: InputType;
	label?: string;
	error?: string;
	description?: string;
	inputClassName?: InputHTMLAttributes<HTMLInputElement>["className"];
}
