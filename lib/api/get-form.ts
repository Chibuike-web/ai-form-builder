import { db } from "@/db";
import { cacheLife, cacheTag } from "next/cache";
import { InferSelectModel } from "drizzle-orm";
import { form } from "@/db/schemas";

type FullForm = InferSelectModel<typeof form>;

export type FormQueryResult = Pick<FullForm, "id" | "prompt" | "uiSchema" | "title">;

export async function getForms(): Promise<FormQueryResult[]> {
	"use cache";
	cacheLife("max");
	cacheTag("forms");

	return await db.query.form.findMany({
		columns: {
			id: true,
			prompt: true,
			uiSchema: true,
			title: true,
		},
	});
}
