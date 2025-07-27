"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validations";
import { sendEmail, formatContactFormData } from "@/lib/emailjs";
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

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
	const formRef = useRef<HTMLDivElement>(null);
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			inquiryType: "",
			subject: "",
			message: "",
		},
	});

	async function onSubmit(data: ContactFormValues) {
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const emailData = formatContactFormData(data);
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
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-12 vintage-heading mx-auto">
					KONTAKT
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
					<div className="space-y-8">
						<div className="vintage-card">
							<h2 className="text-2xl font-semibold mb-6 vintage-heading">
								Kontaktní údaje
							</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Adresa
									</h3>
									<address className="not-italic">
										<p>Veteran Motors s.r.o.</p>
										<p>Bílý Kostel nad Nisou 509</p>
										<p>463 31 Bílý Kostel nad Nisou</p>
										<p>Česká republika</p>
									</address>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Telefon
									</h3>
									<p>+420 735 705 601</p>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Email
									</h3>
									<p>veteran.mot@gmail.com</p>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Otevírací doba
									</h3>
									<p>
										každý den včetně víkendů po předešlé
										domluvě
									</p>
								</div>
							</div>
						</div>

						<div className="vintage-card">
							<h2 className="text-2xl font-semibold mb-6 vintage-heading">
								Sociální sítě
							</h2>

							<div className="flex space-x-6">
								<a
									href="#"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">Facebook</span>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<a
									href="https://www.instagram.com/veteran.motors?igsh=a2F6ZHlzb3BvaTgx&utm_source=qr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">Instagram</span>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<a
									href="#"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">YouTube</span>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>

					<div className="vintage-card">
						<h2 className="text-2xl font-semibold mb-6 vintage-heading">
							Napište nám
						</h2>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Jméno a příjmení
												</FormLabel>
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
										name="inquiryType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Typ dotazu
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="vintage-input w-full">
															<SelectValue placeholder="Vyberte typ dotazu" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="bg-white">
														<SelectItem value="prodej">
															Prodej vozů
														</SelectItem>
														<SelectItem value="pronajem">
															Pronájem vozů
														</SelectItem>
														<SelectItem value="svatby">
															Svatební služby
														</SelectItem>
														<SelectItem value="servis">
															Servis a opravy
														</SelectItem>
														<SelectItem value="jine">
															Jiné
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage className="text-red-500" />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="subject"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Předmět</FormLabel>
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
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zpráva</FormLabel>
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

								<div className="text-center md:text-left">
									<button
										type="submit"
										disabled={isSubmitting}
										className="vintage-button disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isSubmitting
											? "Odesílání..."
											: "Odeslat zprávu"}
									</button>
								</div>

								{submitStatus === "success" && (
									<div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
										Vaše zpráva byla úspěšně odeslána. Brzy
										se vám ozveme!
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
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-8 text-center vintage-heading mx-auto">
						Kde nás najdete
					</h2>

					<div className="vintage-card p-0 h-96 relative overflow-hidden">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.0475946876894!2d14.888862776254385!3d50.77024617166832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e6e9c8e8c4b8d%3A0x8b7f8c7d6e5f4a3b!2zQsOtbMO9IEtvc3RlbCBuYWQgTmlzb3UgNTA5LCA0NjMgMzEgQsOtbMO9IEtvc3RlbCBuYWQgTmlzb3U!5e0!3m2!1scs!2scz!4v1735739200000!5m2!1scs!2scz"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Mapa - Veteran Motors"
							className="absolute inset-0"
						></iframe>

						{/* Overlay with company info */}
						<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
							<h3 className="font-marcellus text-lg font-semibold text-brown mb-2">
								Veteran Motors s.r.o.
							</h3>
							<p className="text-sm text-brown-dark">
								Bílý Kostel nad Nisou 509
								<br />
								463 31 Bílý Kostel nad Nisou
								<br />
								Česká republika
							</p>
							<div className="mt-3 pt-3 border-t border-gold/30">
								<p className="text-xs text-brown font-medium">
									📞 +420 735 705 601
								</p>
								<p className="text-xs text-brown">
									✉️ veteran.mot@gmail.com
								</p>
							</div>
						</div>

						{/* Navigation button */}
						<div className="absolute bottom-4 right-4">
							<a
								href="https://maps.google.com/maps?q=Bílý+Kostel+nad+Nisou+509,+463+31+Bílý+Kostel+nad+Nisou,+Česká+republika"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-brown hover:bg-brown-dark text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
										clipRule="evenodd"
									/>
								</svg>
								Navigovat
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
