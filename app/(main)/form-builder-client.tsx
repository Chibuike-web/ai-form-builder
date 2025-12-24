"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import GeneratedForm from "@/components/generated-form";

export type UIType = {
	id: string;
	label: string;
	component: string;
	required: boolean;
	options: string[];
};

export default function FormBuilderClient() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState("");
	const [ui, setUi] = useState<UIType[]>([]);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [formId, setFormId] = useState("");
	const [title, setTitle] = useState("");

	const router = useRouter();

	const shareUrl = `${process.env.NEXT_PUBLIC_URL}/${formId}`;
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setUi([]);
		setTitle("");
		const formdata = new FormData(e.currentTarget);
		const input = formdata.get("input") as string;

		if (input.length < 10) {
			setError("Input must be at least 10 characters");
			return;
		}

		startTransition(async () => {
			try {
				const res = await fetch("/api/form-builder", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ input }),
				});

				const data = await res.json();
				if (!res.ok) {
					setError(data.error || "Something went wrong");
					return;
				}

				setUi(data.ui.fields);
				setFormId(data.id);
				setTitle(data.title);

				router.refresh();
				if (inputRef.current) {
					inputRef.current.value = "";
				}
			} catch {
				setError("Network error");
			}
		});
	};

	return (
		<div className="w-full">
			<div className="w-full">
				<h1 className="text-4xl font-bold">Form Builder</h1>
				<p className="text-[18px] text-muted-foreground mt-2">
					Describe what information you want to collect and we’ll generate the form for it
				</p>
			</div>
			<div className="w-full mt-4">
				<form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
					<Textarea
						ref={inputRef}
						placeholder="Describe your form"
						className="bg-white"
						name="input"
						onInput={() => setError("")}
					/>
					<Button
						className="w-full transition-all duration-150 ease-in-out active:scale-95"
						disabled={isPending}
						type="submit"
					>
						{isPending ? "Creating..." : "Create"}
					</Button>
				</form>

				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
			</div>

			{ui.length > 0 && <GeneratedForm ui={ui} title={title} shareUrl={shareUrl} />}
		</div>
	);
}
