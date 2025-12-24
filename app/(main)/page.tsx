import FormBuilderClient from "./form-builder-client";
import { db } from "@/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cacheLife, cacheTag } from "next/cache";
import DeleteButton from "./components/delete-button";

export default function FormBuilder() {
	return (
		<main className="max-w-6xl flex gap-10 mx-auto py-10 px-6 xl:px-0">
			<FormBuilderClient />
			<span className="min-h-screen w-px bg-foreground/20" />
			<Forms />
		</main>
	);
}

const Forms = async () => {
	"use cache";
	cacheLife("max");
	cacheTag("forms");
	const results = await db.query.form.findMany({
		columns: {
			id: true,
			prompt: true,
			uiSchema: true,
			title: true,
		},
	});
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold mb-4">Forms</h2>
			{results.map((form) => (
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
						<DeleteButton id={form.id} />
					</div>
				</div>
			))}
		</div>
	);
};
