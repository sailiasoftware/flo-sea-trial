"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function Acitivies() {
	const { data, isError, isLoading } = api.activity.list.useQuery();
	const router = useRouter();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div className="p-10">
			<div className="flex justify-between gap-2">
				<h1 className="font-bold text-2xl">Activities</h1>
				<Button
					type="button"
					onClick={() => {
						router.push("/admin/activities/create");
					}}
				>
					<PlusIcon /> New activity
				</Button>
			</div>

			<div className="mt-6">
				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead>Updated At</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((activity) => (
								<TableRow key={activity.id}>
									<TableCell className="font-medium">{activity.id}</TableCell>
									<TableCell>{activity.name}</TableCell>
									<TableCell>
										{new Date(activity.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{new Date(activity.updatedAt).toLocaleDateString()}
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
										colSpan={5}
										className="text-center text-muted-foreground"
									>
										No activities found.
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
