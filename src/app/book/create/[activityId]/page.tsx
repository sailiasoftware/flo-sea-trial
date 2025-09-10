"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export default function CreateBooking() {
	const { activityId } = useParams<{ activityId: string }>();
	const [date, setDate] = useState<Date>();
	const [email, setEmail] = useState<string>();

	const { data, isLoading, isError } = api.activity.get.useQuery({
		id: parseInt(activityId),
	});

	const handleBooking = api.booking.create.useMutation({
		onSuccess: () => {
			console.log("Booking created");
			toast.success("Booking created");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Error creating booking");
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error loading activity</div>;
	}

	return (
		<div className="flex h-[calc(100vh_-_46px)] flex-col items-center justify-center">
			<h1 className="font-bold text-2xl">{data?.name}</h1>
			<div className="mt-8 flex gap-10">
				<div className="">
					<p>{`Starts at: ${data?.starts.toLocaleTimeString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					})}`}</p>
					<p>{`Ends at: ${data?.ends.toLocaleTimeString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					})}`}</p>
					{data?.date ? (
						<p>{`Starts on ${data?.date.toDateString()}`}</p>
					) : data?.days ? (
						<p>{`Availabe every: ${data.days.join(",")}`}</p>
					) : (
						<p>Not set</p>
					)}
					<Input
						type="email"
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>
				<Calendar
					className="rounded-md border-1 border-accent-foreground"
					allowedDate={data?.date || undefined}
					allowedWeekdays={data?.days}
					onChange={(date) => {
						setDate(date);
					}}
				/>
			</div>
			<Button
				onClick={() => {
					if (date && email) {
						handleBooking.mutate({
							activityId: parseInt(activityId),
							bookedSlot: date,
							userEmail: email,
						});
					}
				}}
			>
				Book
			</Button>
		</div>
	);
}
