import { db } from "@/db";
import ResponseClient from "./response-client";
import { Suspense } from "react";
import { eq } from "drizzle-orm";
import { UIType } from "../../form-builder-client";
import { form, response } from "@/db/schemas";

export default function Responses({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={null}>
			<Form params={params} />
		</Suspense>
	);
}

const Form = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const result = await db.query.form.findFirst({
		where: eq(form.id, id),
		columns: {
			uiSchema: true,
			title: true,
		},
	});
	if (!result) {
		return <div>Form not found</div>;
	}

	const uiSchema = result.uiSchema as { fields: UIType[] };
	const title = result.title;

	const formResponses = await db.query.response.findMany({
		where: eq(response.formId, id),
		columns: {
			id: true,
			data: true,
		},
	});

	const responses = formResponses.map((response) => ({
		id: response.id,
		data: typeof response.data === "string" ? JSON.parse(response.data) : response.data,
	}));

	return <ResponseClient ui={uiSchema.fields} title={title} id={id} responses={responses} />;
};
