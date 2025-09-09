import {
	CalendarIcon,
	CircleGaugeIcon,
	KayakIcon,
	MegaphoneIcon,
} from "lucide-react";
import Link from "next/link";

const navItems = [
	{
		name: "Dashboard",
		href: "/admin",
		icon: <CircleGaugeIcon />,
	},
	{
		name: "Bookings",
		href: "/admin/bookings",
		icon: <CalendarIcon />,
	},
	{
		name: "Activities",
		href: "/admin/activities",
		icon: <MegaphoneIcon />,
	},
	{
		name: "Ressources",
		href: "/admin/ressources",
		icon: <KayakIcon />,
	},
];

export const Sidebar = () => {
	return (
		<div className="h-[calc(100vh-h-16)] border-accent border-r-1 p-2">
			{navItems.map((item) => (
				<Link
					key={item.name}
					href={item.href}
					className="flex items-center gap-2 rounded-md p-2 hover:bg-primary"
				>
					<div className="flex h-6 w-6 items-center justify-center">
						{item.icon}
					</div>
				</Link>
			))}
		</div>
	);
};
