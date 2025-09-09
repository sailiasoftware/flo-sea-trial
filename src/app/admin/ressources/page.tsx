"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";

export default function Ressources() {
	const { data, isError, isLoading } = api.ressource.list.useQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div className="p-10">
			<h1 className="font-bold text-2xl">Ressources</h1>

			<div className="mt-6">
				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Items Count</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead>Updated At</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((ressource) => (
								<TableRow key={ressource.id}>
									<TableCell className="font-medium">{ressource.id}</TableCell>
									<TableCell>{ressource.name}</TableCell>
									<TableCell>{ressource.items?.length || 0}</TableCell>
									<TableCell>
										{new Date(ressource.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{new Date(ressource.updatedAt).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										<Button variant="outline" size="sm" className="mr-2">
											Edit
										</Button>
										<Button variant="destructive" size="sm">
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
							{data?.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center text-muted-foreground"
									>
										No ressources found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
