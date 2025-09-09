import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/providers";

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
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
