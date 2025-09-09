import "@/styles/globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { ModeToggle } from "@/components/custom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "Tack & Co Sailing School",
	description: "A simple booking system for getting the guys to the next level",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TRPCReactProvider>
						<nav className="flex h-16 w-full items-center justify-between px-4">
							<div className="flex gap-4">
								<Link href="/" className="hover:text-primary">
									Home
								</Link>
								<Link href="/book" className="hover:text-primary">
									Book
								</Link>
								<Link href="/admin" className="hover:text-primary">
									Admin
								</Link>
							</div>
							<div>
								<ModeToggle />
							</div>
						</nav>
						{children}
					</TRPCReactProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
