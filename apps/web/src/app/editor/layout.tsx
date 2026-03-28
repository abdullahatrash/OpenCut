import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	try {
		const { auth } = await import("@/lib/auth/server");
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			redirect("/sign-in");
		}
	} catch (error) {
		// Auth check failed (e.g., no database connection in local dev)
		// Allow access in development, block in production
		if (process.env.NODE_ENV === "production") {
			redirect("/sign-in");
		}
	}

	return <>{children}</>;
}
