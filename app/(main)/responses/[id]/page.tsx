import ResponseClient from "./response-client";
import { Suspense } from "react";
import { UIType } from "../../form-builder-client";
import { type FormResponseSummary, getFormResponses } from "@/lib/api/get-responses";
import { fetchForm } from "@/lib/api/fetch-form";

export default function Responses({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={null}>
			<Form params={params} />
		</Suspense>
	);
}

const Form = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const result = await fetchForm(id);
	if (!result) {
		return <div>Form not found</div>;
	}

	const uiSchema = result.uiSchema as { fields: UIType[] };
	const title = result.title;

	const formResponses = await getFormResponses(id);

	const responses = formResponses.map((response: FormResponseSummary) => ({
		id: response.id,
		data: typeof response.data === "string" ? JSON.parse(response.data) : response.data,
	}));

	return <ResponseClient ui={uiSchema.fields} title={title} id={id} responses={responses} />;
};
