import FormPageClient from "./form-page-client";
import { Suspense } from "react";
import { UIType } from "../form-builder-client";
import { fetchForm } from "@/lib/api/fetch-form";

export default async function FormPage({ params }: { params: Promise<{ id: string }> }) {
	return (
		<main className="max-w-xl mx-auto py-10 px-6 xl:px-0">
			<Suspense fallback={<Loading />}>
				<Main params={params} />
			</Suspense>
		</main>
	);
}

const Main = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const result = await fetchForm(id);
	if (!result) {
		return <div>Form not found</div>;
	}

	const uiSchema = result.uiSchema as { fields: UIType[] };
	const title = result.title;

	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">{title}</h2>
			<FormPageClient ui={uiSchema.fields} id={id} />
		</>
	);
};

const Loading = () => {
	return <div className="space-y-6"></div>;
};
