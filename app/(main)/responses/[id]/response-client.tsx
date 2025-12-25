"use client";

import GeneratedForm from "@/components/generated-form";
import { UIType } from "../../form-builder-client";
import { Tabs } from "@base-ui/react/tabs";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ResponseType = {
	id: string;
	data: DataType[];
};

type DataType = {
	id: string;
	label: string;
	value: string;
};

export default function ResponseClient({
	ui,
	title,
	id,
	responses,
}: {
	ui: UIType[];
	title: string;
	id: string;
	responses: ResponseType[];
}) {
	return (
		<main className="max-w-2xl flex gap-10 mx-auto py-10 px-6 xl:px-0">
			<Tabs.Root className="w-full">
				<Tabs.List
					activateOnFocus={true}
					loopFocus={true}
					className="flex w-max gap-2 items-center bg-accent py-1.5 px-1.5 rounded-[8px]"
				>
					<Tabs.Tab
						value="form"
						className="data-[active]:bg-foreground/10 px-2 py-1 rounded-[4px]  focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-gray-700/5"
					>
						Generated Form
					</Tabs.Tab>
					<Tabs.Tab
						value="response"
						className="data-[active]:bg-foreground/10 px-2 py-1 rounded-[4px] focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-gray-700/5"
					>
						Form Responses
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="form" className="w-full">
					<GeneratedForm ui={ui} title={title} formId={id} />
				</Tabs.Panel>
				<Tabs.Panel value="response" className="w-full">
					{responses.length === 0 ? (
						<div className="text-muted-foreground text-sm py-10 text-center">No responses yet</div>
					) : (
						<ResponseAccordion responses={responses} />
					)}
				</Tabs.Panel>
			</Tabs.Root>
		</main>
	);
}

const ResponseAccordion = ({ responses }: { responses: ResponseType[] }) => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	return (
		<div className="space-y-6 mt-10">
			{responses.map((response, index) => (
				<ul key={response.id} className="rounded-xl border bg-white p-5 space-y-4">
					<button
						className="flex items-center justify-between w-full"
						onClick={() => setSelectedId((prev) => (prev ? "" : response.id))}
					>
						<h3 className="text-sm font-medium text-muted-foreground">Response #{index + 1}</h3>
						<div
							className={cn(
								"flex items-center gap-2 transition-transform",
								response.id === selectedId ? "rotate-180" : ""
							)}
						>
							<ChevronDown />
							<span className="sr-only">Toggle response</span>
						</div>
					</button>

					<AnimatePresence>
						{response.id === selectedId && (
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: "auto" }}
								exit={{ height: 0 }}
								className="overflow-hidden"
							>
								<li className="grid grid-cols-1 gap-3">
									{response.data.map((field) => (
										<div key={field.id} className="flex flex-col gap-1">
											<div className="text-xs uppercase tracking-wide text-muted-foreground">
												{field.label}
											</div>
											<div className="text-sm text-foreground">{field.value ?? "—"}</div>
										</div>
									))}
								</li>
							</motion.div>
						)}
					</AnimatePresence>
				</ul>
			))}
		</div>
	);
};
