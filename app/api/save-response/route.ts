import { db } from "@/db";
import { response } from "@/db/schemas";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
	const { id: formId, data } = await req.json();
	try {
		await db.insert(response).values({
			id: crypto.randomUUID(),
			formId,
			data: JSON.stringify(data),
		});
		revalidatePath(`/responses/${formId}`);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error instanceof Error ? error.message : "Issue saving response" }),
			{ status: 500 }
		);
	}
}
