import { type ChangeEvent, useId } from "react";

export interface DateTimePickerProps {
	value?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	placeholder?: string;
	className?: string;
	min?: string;
	max?: string;
}

export const DateTimePicker = ({
	value,
	onChange,
	label,
	placeholder,
	className = "",
	min,
	max,
}: DateTimePickerProps) => {
	const id = useId();

	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label
					htmlFor={id}
					className="mb-1 block font-medium text-gray-700 text-sm"
				>
					{label}
				</label>
			)}
			<input
				id={id}
				type="datetime-local"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				min={min}
				max={max}
				className="block w-full rounded-md border-gray-300 px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
	);
};
