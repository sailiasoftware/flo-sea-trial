import { Sidebar } from "./_lib";

export default async function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid h-[calc(100vh-4rem)] grid-cols-[min-content_1fr]">
			<Sidebar />
			{children}
		</div>
	);
}
