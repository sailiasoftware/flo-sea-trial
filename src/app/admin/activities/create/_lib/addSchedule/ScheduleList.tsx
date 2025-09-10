import { Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import type { Schedule } from "../../types";
import { AddSchedule } from "./AddSchedule";
import type { ScheduleListProps } from "./types";

export const ScheduleList: React.FC<ScheduleListProps> = ({
	schedules,
	setSchedules,
}) => {
	const addScheduleAction = useCallback(
		(schedule: Schedule) => {
			setSchedules([...(schedules ?? []), schedule]);
		},
		[schedules, setSchedules],
	);

	return (
		<div className="grid w-full grid-cols-1 gap-2 py-4">
			<h6 className="text-lg">Activity Schedules</h6>
			{schedules.length > 0 &&
				schedules.map((s) => {
					return (
						<div key={Math.random()} className="flex justify-between">
							<div className="flex items-center gap-8">
								{s.date ? (
									<p className="text-sm">{`Scheduled on date: ${s.date.toLocaleDateString()}`}</p>
								) : (
									<p className="text-sm">{`Scheduled weekly every: ${s.weekday}`}</p>
								)}
								<p className="flex min-w-28 gap-4 text-sm">
									<span>{`Starts: ${s.start.getHours()}:${s.start.getMinutes()}`}</span>
									<span>{`Ends: ${s.start.getHours()}:${s.start.getMinutes()}`}</span>
								</p>
							</div>
							<Trash2Icon className="h-4 w-4 hover:cursor-pointer hover:text-primary" />
						</div>
					);
				})}
			<AddSchedule
				addRessourceAction={(schedule) => addScheduleAction(schedule)}
			/>
		</div>
	);
};
