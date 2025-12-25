"use client";

import { UIType } from "@/app/(main)/form-builder-client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronDownIcon } from "lucide-react";
import { toSentenceCase } from "@/lib/toSentenceCase";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GeneratedForm({
	ui,
	title,
	formId,
}: {
	ui: UIType[];
	title: string;
	formId: string;
}) {
	const shareUrl = `${process.env.NEXT_PUBLIC_URL}/${formId}`;
	const pathname = usePathname();
	const [date, setDate] = useState<Date | undefined>(undefined);
	return (
		<div className="w-full mt-10">
			{title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
			{ui.length > 0 && (
				<>
					<div className="flex flex-col gap-4">
						{ui.map((u) => {
							const commonProps = {
								id: u.id,
								name: u.id,
								required: u.required,
							};

							switch (u.component) {
								case "text":
								case "number":
								case "file":
									return (
										<div key={u.id}>
											<div className="flex items-center gap-1 mb-2">
												<Label htmlFor={u.id}>{u.label}</Label>
												<span className="text-[14px] text-muted-foreground">
													{u.required && "(required)"}
												</span>
											</div>
											<Input
												type={u.component}
												{...commonProps}
												placeholder={`Enter your ${u.label.toLowerCase()}`}
												className="bg-white"
											/>
										</div>
									);

								case "date":
									return (
										<div key={u.id}>
											<Label htmlFor={u.id} className="mb-2">
												{u.label}
											</Label>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														id="date"
														className="justify-between font-normal w-full text-[16px] text-muted-foreground hover:bg-white hover:text-muted-foreground"
													>
														{date ? date.toDateString() : `Enter your ${u.label.toLowerCase()}`}
														<ChevronDownIcon />
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto overflow-hidden p-0" align="start">
													<Calendar
														mode="single"
														selected={date}
														captionLayout="dropdown"
														onSelect={(date) => {
															setDate(date);
														}}
													/>
												</PopoverContent>
											</Popover>
										</div>
									);
								case "checkbox":
									return (
										<div key={u.id} className="space-y-3">
											<div className="flex items-center gap-1 mb-2">
												<span className="font-medium">{u.label}</span>
												{u.required && (
													<span className="text-[14px] text-muted-foreground">(required)</span>
												)}
											</div>

											<div className="space-y-2">
												{u.options.map((opt) => (
													<div key={opt} className="flex items-center gap-2">
														<input type="checkbox" id={`${u.id}-${opt}`} name={u.id} value={opt} />
														<Label htmlFor={`${u.id}-${opt}`} className="cursor-pointer">
															{toSentenceCase(opt)}
														</Label>
													</div>
												))}
											</div>
										</div>
									);
								case "select":
									return (
										<div key={u.id} className="w-full">
											<Label htmlFor={u.id}>{u.label}</Label>
											<Select name={u.id} required={u.required}>
												<SelectTrigger className="w-full mt-2 text-[16px] text-muted-foreground bg-white">
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>

												<SelectContent>
													{u.options && u.options.length > 0 ? (
														u.options.map((opt) => (
															<SelectItem key={opt} value={opt}>
																{toSentenceCase(opt)}
															</SelectItem>
														))
													) : (
														<SelectItem value="" disabled>
															No options
														</SelectItem>
													)}
												</SelectContent>
											</Select>
										</div>
									);

								case "radio":
									return (
										<div key={u.id}>
											<p className="mb-2 font-medium">{u.label}</p>
											<RadioGroup name={u.id} required={u.required}>
												{u.options.length > 0 &&
													u.options.map((opt) => (
														<div key={opt} className="flex items-center gap-3">
															<RadioGroupItem value={opt} id={`${u.id}-${opt}`} />
															<Label htmlFor={`${u.id}-${opt}`}>{toSentenceCase(opt)}</Label>
														</div>
													))}
											</RadioGroup>
										</div>
									);

								case "text-area":
									return (
										<div key={u.id}>
											<Label htmlFor={u.id} className="mb-2">
												{u.label}
											</Label>
											<Textarea
												placeholder={`Enter ${u.label.toLowerCase()} here`}
												className="bg-white"
												name={u.id}
											/>
										</div>
									);
								default:
									return (
										<div key={u.id}>
											<div className="flex items-center gap-1 mb-2">
												<Label htmlFor={u.id}>{u.label}</Label>
												<span className="text-[14px] text-muted-foreground">
													{u.required && "(required)"}
												</span>
											</div>
											<Input
												type={u.component}
												{...commonProps}
												placeholder={`Enter your ${u.label}`}
												className="bg-white"
											/>
										</div>
									);
							}
						})}
					</div>
					<div className="flex gap-2 mt-10">
						<Dialog>
							<DialogTrigger asChild>
								<Button type="button" className="flex-1">
									Share Form Link
								</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogTitle>
									<DialogHeader>Share the link with anybody</DialogHeader>
								</DialogTitle>
								<div className="mt-4 flex items-center gap-2">
									<Input readOnly value={shareUrl} className="flex-1 " />
									<Button
										type="button"
										onClick={() => navigator.clipboard.writeText(shareUrl)}
										className="transition-all duration-150 ease-in-out active:scale-95"
									>
										Copy
									</Button>
								</div>
							</DialogContent>
						</Dialog>
						{pathname.startsWith("/responses") ? null : (
							<Button asChild className="flex-1" variant="outline">
								<Link href={`/responses/${formId}`}>View responses</Link>
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
}
