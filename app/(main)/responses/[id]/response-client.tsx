"use client";

import GeneratedForm from "@/components/generated-form";
import { UIType } from "../../form-builder-client";
import { Tabs } from "@base-ui/react/tabs";

export default function ResponseClient({
	ui,
	title,
	id,
}: {
	ui: UIType[];
	title: string;
	id: string;
}) {
	const shareUrl = `${process.env.NEXT_PUBLIC_URL}/${id}`;

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
					<GeneratedForm ui={ui} title={title} shareUrl={shareUrl} />
				</Tabs.Panel>
				<Tabs.Panel value="response" className="w-full">
					Chibuike
				</Tabs.Panel>
			</Tabs.Root>
		</main>
	);
}
