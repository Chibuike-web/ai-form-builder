import { db } from "@/db";
import { form } from "@/db/schemas";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

export default function Success({ params }: { params: Promise<{ id: string }> }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md text-center">
				<h1 className="text-2xl font-semibold text-gray-900">Form Submitted</h1>
				<p className="text-gray-600 mt-2">Your response has been recorded successfully</p>

				<div className="mt-4 p-4 bg-white shadow rounded-md">
					<p className="text-sm text-gray-500">Form title</p>
					<Suspense fallback={<p className="text-lg font-medium text-gray-900">Loading...</p>}>
						<Main params={params} />
					</Suspense>
				</div>
				<Link
					href="/"
					className="inline-block mt-8 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}

const Main = async ({ params }: { params: Promise<{ id: string }> }) => {
	"use cache: private";

	const { id } = await params;
	const result = await db.query.form.findFirst({
		where: eq(form.id, id),
		columns: { title: true },
	});

	return <p className="text-lg font-medium text-gray-900">{result?.title}</p>;
};
