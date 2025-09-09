"use client";

import { useMemo, useState } from "react";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as UiSelect,
} from "@/components/ui/select";

import type { SelectProps } from "./types";

/**
 * -----------------------------------------------------------
 *   Select
 * -----------------------------------------------------------
 * Renders a select component.
 *
 * @returns React Component
 */
export const Select: React.FC<SelectProps> = ({
	name,
	options,
	placeholder,
	error,
	...selectProps
}) => {
	const [isChanged, setIsChanged] = useState(false);

	// Show/hide errors
	const showError = useMemo(() => {
		if (error && isChanged) {
			return false;
		}

		if (error) {
			return true;
		}

		return false;
	}, [isChanged, error]);

	return (
		<>
			<UiSelect name={name}>
				<SelectTrigger
					className={showError ? "border border-red-600" : undefined}
					onFocus={() => !isChanged && setIsChanged(true)}
					{...selectProps}
				>
					<SelectValue placeholder={placeholder || "Choose"} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.id || option.label} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</UiSelect>
			{showError && <p className="text-red-600">{error}</p>}
		</>
	);
};
