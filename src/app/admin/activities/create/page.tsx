"use client";

import { RepeatType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/custom/dateTimePicker";
import Dropdown from "@/components/custom/drompDown/DropDown";
import { Form } from "@/components/custom/form";
import { FormGroup } from "@/components/custom/formGroup";
import { Input } from "@/components/custom/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function CreateActivity() {
	const [ressources, setRessources] = useState<
		{ id: number; name: string; quantity: number }[]
	>([]);
	const [name, setName] = useState<string>("");
	const [dateTime, setDateTime] = useState<{ start: string; end: string }>();
	const [activeRes, setActiveRes] = useState<{ id: number; name: string }>();
	const [quantity, setQuantity] = useState<number>(0);

	const router = useRouter();

	const mutation = api.activity.create.useMutation();

	const { data, isLoading, isError } = api.ressource.list.useQuery();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	const handleSubmit = () => {
		if (!name || !ressources || ressources.length === 0) return;

		mutation.mutate(
			{
				name,
				ressources,
				start: new Date(dateTime?.start || 0),
				end: new Date(dateTime?.end || 0),
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

	const handleSelectChange = (id: number) => {
		const name = data?.find((r) => r.id === id)?.name;
		setActiveRes({ id, name: name || "" });
	};

	const addRessourceAction = () => {
		if (!activeRes || !quantity) return;

		setRessources([
			...ressources,
			{ id: activeRes.id, name: activeRes.name, quantity },
		]);
		setActiveRes(undefined);
		setQuantity(0);
	};

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

				<FormGroup>
					<DateTimePicker
						value={dateTime?.start}
						onChange={(e) =>
							setDateTime({ start: e.target.value, end: dateTime?.end || "" })
						}
						label="Start date"
						placeholder="Select date and time"
					/>
					<DateTimePicker
						value={dateTime?.end}
						onChange={(e) =>
							setDateTime({ start: dateTime?.start || "", end: e.target.value })
						}
						label="End date"
						placeholder="Select date and time"
					/>
					<Dropdown
						onChange={(e) => handleSelectChange(parseInt(e.target.value))}
						selectedValue={activeRes?.id.toString() || ""}
						options={Object.values(RepeatType).map((rt) => {
							return {
								label: rt,
								value: rt,
							};
						})}
					/>
				</FormGroup>
				{ressources.length > 0 &&
					data &&
					ressources.map((r) => {
						return (
							<div key={Math.random()} className="flex gap-4">
								<p>{r.name}</p>
								<p>Quantity: {r.quantity}</p>
							</div>
						);
					})}
				<div className="flex gap-4">
					{data && (
						<Dropdown
							onChange={(e) => handleSelectChange(parseInt(e.target.value))}
							selectedValue={activeRes?.id.toString() || ""}
							options={data?.map((r) => ({
								label: r.name,
								value: r.id.toString(),
							}))}
						/>
					)}
					<Input
						type="number"
						placeholder="Quantity"
						onChange={(e) => setQuantity(parseInt(e.target.value))}
					/>
					<Button type="button" onClick={addRessourceAction}>
						Add ressource
					</Button>
				</div>

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
