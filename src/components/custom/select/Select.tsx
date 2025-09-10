"use client";

import { useMemo, useState } from "react";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as UiSelect,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, X } from "lucide-react";

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
	onChange,
	multiple = false,
	value,
	...selectProps
}) => {
	const [isChanged, setIsChanged] = useState(false);
	const [open, setOpen] = useState(false);

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

	// Single select component (existing functionality)
	if (!multiple) {
		return (
			<>
				<UiSelect name={name} onValueChange={onChange as (value: string) => void} value={value as string}>
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
	}

	// Multiple select component
	const selectedValues = Array.isArray(value) ? value : [];
	
	const handleMultipleChange = (optionValue: string, checked: boolean) => {
		let newValues: string[];
		if (checked) {
			newValues = [...selectedValues, optionValue];
		} else {
			newValues = selectedValues.filter(v => v !== optionValue);
		}
		onChange?.(newValues);
	};

	const removeValue = (valueToRemove: string) => {
		const newValues = selectedValues.filter(v => v !== valueToRemove);
		onChange?.(newValues);
	};

	const getDisplayText = () => {
		if (selectedValues.length === 0) {
			return placeholder || "Choose";
		}
		if (selectedValues.length === 1) {
			const option = options.find(opt => opt.value === selectedValues[0]);
			return option?.label || selectedValues[0];
		}
		return `${selectedValues.length} selected`;
	};

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={`w-full justify-between ${showError ? "border-red-600" : ""}`}
						onFocus={() => !isChanged && setIsChanged(true)}
						{...selectProps}
					>
						<span className="truncate">{getDisplayText()}</span>
						<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
					<div className="max-h-60 overflow-auto">
						{options.map((option) => {
							const isSelected = selectedValues.includes(option.value);
							return (
								<div
									key={option.id || option.label}
									className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
									onClick={(e) => {
										e.preventDefault();
										handleMultipleChange(option.value, !isSelected);
									}}
								>
									<Checkbox
										id={`${name}-${option.value}`}
										checked={isSelected}
										onCheckedChange={(checked) => {
											handleMultipleChange(option.value, checked as boolean);
										}}
										onClick={(e) => e.stopPropagation()}
									/>
									<label
										htmlFor={`${name}-${option.value}`}
										className="flex-1 cursor-pointer text-sm"
										onClick={(e) => e.stopPropagation()}
									>
										{option.label}
									</label>
								</div>
							);
						})}
					</div>
				</PopoverContent>
			</Popover>
			
			{/* Selected items display */}
			{selectedValues.length > 0 && (
				<div className="flex flex-wrap gap-1 mt-2">
					{selectedValues.map((val) => {
						const option = options.find(opt => opt.value === val);
						return (
							<div
								key={val}
								className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
							>
								<span>{option?.label || val}</span>
								<button
									type="button"
									onClick={() => removeValue(val)}
									className="hover:bg-secondary-foreground/20 rounded-full p-0.5"
								>
									<X className="h-3 w-3" />
								</button>
							</div>
						);
					})}
				</div>
			)}
			
			{showError && <p className="text-red-600">{error}</p>}
		</>
	);
};
