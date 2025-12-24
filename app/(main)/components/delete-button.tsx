"use client";

import { Button } from "@/components/ui/button";
import { deleteForm } from "../actions/delete-action";

export default function DeleteButton({ id }: { id: string }) {
	return (
		<Button variant="destructive" className=" flex-1" onClick={() => deleteForm(id)}>
			Delete
		</Button>
	);
}
