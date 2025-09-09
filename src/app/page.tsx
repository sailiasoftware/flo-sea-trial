import { SailboatIcon } from "@/components/custom";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-white">
				<div className="flex flex-col items-center justify-center px-4 text-center">
					{/* Sailboat Icon */}
					<div className="mb-8">
						<SailboatIcon className="h-24 w-24 text-foreground" />
					</div>
					<h1 className="mb-4 font-bold text-6xl text-foreground">Tack&Co</h1>
					<h2 className="mb-6 font-medium text-2xl text-foreground">
						Sailing School
					</h2>
					<p className="max-w-2xl text-foreground text-lg leading-relaxed">
						Learn to sail with experienced instructors in beautiful waters.
						Whether you're a complete beginner or looking to improve your
						skills, our certified instructors will guide you through every step
						of your sailing journey.
					</p>
				</div>
			</main>
		</HydrateClient>
	);
}
