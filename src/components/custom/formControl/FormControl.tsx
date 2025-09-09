"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils";
import { Input } from "../input";
import type { FormControlProps } from "./types";
import { Label } from "@/components/ui/label";

/**
 * -----------------------------------------------------------
 *   Form Control
 * -----------------------------------------------------------
 * Renders a form control with an optional label. Furthermore, it
 * autimatically adjusts the input field behaviour on type `date`
 * in such a way, that picker is only shown on focus.
 * Renders an error message if provided.
 *
 * @returns React Component
 */
export const FormControl: React.FC<FormControlProps> = (props) => {
	const { className, name, label, description, error, type, ...inputProps } =
		props;

	const [showError, setShowError] = useState(error !== undefined);

	const isInputType = useCallback(
		(matchType: typeof type) => matchType === type,
		[type],
	);

	useEffect(() => {
		setShowError(error !== undefined);
	}, [error]);

	return (
		<div
			className={cn(
				`flex flex-col gap-2 ${showError ? "data-[slot=input]:*:border-red-600" : ""}`,
				className,
			)}
		>
			{label && <Label htmlFor={`${name}-input`}>{label}</Label>}
			{description && (
				<p className="text-muted-foreground text-sm italic">{description}</p>
			)}
			<Input
				{...inputProps}
				name={name}
				type={
					isInputType("date") ||
					isInputType("datetime-local") ||
					isInputType("currency")
						? "text"
						: type
				}
				onBlur={
					isInputType("date") || isInputType("datetime-local")
						? (e) => {
								e.target.type = "text";
							}
						: undefined
				}
				onFocus={
					isInputType("date") || isInputType("datetime-local")
						? (e) => {
								e.target.type = type;
							}
						: undefined
				}
				onChange={(e) => {
					showError && setShowError(false);

					if (isInputType("currency") && !showError) {
						const convert = new Intl.NumberFormat("de", {
							style: "decimal",
							useGrouping: true,
							minimumFractionDigits: 2,
						});

						// Remove all separators from the currency string
						const val = e.target.value.replace(/[^\d]/g, "");
						const price = Number.parseInt(val === "" ? "0" : val) / 100;

						e.target.value = convert.format(price);
					}
				}}
				data-slot="input"
				id={`${name}-input`}
			/>
			{showError && <p className="text-red-600">{error}</p>}
		</div>
	);
};
