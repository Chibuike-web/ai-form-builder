"use client";

import { Button } from "@/components/ui/button";
import { deleteFormAction } from "../actions/delete-form-action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const handleDelete = () => {
		startTransition(async () => {
			await deleteFormAction(id);

			if (searchParams.get("id") === id) {
				const params = new URLSearchParams(searchParams);
				params.delete("id");
				router.push(`/${pathname}?${params.toString()}`);
			}

			router.refresh();
		});
	};
	return (
		<Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={isPending}>
			{isPending ? "Deleting..." : "Delete"}
		</Button>
	);
}
