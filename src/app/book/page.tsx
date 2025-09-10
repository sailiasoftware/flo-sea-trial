"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function Book() {
	const router = useRouter();
	const { data, isLoading, isError } = api.activity.list.useQuery();


	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading data</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
			{/* Hero Section */}
			<div>
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="font-bold text-4xl text-foreground sm:text-5xl md:text-6xl">
							Book Your Adventure
						</h1>
						<p className="mx-auto mt-3 max-w-md text-base text-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
							Choose from our exciting activities and create unforgettable
							memories. Select an activity below to start your booking.
						</p>
					</div>
				</div>
			</div>

			{/* Activities Grid */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{data?.map((activity) => (
						<Card
							key={activity.id}
							className="cursor-pointer bg-sidebar-accent transition-all duration-200 hover:scale-105 hover:shadow-lg"
							onClick={() => {
								router.push(`/book/create/${activity.id}`);
							}}
						>
							<CardHeader>
								<CardTitle className="text-accent-foreground text-xl">
									{activity.name}
								</CardTitle>
								<CardDescription className="text-card-foreground">
									Activity ID: {activity.id}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between text-card-foreground text-sm">
										<span>Created:</span>
										<span>
											{new Date(activity.createdAt).toLocaleDateString()}
										</span>
									</div>
									<div className="flex justify-between text-card-foreground text-sm">
										<span>Updated:</span>
										<span>
											{new Date(activity.updatedAt).toLocaleDateString()}
										</span>
									</div>
									<div className="pt-4">
										<Button className="w-full">Book Now</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Empty State */}
				{data?.length === 0 && (
					<div className="py-12 text-center">
						<div className="mx-auto h-24 w-24 text-gray-400">
							<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1}
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
						<h3 className="mt-4 font-medium text-gray-900 text-lg">
							No activities available
						</h3>
						<p className="mt-2 text-gray-500">
							Check back later for exciting activities to book.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
