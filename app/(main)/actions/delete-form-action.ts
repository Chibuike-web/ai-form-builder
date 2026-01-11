"use server";

import { db } from "@/db";
import { form } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function deleteFormAction(id: string) {
	try {
		await db.delete(form).where(eq(form.id, id));
		updateTag("forms");
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "Issue deleting form");
	}
}
