import { type ChangeEvent, useId } from "react";

type Option = {
	label: string;
	value: string;
};

type DropdownProps = {
	options: Option[];
	selectedValue: string;
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	label?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
	options,
	selectedValue,
	onChange,
	label,
}) => {
	const id = useId();

	return (
		<div className="w-full max-w-xs">
			{label && (
				<label
					htmlFor={id}
					className="mb-1 block font-medium text-gray-700 text-sm"
				>
					{label}
				</label>
			)}
			<select
				id={id}
				value={selectedValue}
				onChange={onChange}
				className="block w-full rounded-md border-2 border-gray-300 py-2 pr-10 pl-3 text-base shadow-sm focus:border-primary focus:outline-none sm:text-sm"
			>
				<option value="" disabled>
					Select an option...
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
