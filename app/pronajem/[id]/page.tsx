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
import { rentalFormSchema } from "@/lib/validations";
import { sendEmail, formatRentalFormData } from "@/lib/emailjs";
import { z } from "zod";

interface RentalCarDetailPageProps {
	params: {
		id: string;
	};
}

type RentalFormData = z.infer<typeof rentalFormSchema>;

export default function RentalCarDetailPage({
	params,
}: RentalCarDetailPageProps) {
	const car = cars.find((c) => c.id === params.id);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<string | null>(null);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RentalFormData>({
		resolver: zodResolver(rentalFormSchema),
	});

	if (
		!car ||
		(!car.categories.includes("rental") && !car.categories.includes("all"))
	) {
		notFound();
	}

	const mainImageRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const isMainImageInView = useInView(mainImageRef, {
		once: true,
		amount: 0.1,
	});
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

	const onSubmit = async (data: RentalFormData) => {
		setIsSubmitting(true);
		setSubmitMessage(null);
		setSubmitError(null);

		try {
			const emailData = formatRentalFormData(data, car.name);
			const success = await sendEmail(emailData);

			if (success) {
				setSubmitMessage("Vaše rezervace byla úspěšně odeslána!");
				reset();
			} else {
				setSubmitError(
					"Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu."
				);
			}
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitError("Došlo k chybě při odesílání rezervace.");
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
										Rezervace vozu
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

										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											<div>
												<label className="block text-xs font-medium mb-1 font-montserrat">
													Datum od
												</label>
												<input
													{...register("dateFrom")}
													type="date"
													className="vintage-input text-sm px-3 py-2"
												/>
												{errors.dateFrom && (
													<p className="text-red-600 text-xs mt-1">
														{
															errors.dateFrom
																.message
														}
													</p>
												)}
											</div>

											<div>
												<label className="block text-xs font-medium mb-1 font-montserrat">
													Datum do
												</label>
												<input
													{...register("dateTo")}
													type="date"
													className="vintage-input text-sm px-3 py-2"
												/>
												{errors.dateTo && (
													<p className="text-red-600 text-xs mt-1">
														{errors.dateTo.message}
													</p>
												)}
											</div>
										</div>

										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Účel pronájmu
											</label>
											<input
												{...register("purpose")}
												type="text"
												className="vintage-input text-sm px-3 py-2"
												placeholder="např. svatba, focení, akce..."
											/>
											{errors.purpose && (
												<p className="text-red-600 text-xs mt-1">
													{errors.purpose.message}
												</p>
											)}
										</div>

										<div>
											<label className="block text-xs font-medium mb-1 font-montserrat">
												Zpráva
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
													: "Odeslat rezervaci"}
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
									Informace o vozidle
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
									Ceník
								</h2>
								{(() => {
									// Define pricing based on car model
									const getPricing = (carName: string) => {
										const name = carName.toLowerCase();
										if (
											name.includes("ford") &&
											name.includes("mustang")
										) {
											return {
												hour: "490",
												halfDay: "990",
												day: "1.990",
											};
										} else if (
											name.includes("bmw") &&
											name.includes("2002")
										) {
											return {
												hour: "290",
												halfDay: "790",
												day: "1.490",
											};
										} else if (
											name.includes("vw") &&
											name.includes("brouk")
										) {
											return {
												hour: "290",
												halfDay: "790",
												day: "1.490",
											};
										} else if (
											name.includes("chevrolet") &&
											name.includes("camaro")
										) {
											return {
												hour: "490",
												halfDay: "990",
												day: "1.990",
											};
										} else if (
											name.includes("chevrolet") &&
											name.includes("corvette")
										) {
											return {
												hour: "490",
												halfDay: "990",
												day: "1.990",
											};
										} else if (
											name.includes("cadillac") &&
											name.includes("eldorado")
										) {
											return {
												hour: "490",
												halfDay: "990",
												day: "1.990",
											};
										} else {
											// Default pricing for other cars
											return {
												hour: "490",
												halfDay: "990",
												day: "1.990",
											};
										}
									};

									const pricing = getPricing(car.name);

									return (
										<div className="space-y-2 text-sm font-montserrat">
											<div className="flex justify-between">
												<span>Hodina:</span>
												<span>{pricing.hour},- Kč</span>
											</div>
											<div className="flex justify-between">
												<span>Půl den:</span>
												<span>
													{pricing.halfDay},- Kč
												</span>
											</div>
											<div className="flex justify-between">
												<span>Den:</span>
												<span>{pricing.day},- Kč</span>
											</div>
											<div className="flex justify-between">
												<span>Vícedenní:</span>
												<span>po domluvě</span>
											</div>
										</div>
									);
								})()}
								<p className="text-xs mt-3 italic font-montserrat">
									Finální cena je stanovena individuálně podle
									účelu pronájmu.
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="text-center">
					<Link href="/pronajem" className="vintage-button">
						Zpět na pronájem
					</Link>
				</div>
			</div>
		</div>
	);
}
