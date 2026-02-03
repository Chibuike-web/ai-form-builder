import { db } from "@/db";
import { response } from "@/db/schemas";
import { eq, type InferSelectModel } from "drizzle-orm";

type FullResponseRow = InferSelectModel<typeof response>;

export type FormResponseSummary = Pick<FullResponseRow, "id" | "data">;

export async function getFormResponses(formId: string): Promise<FormResponseSummary[]> {
	return await db.query.response.findMany({
		where: eq(response.formId, formId),
		columns: {
			id: true,
			data: true,
		},
	});
}
