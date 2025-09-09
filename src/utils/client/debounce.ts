import { useEffect, useState } from "react";

/**
 * A custom React hook that debounces a value by delaying updates until after
 * a specified delay period has passed without the value changing.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 300) {
	const [debounced, setDebounced] = useState<T>(value);
	useEffect(() => {
		const id = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);
	return debounced;
}
