import type { SelectTriggerProps } from "@radix-ui/react-select";

type SelectOptions = {
	id?: string | number;
	value: string;
	label: string;
}[];

export interface SelectProps extends Omit<SelectTriggerProps, "onChange"> {
	name: string;
	placeholder?: string;
	options: SelectOptions;
	error?: string;
	multiple?: boolean;
	value?: string | string[];
	onChange?: (value: string | string[]) => void;
}

export interface SearchableSelectProps
	extends Pick<
		SelectProps,
		"name" | "placeholder" | "options" | "error" | "className"
	> {}
