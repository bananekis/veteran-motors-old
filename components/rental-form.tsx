"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalFormSchema } from "@/lib/validations";
import { sendEmail, formatRentalFormData } from "@/lib/emailjs";
import type { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface RentalFormProps {
	title: string;
	description: string;
	note?: React.ReactNode;
}

type RentalFormValues = z.infer<typeof rentalFormSchema>;

export default function RentalForm({
	title,
	description,
	note,
}: RentalFormProps) {
	const formRef = useRef<HTMLDivElement>(null);
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const form = useForm<RentalFormValues>({
		resolver: zodResolver(rentalFormSchema),
		defaultValues: {
			carType: "",
			purpose: "",
			dateFrom: "",
			dateTo: "",
			hours: "",
			location: "",
			comment: "",
			phone: "",
			email: "",
		},
	});

	async function onSubmit(data: RentalFormValues) {
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const emailData = formatRentalFormData(data);
			const success = await sendEmail(emailData);

			if (success) {
				setSubmitStatus("success");
				form.reset();
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section ref={formRef} className="mb-24">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={
					isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
				}
				transition={{ duration: 0.6 }}
				className="art-deco-border"
			>
				<div className="p-8 bg-cream-darker">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-8 vintage-heading">
						{title}
					</h2>

					<p className="mb-8 font-montserrat text-brown">
						{description}
					</p>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="carType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Typ vozidla*</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="vintage-input w-full">
													<SelectValue placeholder="Vyberte typ vozidla" />
												</SelectTrigger>
												<SelectContent className="bg-white">
													<SelectItem value="rolls-royce-phantom">
														Rolls-Royce Phantom
														(1925)
													</SelectItem>
													<SelectItem value="bugatti-type-35">
														Bugatti Type 35 (1927)
													</SelectItem>
													<SelectItem value="cadillac-v16">
														Cadillac V16 (1930)
													</SelectItem>
													<SelectItem value="packard-eight">
														Packard Eight (1931)
													</SelectItem>
													<SelectItem value="jiný">
														Jiný
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="purpose"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Účel pronájmu*</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="vintage-input w-full">
													<SelectValue placeholder="Vyberte účel pronájmu" />
												</SelectTrigger>
												<SelectContent className="bg-white">
													<SelectItem value="film">
														Film
													</SelectItem>
													<SelectItem value="klip">
														Klip
													</SelectItem>
													<SelectItem value="focení">
														Focení
													</SelectItem>
													<SelectItem value="event">
														Event
													</SelectItem>
													<SelectItem value="projížďka">
														Projížďka
													</SelectItem>
													<SelectItem value="jiné">
														Jiné
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<FormField
									control={form.control}
									name="dateFrom"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Datum od*</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
													className="vintage-input w-full"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="dateTo"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Datum do*</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
													className="vintage-input w-full"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="hours"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Případně počet hodin
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													{...field}
													className="vintage-input w-full"
													placeholder="např. 4 hodiny"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Místo konání*</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="vintage-input w-full"
												placeholder="Místo konání události"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Doplňující text</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className="vintage-input w-full"
												placeholder="Další informace o pronájmu..."
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Telefon*</FormLabel>
											<FormControl>
												<Input
													type="tel"
													{...field}
													className="vintage-input w-full"
													placeholder="+420 123 456 789"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email*</FormLabel>
											<FormControl>
												<Input
													type="email"
													{...field}
													className="vintage-input w-full"
													placeholder="vas@email.cz"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>
							</div>

							<div className="text-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className="vintage-button disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isSubmitting
										? "Odesílání..."
										: "Odeslat poptávku"}
								</button>
							</div>

							{submitStatus === "success" && (
								<div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
									Vaše poptávka byla úspěšně odeslána. Brzy se
									vám ozveme!
								</div>
							)}

							{submitStatus === "error" && (
								<div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
									Při odesílání došlo k chybě. Zkuste to
									prosím znovu nebo nás kontaktujte přímo.
								</div>
							)}

							<div
								className="text-xs text-gray-500 mt-4"
								style={{ fontSize: "0.85rem" }}
							>
								Pole označená * jsou povinná.
							</div>
						</form>
					</Form>
				</div>
			</motion.div>
		</section>
	);
}
