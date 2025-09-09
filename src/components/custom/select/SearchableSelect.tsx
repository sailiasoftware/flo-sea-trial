"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/client";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

import type { SearchableSelectProps } from "./types";

/**
 * -----------------------------------------------------------
 *   Searchable Select
 * -----------------------------------------------------------
 * Renders a searchable select component.
 *
 * @returns React Component
 */
export const SearchableSelect: React.FC<SearchableSelectProps> = ({
	name,
	options,
	placeholder,
	className,
	error,
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<>
			<input type="hidden" name={name} value={value} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{value
							? options.find((option) => option.value === value)?.label
							: placeholder}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder={placeholder} />
						<CommandList>
							<CommandEmpty>Nothing found</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										keywords={[option.label]}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}
									>
										{option.label}
										<Check
											className={cn(
												"ml-auto",
												value === option.value ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
};
