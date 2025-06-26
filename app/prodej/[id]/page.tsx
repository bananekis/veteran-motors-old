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

	if (!car) {
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
									CENA
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
										<span>
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
									{car.specifications.color && (
										<li className="flex justify-between">
											<span className="font-medium">
												Barva:
											</span>
											<span>
												{car.specifications.color}
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
								<p className="font-montserrat">
									{car.description}
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Vehicle Interest Form */}
				<motion.div
					ref={formRef}
					initial={{ opacity: 0, y: 50 }}
					animate={
						isFormInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 50 }
					}
					transition={{ duration: 0.6 }}
					className="mb-16"
				>
					<div className="art-deco-border">
						<div className="p-8 bg-cream">
							<h2 className="font-marcellus text-2xl mb-6 vintage-heading text-center">
								Mám zájem o vozidlo
							</h2>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div>
									<label className="block text-sm font-medium mb-2 font-montserrat">
										Jméno *
									</label>
									<input
										{...register("name")}
										type="text"
										className="vintage-input"
										placeholder="Vaše jméno"
									/>
									{errors.name && (
										<p className="text-red-600 text-sm mt-1">
											{errors.name.message}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium mb-2 font-montserrat">
											Telefon *
										</label>
										<input
											{...register("phone")}
											type="tel"
											className="vintage-input"
											placeholder="+420 123 456 789"
										/>
										{errors.phone && (
											<p className="text-red-600 text-sm mt-1">
												{errors.phone.message}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium mb-2 font-montserrat">
											Email *
										</label>
										<input
											{...register("email")}
											type="email"
											className="vintage-input"
											placeholder="vas@email.cz"
										/>
										{errors.email && (
											<p className="text-red-600 text-sm mt-1">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2 font-montserrat">
										Termín prohlídky v případě že se chcete
										přijet podívat
									</label>
									<input
										{...register("viewingDate")}
										type="text"
										className="vintage-input"
										placeholder="např. 15.1.2024 odpoledne"
									/>
									{errors.viewingDate && (
										<p className="text-red-600 text-sm mt-1">
											{errors.viewingDate.message}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2 font-montserrat">
										Nabízená cena
									</label>
									<input
										{...register("offeredPrice")}
										type="text"
										className="vintage-input"
										placeholder="např. 500 000 Kč"
									/>
									{errors.offeredPrice && (
										<p className="text-red-600 text-sm mt-1">
											{errors.offeredPrice.message}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2 font-montserrat">
										Zpráva *
									</label>
									<textarea
										{...register("message")}
										rows={4}
										className="vintage-input resize-none"
										placeholder="Vaše zpráva..."
									/>
									{errors.message && (
										<p className="text-red-600 text-sm mt-1">
											{errors.message.message}
										</p>
									)}
								</div>

								{submitMessage && (
									<div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
										{submitMessage}
									</div>
								)}

								{submitError && (
									<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
										{submitError}
									</div>
								)}

								<div className="text-center">
									<button
										type="submit"
										disabled={isSubmitting}
										className="vintage-button disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isSubmitting
											? "Odesílám..."
											: "Odeslat"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</motion.div>

				<div className="text-center">
					<Link href="/prodej" className="vintage-button">
						Zpět na nabídku
					</Link>
				</div>
			</div>
		</div>
	);
}
