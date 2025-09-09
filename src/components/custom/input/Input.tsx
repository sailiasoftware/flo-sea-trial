import { cn } from "@/utils";
import type { InputProps } from "./types";

/**
 * -----------------------------------------------------------
 *  Input
 * -----------------------------------------------------------
 * @todo write a description
 *
 * @returns React Component
 * -----------------------------------------------------------
 */
export const Input: React.FC<InputProps> = ({ className, Icon, ...props }) => {
	return (
		<div className="flex">
			{Icon && (
				<div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-input bg-muted">
					<Icon size={15} />
				</div>
			)}
			<input
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					Icon && "rounded-l-none",
					className,
				)}
				{...props}
			/>
		</div>
	);
};
