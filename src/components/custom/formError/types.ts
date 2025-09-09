import type { HTMLAttributes } from "react";

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
	error?: string;
}
