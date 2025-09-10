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

export default function Bookings() {
	const { data, isLoading, isError } = api.booking.list.useQuery();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading bookings</div>;

	return (
		<div className="p-10">
			<h1 className="font-bold text-2xl">Bookings</h1>

			<div className="mt-6">
				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Booking Name</TableHead>
								<TableHead>User</TableHead>
								<TableHead>Activity</TableHead>
								<TableHead>Resources</TableHead>
								<TableHead>Slot</TableHead>
								<TableHead>Booked At</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((booking) => (
								<TableRow key={booking.id}>
									<TableCell>{booking.name}</TableCell>
									<TableCell>
										<div>
											<div className="font-medium">{booking.user.name}</div>
											<div className="text-muted-foreground text-sm">
												{booking.user.email}
											</div>
										</div>
									</TableCell>
									<TableCell>
										{booking.activities.map((activityBooking) => (
											<div key={activityBooking.activityId} className="mb-1">
												{activityBooking.activity.name}
											</div>
										))}
									</TableCell>
									<TableCell>
										{booking.activities.map((activityBooking) => (
											<div key={activityBooking.activityId} className="mb-2">
												{activityBooking.activity.ressources.map((resource) => (
													<div key={resource.id} className="text-sm">
														• {resource.quantity}x Resource #
														{resource.ressourceId}
													</div>
												))}
											</div>
										))}
									</TableCell>
									<TableCell>
										<p>{booking.starts.toLocaleDateString()}</p>
										<p>
											<span>{`${booking.starts.getHours()}:${booking.starts.getMinutes()}`}</span>
											-
											<span>{`${booking.ends.getHours()}:${booking.ends.getMinutes()}`}</span>
										</p>
									</TableCell>
									<TableCell>
										{new Date(booking.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										<Button variant="outline" size="sm" className="mr-2">
											View
										</Button>
										<Button variant="destructive" size="sm">
											Cancel
										</Button>
									</TableCell>
								</TableRow>
							))}
							{data?.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={8}
										className="text-center text-muted-foreground"
									>
										No bookings found.
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
