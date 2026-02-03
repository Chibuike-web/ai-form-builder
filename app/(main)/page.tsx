import FormBuilderClient from "./form-builder-client";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteButton from "./components/delete-button";
import { getForms } from "@/lib/api/get-form";

export default async function FormBuilder() {
	return (
		<main className="max-w-6xl flex gap-10 mx-auto py-10 px-6 xl:px-0">
			<Suspense>
				<FormBuilderClient />
			</Suspense>
			<span className="min-h-screen w-px bg-foreground/20" />
			<Forms />
		</main>
	);
}

const Forms = async () => {
	const results = await getForms();
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold mb-4">Forms</h2>
			{results.length === 0 ? (
				<p className="text-muted-foreground">No forms found</p>
			) : (
				results.map((form) => (
					<div key={form.id} className="mb-4">
						<h3 className="text-xl font-semibold mb-2">{form.title}</h3>
						<p className="text-muted-foreground">{form.prompt}</p>
						<div className="flex gap-2 mt-4">
							<Button asChild>
								<Link
									href={`/responses/${form.id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1"
								>
									View Responses
								</Link>
							</Button>
							<Suspense>
								<DeleteButton id={form.id} />
							</Suspense>
						</div>
					</div>
				))
			)}
		</div>
	);
};
