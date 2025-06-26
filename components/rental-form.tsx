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
}

type RentalFormValues = z.infer<typeof rentalFormSchema>;

export default function RentalForm({ title, description }: RentalFormProps) {
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
			dateFrom: "",
			dateTo: "",
			purpose: "",
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
										<FormLabel>Typ vozidla</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="vintage-input w-full">
													<SelectValue placeholder="Vyberte typ vozidla" />
												</SelectTrigger>
												<SelectContent className="bg-white">
													<SelectItem value="skoda-1203">
														Škoda 1203
													</SelectItem>
													<SelectItem value="skoda-1202">
														Škoda 1202
													</SelectItem>
													<SelectItem value="skoda-1000mb">
														Škoda 1000MB
													</SelectItem>
													<SelectItem value="skoda-110r">
														Škoda 110R
													</SelectItem>
													<SelectItem value="skoda-105">
														Škoda 105
													</SelectItem>
													<SelectItem value="skoda-130">
														Škoda 130
													</SelectItem>
													<SelectItem value="skoda-rapid">
														Škoda Rapid
													</SelectItem>
													<SelectItem value="skoda-favorit">
														Škoda Favorit
													</SelectItem>
													<SelectItem value="skoda-felicia">
														Škoda Felicia
													</SelectItem>
													<SelectItem value="skoda-octavia">
														Škoda Octavia
													</SelectItem>
													<SelectItem value="skoda-superb">
														Škoda Superb
													</SelectItem>
													<SelectItem value="skoda-yeti">
														Škoda Yeti
													</SelectItem>
													<SelectItem value="skoda-kodiaq">
														Škoda Kodiaq
													</SelectItem>
													<SelectItem value="skoda-karoq">
														Škoda Karoq
													</SelectItem>
													<SelectItem value="skoda-kamiq">
														Škoda Kamiq
													</SelectItem>
													<SelectItem value="skoda-enyaq">
														Škoda Enyaq
													</SelectItem>
													<SelectItem value="skoda-scala">
														Škoda Scala
													</SelectItem>
													<SelectItem value="skoda-fabia">
														Škoda Fabia
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="dateFrom"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Datum od</FormLabel>
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
											<FormLabel>Datum do</FormLabel>
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
							</div>

							<FormField
								control={form.control}
								name="purpose"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Účel pronájmu</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="vintage-input w-full">
													<SelectValue placeholder="Vyberte účel pronájmu" />
												</SelectTrigger>
												<SelectContent className="bg-white">
													<SelectItem value="svatba">
														Svatba
													</SelectItem>
													<SelectItem value="promoce">
														Promoce
													</SelectItem>
													<SelectItem value="firemni-akce">
														Firemní akce
													</SelectItem>
													<SelectItem value="osobni">
														Osobní účely
													</SelectItem>
													<SelectItem value="jine">
														Jiné
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
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Místo konání</FormLabel>
										<FormControl>
											<Input
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
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Poznámka</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className="vintage-input w-full"
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
											<FormLabel>Telefon</FormLabel>
											<FormControl>
												<Input
													type="tel"
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													{...field}
													className="vintage-input w-full"
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
						</form>
					</Form>
				</div>
			</motion.div>
		</section>
	);
}
