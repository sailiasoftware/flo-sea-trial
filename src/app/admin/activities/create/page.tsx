"use client";

import type { Day, RepeatType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker, Select, TimePicker } from "@/components/custom";
import { Form } from "@/components/custom/form";
import { FormGroup } from "@/components/custom/formGroup";
import { Input } from "@/components/custom/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { AddRessource } from "./_lib/addRessource/AddRessource";
import { RessourceList } from "./_lib/ressourceList";

export default function CreateActivity() {
	const router = useRouter();
	const [ressources, setRessources] = useState<
		{ id: number; name: string; quantity: number }[]
	>([]);
	const [name, setName] = useState<string>("");

	// Schedule Fields
	const [isSingle, setIsSingle] = useState<boolean>(false);
	const [repeat, setRepeat] = useState<RepeatType>("DAILY");
	const [startTime, setStartTime] = useState<Date>();
	const [endTime, setEndTime] = useState<Date>();
	const [startDate, setStartDate] = useState<Date>();
	const [weekdays, setWeekdays] = useState<Day[]>([]);

	const mutation = api.activity.create.useMutation();

	const { data, isLoading, isError } = api.ressource.list.useQuery();

	const handleSubmit = () => {
		console.log(endTime);
		console.log(!endTime);

		if (
			!name ||
			!ressources ||
			ressources.length === 0 ||
			!startTime ||
			!endTime
		)
			return;

		console.log("HEE");

		mutation.mutate(
			{
				name,
				ressources,
				startTime: startTime,
				endTime: endTime,
				startDate: startDate,
				weekdays: weekdays,
				repeat: repeat,
			},
			{
				onSuccess: () => {
					console.log("Sucess");
					toast.success("Activity created");
					router.push("/admin/activities");
				},
				onError: (error) => {
					console.log(error);
					toast.error("Error creating activity");
				},
			},
		);
	};

	const addRessourceAction = (
		activeRes:
			| {
					id: number;
					name: string;
			  }
			| undefined,
		quantity: number,
	) => {
		if (!activeRes || !quantity) return;

		setRessources([
			...ressources,
			{ id: activeRes.id, name: activeRes.name, quantity },
		]);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div className="p-10">
			<h1>Create Activity</h1>

			<Form className="mt-4 max-w-2xl">
				<FormGroup className="grid sm:grid-flow-col">
					<Input
						type="text"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</FormGroup>

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
								multiple={true}
								value={weekdays}
								onChange={(weekdays) => {
									console.log("WWW", weekdays);
									const w = Array.isArray(weekdays) ? weekdays : [weekdays];
									setWeekdays(w as Day[]);
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

				{/* Add Ressource */}
				<RessourceList ressources={ressources} />
				{data && (
					<AddRessource data={data} addRessourceAction={addRessourceAction} />
				)}

				<Button
					className="mt-4 w-full sm:max-w-max"
					type="button"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form>
		</div>
	);
}
