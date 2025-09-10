import type { RouterOutput } from "@/types";

export type AddRessourceProps = {
	data: RouterOutput["ressource"]["list"];
	addRessourceAction: (
		activeRes:
			| {
					id: number;
					name: string;
			  }
			| undefined,
		quantity: number,
	) => void;
};
