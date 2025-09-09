import type { SelectTriggerProps } from "@radix-ui/react-select";

type SelectOptions = {
	id?: string | number;
	value: string;
	label: string;
}[];

export interface SelectProps extends SelectTriggerProps {
	name: string;
	placeholder?: string;
	options: SelectOptions;
	error?: string;
}

export interface SearchableSelectProps
	extends Pick<
		SelectProps,
		"name" | "placeholder" | "options" | "error" | "className"
	> {}
