"use server";

import { db } from "@/db";
import { response } from "@/db/schemas";
import { revalidatePath } from "next/cache";

export async function saveResponseAction(
	formId: string,
	data: Record<string, string | Date | File | string[] | null | undefined>[]
) {
	await db.insert(response).values({
		id: crypto.randomUUID(),
		formId,
		data: JSON.stringify(data),
	});

	revalidatePath(`/responses/${formId}`);
}
