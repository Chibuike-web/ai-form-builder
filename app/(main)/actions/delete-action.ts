"use server";

import { db } from "@/db";
import { form } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export const deleteForm = async (id: string) => {
	await db.delete(form).where(eq(form.id, id));
	updateTag("forms");
};
