import type {
	DetailedHTMLProps,
	FormHTMLAttributes,
	PropsWithChildren,
} from "react";

export interface FormProps
	extends DetailedHTMLProps<
			FormHTMLAttributes<HTMLFormElement>,
			HTMLFormElement
		>,
		PropsWithChildren {}
