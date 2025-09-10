"use client";

import { useId, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { type Period, TimePeriodSelect, TimePickerInput } from "./lib";

interface TimePickerProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	onChange?: (date: Date | undefined) => void;
}

export function TimePicker({
	date,
	setDate,
	onChange,
}: TimePickerProps) {
	const id = useId();
	const [period, setPeriod] = useState<Period>("PM");

	const minuteRef = useRef<HTMLInputElement>(null);
	const hourRef = useRef<HTMLInputElement>(null);
	const secondRef = useRef<HTMLInputElement>(null);
	const periodRef = useRef<HTMLButtonElement>(null);

	const handleDateChange = (newDate: Date | undefined) => {
		setDate(newDate);
		onChange?.(newDate);
	};

	return (
		<div className="flex items-end gap-2">
			<div className="grid gap-1 text-center">
				<Label htmlFor="hours" className="text-xs">
					Hours
				</Label>
				<TimePickerInput
					picker="12hours"
					period={period}
					date={date}
					setDate={handleDateChange}
					ref={hourRef}
					onRightFocus={() => minuteRef.current?.focus()}
				/>
			</div>
			<div className="grid gap-1 text-center">
				<Label htmlFor="minutes" className="text-xs">
					Minutes
				</Label>
				<TimePickerInput
					picker="minutes"
					id="minutes12"
					date={date}
					setDate={handleDateChange}
					ref={minuteRef}
					onLeftFocus={() => hourRef.current?.focus()}
					onRightFocus={() => secondRef.current?.focus()}
				/>
			</div>
			<div className="grid gap-1 text-center">
				<Label htmlFor="seconds" className="text-xs">
					Seconds
				</Label>
				<TimePickerInput
					picker="seconds"
					id="seconds12"
					date={date}
					setDate={handleDateChange}
					ref={secondRef}
					onLeftFocus={() => minuteRef.current?.focus()}
					onRightFocus={() => periodRef.current?.focus()}
				/>
			</div>
			<div className="grid gap-1 text-center">
				<Label htmlFor="period" className="text-xs">
					Period
				</Label>
				<TimePeriodSelect
					period={period}
					setPeriod={setPeriod}
					date={date}
					setDate={handleDateChange}
					ref={periodRef}
					onLeftFocus={() => secondRef.current?.focus()}
				/>
			</div>
		</div>
	);
}
