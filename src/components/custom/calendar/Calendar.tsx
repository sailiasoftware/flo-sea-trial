"use client";

import { Day } from "@prisma/client";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
} from "react-day-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarProps {
	className?: string;
	classNames?: React.ComponentProps<typeof DayPicker>["classNames"];
	showOutsideDays?: boolean;
	captionLayout?: React.ComponentProps<typeof DayPicker>["captionLayout"];
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
	formatters?: React.ComponentProps<typeof DayPicker>["formatters"];
	components?: React.ComponentProps<typeof DayPicker>["components"];
	allowedDate?: Date;
	allowedWeekdays?: Day[];
	booked?: Date[];
	onChange?: (date: Date | undefined) => void;
	selected?: Date;
	mode?: React.ComponentProps<typeof DayPicker>["mode"];
}

// Map Prisma Day enum to JavaScript Date.getDay() values
const dayToWeekdayMap: Record<Day, number> = {
	[Day.Sunday]: 0,
	[Day.Monday]: 1,
	[Day.Tuesday]: 2,
	[Day.Wednesday]: 3,
	[Day.Thursday]: 4,
	[Day.Friday]: 5,
	[Day.Saturday]: 6,
};

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	formatters,
	components,
	allowedDate,
	allowedWeekdays,
	booked = [],
	onChange,
	selected,
	mode = "single",
}: CalendarProps) {
	const defaultClassNames = getDefaultClassNames();

	// Create disabled function based on restrictions
	const isDateDisabled = React.useCallback(
		(date: Date) => {
			// Check if date is in the booked dates array
			if (booked.length > 0) {
				const isBooked = booked.some(
					(bookedDate) => bookedDate.toDateString() === date.toDateString(),
				);

				if (isBooked) {
					return true; // Disable booked dates
				}
			}

			// If allowedDate is set, only allow that specific date
			if (allowedDate) {
				return date.toDateString() !== allowedDate.toDateString();
			}

			// If allowedWeekdays is set, only allow those weekdays
			if (allowedWeekdays && allowedWeekdays.length > 0) {
				const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
				const allowedWeekdayNumbers = allowedWeekdays.map(
					(day) => dayToWeekdayMap[day],
				);
				return !allowedWeekdayNumbers.includes(dayOfWeek);
			}

			// No restrictions, allow all dates
			return false;
		},
		[allowedDate, allowedWeekdays, booked],
	);

	// Handle date selection - need to handle both single and multiple modes
	const handleSelect = React.useCallback(
		(date: Date | Date[] | undefined) => {
			// For single mode, pass the date directly
			if (mode === "single") {
				onChange?.(date as Date | undefined);
			}
		},
		[onChange, mode],
	);

	return (
		<DayPicker
			mode={mode}
			selected={selected}
			showOutsideDays={showOutsideDays}
			className={cn(
				"group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			disabled={isDateDisabled}
			onSelect={handleSelect}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit", defaultClassNames.root),
				months: cn(
					"relative flex flex-col gap-4 md:flex-row",
					defaultClassNames.months,
				),
				month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
				nav: cn(
					"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"flex h-(--cell-size) w-full items-center justify-center gap-1.5 font-medium text-sm",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"absolute inset-0 bg-popover opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"select-none font-medium",
					captionLayout === "label"
						? "text-sm"
						: "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
					defaultClassNames.caption_label,
				),
				table: "w-full border-collapse",
				weekdays: cn("flex", defaultClassNames.weekdays),
				weekday: cn(
					"flex-1 select-none rounded-md font-normal text-[0.8rem] text-muted-foreground",
					defaultClassNames.weekday,
				),
				week: cn("mt-2 flex w-full", defaultClassNames.week),
				week_number_header: cn(
					"w-(--cell-size) select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"select-none text-[0.8rem] text-muted-foreground",
					defaultClassNames.week_number,
				),
				day: cn(
					"group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
					defaultClassNames.day,
				),
				range_start: cn(
					"rounded-l-md bg-accent",
					defaultClassNames.range_start,
				),
				range_middle: cn("rounded-none", defaultClassNames.range_middle),
				range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
				today: cn(
					"rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
					defaultClassNames.today,
				),
				outside: cn(
					"text-muted-foreground aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn(
					"text-muted-foreground opacity-50",
					defaultClassNames.disabled,
				),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronLeftIcon className={cn("size-4", className)} {...props} />
						);
					}

					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon className={cn("size-4", className)} {...props} />
					);
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-(--cell-size) items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) {
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				"flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-start=true]:rounded-l-md data-[range-end=true]:bg-primary data-[range-middle=true]:bg-accent data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-accent-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
