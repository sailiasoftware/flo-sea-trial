import { Trash2Icon } from "lucide-react";
import type { RessourceListProps } from "./types";

export const RessourceList: React.FC<RessourceListProps> = ({ ressources }) => {
	return (
		<div className="grid w-full grid-cols-1 gap-2 py-4">
			<h6 className="text-lg">Added Items</h6>
			{ressources.length > 0 &&
				ressources.map((r) => {
					return (
						<div key={Math.random()} className="flex justify-between">
							<div className="flex items-center gap-8">
								<p className="min-w-28 text-sm">{r.name}</p>
								<p className="text-xs">Quantity: {r.quantity}</p>
							</div>
							<Trash2Icon className="h-4 w-4 hover:cursor-pointer hover:text-primary" />
						</div>
					);
				})}
		</div>
	);
};
