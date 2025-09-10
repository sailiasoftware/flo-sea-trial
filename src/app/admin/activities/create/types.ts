import type { Day, RepeatType } from "@prisma/client";

export type Schedule = {
	start: Date;
	end: Date;
	weekday?: Day;
	date?: Date;
	repeat?: RepeatType;
};
