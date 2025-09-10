"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, TimePicker } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export default function CreateBooking() {
	const { activityId } = useParams<{ activityId: string }>();
	const [date, setDate] = useState<Date>();
	const [time, setTime] = useState<Date>();
	const [email, setEmail] = useState<string>();

	const { data, isLoading, isError } = api.activity.get.useQuery({
		id: parseInt(activityId),
	});

	console.log(data);

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
			<div className="mt-8 flex flex-col gap-10">
				<Input
					type="email"
					placeholder="Email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<TimePicker date={time} setDate={setTime} />
				<Calendar
					className="rounded-md border-1 border-accent-foreground"
					allowedDate={data?.schedules[0]?.date || undefined}
					// booked={data?.bookings.map((booking) => booking.booking.starts)}
					onChange={(date) => {
						setDate(date);
					}}
				/>
			</div>
			<Button
				className="mt-9"
				onClick={() => {
					if (
						date &&
						email &&
						data?.schedules &&
						data.schedules[0] &&
						data.schedules[0].date &&
						time
					) {
						const sd = new Date(data.schedules[0].date);
						sd.setHours(time.getHours());
						sd.setMinutes(time.getMinutes());
						sd.setSeconds(0);

						const se = new Date(date);
						se.setHours(time.getHours());
						se.setMinutes(time.getMinutes() + 30);
						se.setSeconds(0);

						handleBooking.mutate({
							activityId: parseInt(activityId),
							userEmail: email,
							bookingStart: sd,
							bookingEnd: se,
						});
					}
				}}
			>
				Book
			</Button>
		</div>
	);
}
