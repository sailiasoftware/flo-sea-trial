import type { Dispatch, SetStateAction } from "react";
import type { Schedule } from "../../types";

export type AddRessourceProps = {
	addRessourceAction: (schedule: Schedule) => void;
};

export type ScheduleListProps = {
	schedules: Schedule[];
	setSchedules: Dispatch<SetStateAction<Schedule[] | undefined>>;
	remomoveScheduleAction?: (schedule: Schedule) => void;
};
