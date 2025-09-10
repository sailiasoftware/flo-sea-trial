"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Form } from "@/components/custom/form";
import { FormGroup } from "@/components/custom/formGroup";
import { Input } from "@/components/custom/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { AddRessource } from "./_lib/addRessource/AddRessource";
import { ScheduleList } from "./_lib/addSchedule/ScheduleList";
import { RessourceList } from "./_lib/ressourceList";
import type { Schedule } from "./types";

export default function CreateActivity() {
	const router = useRouter();
	const [ressources, setRessources] = useState<
		{ id: number; name: string; quantity: number }[]
	>([]);
	const [name, setName] = useState<string>("");
	const [schedules, setSchedules] = useState<Schedule[]>();

	const mutation = api.activity.create.useMutation();

	const { data, isLoading, isError } = api.ressource.list.useQuery();

	const handleSubmit = () => {
		if (!name || !ressources || ressources.length === 0 || !schedules) return;

		console.log("schedules", schedules);

		mutation.mutate(
			{
				name,
				ressources,
				schedules,
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
				<ScheduleList schedules={schedules || []} setSchedules={setSchedules} />

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
