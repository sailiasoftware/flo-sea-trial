import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Select } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AddRessourceProps } from "./types";

export const AddRessource: React.FC<AddRessourceProps> = ({
	data,
	addRessourceAction,
}) => {
	const [quantity, setQuantity] = useState<number>(0);
	const [activeRes, setActiveRes] = useState<{ id: number; name: string }>();

	const handleSelectChange = useCallback(
		(id: string) => {
			const intId = parseInt(id);
			const name = data?.find((r) => r.id === intId)?.name;
			setActiveRes({ id: intId, name: name || "" });
		},
		[data],
	);

	return (
		<div className="flex items-center gap-4">
			{data && (
				<Select
					name="ressource"
					placeholder="Select ressource"
					onChange={(e) => {
						if (typeof e ===  "string") {
							handleSelectChange(e)
						}
					}}
					options={data.map((r) => {
						return {
							label: r.name,
							value: r.id.toString(),
						};
					})}
				/>
			)}
			<Input
				type="number"
				placeholder="Quantity"
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			<Button
				type="button"
				onClick={() => addRessourceAction(activeRes, quantity)}
			>
				<PlusIcon /> Add ressource
			</Button>
		</div>
	);
};
