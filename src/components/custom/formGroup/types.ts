import type { HTMLAttributes, PropsWithChildren } from "react";

export interface FormGroupProps
	extends HTMLAttributes<HTMLFieldSetElement>,
		PropsWithChildren {
	legend?: string;
}
