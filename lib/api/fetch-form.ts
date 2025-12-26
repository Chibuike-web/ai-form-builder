import { db } from "@/db";
import { form } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const fetchForm = cache(async (id: string) => {
	const result = await db.query.form.findFirst({
		where: eq(form.id, id),
		columns: {
			uiSchema: true,
			title: true,
		},
	});

	return result;
});
