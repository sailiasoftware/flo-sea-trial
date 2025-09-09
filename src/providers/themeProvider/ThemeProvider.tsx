"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "./types"
import { useEffect, useState } from "react";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {

  const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Render children without ThemeProvider during SSR
	if (!mounted) {
		return <>{children}</>;
	}

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}