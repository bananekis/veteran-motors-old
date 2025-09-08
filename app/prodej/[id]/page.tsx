"use client";

import { useRef, useState } from "react";
import { cars } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import ArtDecoHeading from "@/components/art-deco-heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleInterestFormSchema } from "@/lib/validations";
import { sendEmail, formatVehicleInterestFormData } from "@/lib/emailjs";
import { z } from "zod";

interface CarDetailPageProps {
	params: {
		id: string;
	};
}

type VehicleInterestFormData = z.infer<typeof vehicleInterestFormSchema>;

export default function CarDetailPage({ params }: CarDetailPageProps) {
	const car = cars.find((c) => c.id === params.id);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<string | null>(null);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<VehicleInterestFormData>({
		resolver: zodResolver(vehicleInterestFormSchema),
	});

	if (!car || !car.categories.includes("sale")) {
		notFound();
	}

	// Function to clean up description text
	const cleanDescription = (description: string) => {
		let cleaned = description;

		// Remove email addresses
		cleaned = cleaned.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, "");

		// Remove phone numbers (various formats)
		cleaned = cleaned.replace(/(\+420\s?)?[\d\s]{9,}/g, "");
		cleaned = cleaned.replace(/7️⃣3️⃣5️⃣\s?7️⃣0️⃣5️⃣\s?6️⃣0️⃣1️⃣/g, "");

		// Remove contact section
		cleaned = cleaned.replace(/kontakt:\s*\n.*$/gim, "");
		cleaned = cleaned.replace(/Telefon:.*$/gim, "");
		cleaned = cleaned.replace(/E-mail:.*$/gim, "");

		// Remove duplicate info that's already in "Další informace"
		cleaned = cleaned.replace(/Rok výroby:\s*\d{4}/gi, "");
		cleaned = cleaned.replace(/Motor:\s*[^\n]*/gi, "");
		cleaned = cleaned.replace(/Převodovka:\s*[^\n]*/gi, "");
		cleaned = cleaned.replace(/Cena:\s*[^\n]*/gi, "");
		cleaned = cleaned.replace(/rok výroby:\s*\d{4}/gi, "");
		cleaned = cleaned.replace(/motor:\s*[^\n]*/gi, "");
		cleaned = cleaned.replace(/převodovka:\s*[^\n]*/gi, "");
		cleaned = cleaned.replace(/cena:\s*[^\n]*/gi, "");

		// Remove extra whitespace and newlines
		cleaned = cleaned.replace(/\n\s*\n\s*\n/g, "\n\n");
		cleaned = cleaned.replace(/^\s+|\s+$/g, "");

		return cleaned;
	};

	const mainImageRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const isMainImageInView = useInView(mainImageRef, {
		once: true,
		amount: 0.1,
	});
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

	const onSubmit = async (data: VehicleInterestFormData) => {
		setIsSubmitting(true);
		setSubmitMessage(null);
		setSubmitError(null);

		try {
			const emailData = formatVehicleInterestFormData(data, car.name);
			const success = await sendEmail(emailData);

			if (success) {
				setSubmitMessage("Váš zájem byl úspěšně odeslán!");
				reset();
			} else {
				setSubmitError(
					"Nepodařilo se odeslat zprávu. Zkuste to prosím znovu."
				);
			}
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitError("Došlo k chybě při odesílání zprávy.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading>{car.name}</ArtDecoHeading>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					<motion.div
						ref={mainImageRef}
						initial={{ opacity: 0, x: -50 }}
						animate={
							isMainImageInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -50 }
						}
						transition={{ duration: 0.6 }}
					>
						<div className="art-deco-border">
							<div className="relative h-96 overflow-hidden">
								<Image
									src={car.mainImage || "/placeholder.svg"}
									alt={car.name}
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-2 mt-4">
							{car.images.map((image, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={
										isMainImageInView
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										duration: 0.4,
										delay: 0.2 + index * 0.1,
									}}
									className="art-deco-border"
								>
									<div className="relative h-24 overflow-hidden">
										<Image
											src={image || "/placeholder.svg"}
											alt={`${car.name} - detail ${
												index + 1
											}`}
											fill
											className="object-cover"
										/>
									</div>
								</motion.div>
							))}
						</div>

						<motion.div
							ref={formRef}
							initial={{ opacity: 0, y: 50 }}
							animate={
								isFormInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 50 }
							}
							transition={{ duration: 0.6 }}
							className="mt-8 lg:mt-6 max-w-xl mx-auto"
						>
							<div className="art-deco-border">
								<div className="p-4 sm:p-6 bg-cream text-sm">
									<h2 className="font-marcellus text-xl mb-4 vintage-heading text-center">
										Mám zájem o vozidlo
									</h2>
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="space-y-4"
									>
										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Jméno *
											</label>
											<input
												{...register("name")}
												type="text"
												className="vintage-input text-sm px-3 py-2"
												placeholder="Vaše jméno"
											/>
											{errors.name && (
												<p className="text-red-600 text-xs mt-1">
													{errors.name.message}
												</p>
											)}
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											<div>
												<label className="block text-xs font-medium mb-1 font-montserrat">
													Telefon *
												</label>
												<input
													{...register("phone")}
													type="tel"
													className="vintage-input text-sm px-3 py-2"
													placeholder="+420 123 456 789"
												/>
												{errors.phone && (
													<p className="text-red-600 text-xs mt-1">
														{errors.phone.message}
													</p>
												)}
											</div>

											<div>
												<label className="block text-xs font-medium mb-1 font-montserrat">
													Email *
												</label>
												<input
													{...register("email")}
													type="email"
													className="vintage-input text-sm px-3 py-2"
													placeholder="vas@email.cz"
												/>
												{errors.email && (
													<p className="text-red-600 text-xs mt-1">
														{errors.email.message}
													</p>
												)}
											</div>
										</div>

										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Termín prohlídky, v případě, že
												se chcete přijet podívat
											</label>
											<input
												{...register("viewingDate")}
												type="text"
												className="vintage-input text-sm px-3 py-2"
												placeholder="např. 15.1.2024 odpoledne"
											/>
											{errors.viewingDate && (
												<p className="text-red-600 text-xs mt-1">
													{errors.viewingDate.message}
												</p>
											)}
										</div>

										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Nabízená cena
											</label>
											<input
												{...register("offeredPrice")}
												type="text"
												className="vintage-input text-sm px-3 py-2"
												placeholder="např. 500 000 Kč"
											/>
											{errors.offeredPrice && (
												<p className="text-red-600 text-xs mt-1">
													{
														errors.offeredPrice
															.message
													}
												</p>
											)}
										</div>

										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Zpráva *
											</label>
											<textarea
												{...register("message")}
												rows={3}
												className="vintage-input resize-none text-sm px-3 py-2"
												placeholder="Vaše zpráva..."
											/>
											{errors.message && (
												<p className="text-red-600 text-xs mt-1">
													{errors.message.message}
												</p>
											)}
										</div>

										{submitMessage && (
											<div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-xs">
												{submitMessage}
											</div>
										)}

										{submitError && (
											<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
												{submitError}
											</div>
										)}

										<div className="text-center">
											<button
												type="submit"
												disabled={isSubmitting}
												className="vintage-button disabled:opacity-50 disabled:cursor-not-allowed text-sm px-6 py-2"
											>
												{isSubmitting
													? "Odesílám..."
													: "Odeslat"}
											</button>
										</div>
										<div
											className="text-xs text-gray-500 mt-3"
											style={{ fontSize: "0.85rem" }}
										>
											Pole označená * jsou povinná.
										</div>
									</form>
								</div>
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						ref={infoRef}
						initial={{ opacity: 0, x: 50 }}
						animate={
							isInfoInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 50 }
						}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-8"
					>
						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h2 className="font-marcellus text-2xl mb-4 vintage-heading">
									cena k jednání
								</h2>
								<p className="text-3xl font-bold text-gold font-marcellus">
									{car.price.toLocaleString()} Kč
								</p>
							</div>
						</div>

						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h2 className="font-marcellus text-2xl mb-4 vintage-heading">
									Další informace
								</h2>

								<ul className="space-y-3 font-montserrat">
									<li className="flex justify-between">
										<span className="font-medium">
											Značka:
										</span>
										<span>{car.brand}</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Model:
										</span>
										<span>{car.model}</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Rok výroby:
										</span>
										<span>{car.year}</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Karoserie:
										</span>
										<span>{car.bodyType || "-"}</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Motor:
										</span>
										<span>{car.specifications.engine}</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Převodovka:
										</span>
										<span>
											{car.specifications.transmission}
										</span>
									</li>
									<li className="flex justify-between">
										<span className="font-medium">
											Stav:
										</span>
										<span className="text-end">
											{car.specifications.condition}
										</span>
									</li>
									{car.specifications.mileage && (
										<li className="flex justify-between">
											<span className="font-medium">
												Najeto:
											</span>
											<span>
												{car.specifications.mileage.toLocaleString()}{" "}
												km
											</span>
										</li>
									)}
								</ul>
							</div>
						</div>

						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h2 className="font-marcellus text-2xl mb-4 vintage-heading">
									Popis
								</h2>
								<p className="font-montserrat whitespace-pre-line">
									{cleanDescription(car.description)}
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="text-center">
					<Link href="/prodej" className="vintage-button">
						Zpět na nabídku
					</Link>
				</div>
			</div>
		</div>
	);
}
