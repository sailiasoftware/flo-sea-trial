import type { Day, RepeatType } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { DatePicker, Select, TimePicker } from "@/components/custom";
import { FormGroup } from "@/components/custom/formGroup";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { AddRessourceProps } from "./types";

export const AddSchedule: React.FC<AddRessourceProps> = ({
	addRessourceAction,
}) => {
	const [isSingle, setIsSingle] = useState<boolean>(false);
	const [repeat, setRepeat] = useState<RepeatType>("DAILY");
	const [startTime, setStartTime] = useState<Date>();
	const [endTime, setEndTime] = useState<Date>();
	const [startDate, setStartDate] = useState<Date>();
	const [weekday, setWeekday] = useState<Day>();

	return (
		<div className="rounded-md border-1 border-foreground p-4">
			{/* Times */}
			<FormGroup className="flex flex-row gap-8">
				<div className="w-max">
					<p className="text-xs">Start time</p>
					<TimePicker date={startTime} setDate={setStartTime} />
				</div>
				<div className="w-max">
					<p className="text-xs">End time</p>
					<TimePicker date={endTime} setDate={setEndTime} />
				</div>
			</FormGroup>

			{/* Date */}
			<FormGroup>
				<div className="flex gap-8">
					<div className="flex items-center gap-2">
						<p>Once off activity</p>
						<Switch
							onCheckedChange={(e) => {
								setIsSingle(e);
							}}
						/>
					</div>
					<Select
						name="repeat"
						className="max-w-48"
						placeholder="Repeat"
						onChange={(repeat) => {
							if (
								repeat === "DAILY" ||
								repeat === "WEEKLY" ||
								repeat === "MONTHLY" ||
								repeat === "YEARLY"
							) {
								setRepeat(repeat);
							}
						}}
						options={[
							{ value: "DAILY", label: "daily" },
							{ value: "WEEKLY", label: "weekly" },
							{ value: "MONTHLY", label: "monthly" },
							{ value: "YEARLY", label: "yearly" },
						]}
					/>
				</div>
				{isSingle ? (
					<DatePicker
						label="Start date"
						onChange={(date) => {
							setStartDate(date);
						}}
					/>
				) : (
					<div>
						<Select
							name="weekday"
							className="max-w-48"
							placeholder="Select a weekday"
							value={weekday}
							onChange={(weekdays) => {
								console.log("WWW", weekdays);
								setWeekday(weekday as Day);
							}}
							options={[
								{ value: "Monday", label: "Monday" },
								{ value: "Tuesday", label: "Tuesday" },
								{ value: "Wednesday", label: "Wednesday" },
								{ value: "Thursday", label: "Thursday" },
								{ value: "Friday", label: "Friday" },
								{ value: "Saturday", label: "Saturday" },
								{ value: "Sunday", label: "Sunday" },
							]}
						/>
					</div>
				)}
			</FormGroup>
			<FormGroup>
				<Button
					className="mt-4"
					type="button"
					onClick={() => {
						if (startTime && endTime) {
							addRessourceAction({
								start: startTime,
								end: endTime,
								repeat: repeat,
								weekday: weekday,
								date: startDate,
							});
						}
					}}
				>
					<PlusIcon /> Add schedule
				</Button>
			</FormGroup>
		</div>
	);
};
