"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saleFormSchema } from "@/lib/validations";
import { sendEmail, formatSaleFormData } from "@/lib/emailjs";
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
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/lib/data";
import ArtDecoHeading from "@/components/art-deco-heading";
import CarCard from "@/components/car-card";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { z } from "zod";

type SaleFormValues = z.infer<typeof saleFormSchema>;

export default function SalePage() {
	const carsForSale = cars.filter((car) => car.category === "sale");
	const inStockCars = carsForSale.filter(
		(car) => car.stockType === "skladem"
	);

	console.log("inStockCars", inStockCars.length);
	const importCars = carsForSale.filter((car) => car.stockType === "dovoz");
	const soldCars = carsForSale.filter((car) => car.available === false);

	const ref = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const servicesRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
	const isServicesInView = useInView(servicesRef, {
		once: true,
		amount: 0.1,
	});
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	// Add state for expandable sections
	const [isInStockExpanded, setIsInStockExpanded] = useState(false);
	const [isImportExpanded, setIsImportExpanded] = useState(false);
	const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
	const [selectedImage, setSelectedImage] = useState<{
		src: string;
		alt: string;
	} | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Sold cars images array (moved outside for navigation)
	const soldCarsImages = [
		{
			src: "/sold-cars/IMG_4515-min.jpeg",
			alt: "Prodaný vůz 1",
		},
		{
			src: "/sold-cars/IMG_3321-min.jpeg",
			alt: "Prodaný vůz 2",
		},
		{
			src: "/sold-cars/IMG_1165-min.jpeg",
			alt: "Prodaný vůz 3",
		},
		{
			src: "/sold-cars/IMG_1296-min.jpeg",
			alt: "Prodaný vůz 4",
		},
		{
			src: "/sold-cars/IMG_1317-min.jpg",
			alt: "Prodaný vůz 5",
		},
		{
			src: "/sold-cars/IMG_3119-min.jpg",
			alt: "Prodaný vůz 6",
		},
		{
			src: "/sold-cars/IMG_5234-min.jpg",
			alt: "Prodaný vůz 7",
		},
		{
			src: "/sold-cars/IMG_9313-min.jpg",
			alt: "Prodaný vůz 8",
		},
		{
			src: "/sold-cars/IMG_3177-min.jpg",
			alt: "Prodaný vůz 9",
		},
		{
			src: "/sold-cars/IMG_1251-min.JPEG",
			alt: "Prodaný vůz 10",
		},
		{
			src: "/sold-cars/IMG_7430.jpg",
			alt: "Prodaný vůz 11",
		},
		{
			src: "/sold-cars/4dc1a17f-5580-4d8a-8754-e00f7e117379.JPG",
			alt: "Prodaný vůz 12",
		},
		{
			src: "/sold-cars/f84a1fbe-0464-46d4-872d-8a495c176939.JPG",
			alt: "Prodaný vůz 13",
		},
		{
			src: "/sold-cars/b839b4dd-99a0-4c80-94cf-ba95a5a2f44f.JPG",
			alt: "Prodaný vůz 14",
		},
		{
			src: "/sold-cars/IMG_6527.JPG",
			alt: "Prodaný vůz 15",
		},
		{
			src: "/sold-cars/869b0547-c57f-49e9-b960-8424f24229e8.JPG",
			alt: "Prodaný vůz 16",
		},
	];

	const openImageModal = (photo: { src: string; alt: string }) => {
		const index = soldCarsImages.findIndex((img) => img.src === photo.src);
		setCurrentImageIndex(index);
		setSelectedImage(photo);
	};

	const navigateImage = (direction: "prev" | "next") => {
		const newIndex =
			direction === "next"
				? (currentImageIndex + 1) % soldCarsImages.length
				: (currentImageIndex - 1 + soldCarsImages.length) %
				  soldCarsImages.length;
		setCurrentImageIndex(newIndex);
		setSelectedImage(soldCarsImages[newIndex]);
	};

	const form = useForm<SaleFormValues>({
		resolver: zodResolver(saleFormSchema),
		defaultValues: {
			brand: "",
			type: "",
			price: "",
			transmission: "",
			engine: "",
			condition: "",
			description: "",
			phone: "",
			email: "",
		},
	});

	async function onSubmit(data: SaleFormValues) {
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const emailData = formatSaleFormData(data);
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
				<ArtDecoHeading centered>
					PRODEJ A DOVOZ NA ZAKÁZKU
				</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Nabízíme k prodeji pečlivě vybrané a prověřené veterány.
						V naší nabídce najdete jak vozy skladem, tak možnost
						dovozu na zakázku.
					</p>
				</div>

				<section ref={ref} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Auta na skladě
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(isInStockExpanded
							? inStockCars
							: inStockCars.slice(0, 4)
						).map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>

					{inStockCars.length > 4 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-right mt-8"
						>
							<button
								onClick={() =>
									setIsInStockExpanded(!isInStockExpanded)
								}
								className="vintage-button"
							>
								{isInStockExpanded ? "Sbalit" : "Rozbalit vše"}
							</button>
						</motion.div>
					)}
				</section>

				<section className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Auta na dovoz
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(isImportExpanded
							? importCars
							: importCars.slice(0, 4)
						).map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>

					{importCars.length > 4 && (
						<div className="text-right mt-8">
							<button
								onClick={() =>
									setIsImportExpanded(!isImportExpanded)
								}
								className="vintage-button"
							>
								{isImportExpanded ? "Sbalit" : "Rozbalit vše"}
							</button>
						</div>
					)}
				</section>

				<section ref={formRef} className="mb-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={
							isFormInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6 }}
						className="art-deco-border"
					>
						<div className="p-8 bg-cream-darker">
							<h2 className="font-marcellus text-2xl md:text-3xl mb-8 vintage-heading">
								Nenašli jste vůz, který jste hledali?
							</h2>

							<p className="mb-8 font-montserrat text-brown">
								Zašlete Nám nezávaznou poptávku a my se Vám
								ozveme s nabídkou vozů dle Vašich představ.
							</p>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="grid grid-cols-1 md:grid-cols-2 gap-6"
								>
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="brand"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Značka*
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
											name="bodyType"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Karoserie
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
											name="transmission"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Převodovka
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
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Cenová představa
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
											name="phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Váš tel. *
													</FormLabel>
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
									</div>

									<div className="space-y-4">
										<FormField
											control={form.control}
											name="type"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Typ</FormLabel>
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
											name="engine"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Motor</FormLabel>
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
											name="color"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Barva</FormLabel>
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
											name="condition"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Stav</FormLabel>
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
													<FormLabel>
														Váš email*
													</FormLabel>
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

									<div className="md:col-span-2">
										<FormField
											control={form.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Doplňující popis
													</FormLabel>
													<FormControl>
														<Textarea
															{...field}
															rows={4}
															className="vintage-input w-full"
														/>
													</FormControl>
													<FormMessage className="text-red-500" />
												</FormItem>
											)}
										/>
									</div>

									<div className="md:col-span-2 text-center">
										<button
											type="submit"
											disabled={isSubmitting}
											className="vintage-button disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{isSubmitting
												? "Odesílání..."
												: "ODESLAT"}
										</button>
									</div>

									{submitStatus === "success" && (
										<div className="md:col-span-2 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
											Vaše poptávka byla úspěšně odeslána.
											Brzy se vám ozveme!
										</div>
									)}

									{submitStatus === "error" && (
										<div className="md:col-span-2 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
											Při odesílání došlo k chybě. Zkuste
											to prosím znovu nebo nás kontaktujte
											přímo.
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

				<section
					ref={infoRef}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
				>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={
							isInfoInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -30 }
						}
						transition={{ duration: 0.5 }}
						className="md:col-span-1"
					>
						<h2 className="font-marcellus text-2xl mb-6 vintage-heading">
							Jak to funguje
						</h2>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={
							isInfoInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 30 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="md:col-span-2"
					>
						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<div className="space-y-4 font-montserrat">
									<p>
										Ke každému zákazníkovi přistupujeme
										individuálně. Nejčastější průběh dovozu
										na zakázku je ale takovýto:
									</p>

									<ul className="list-disc pl-6 space-y-4">
										<li>
											Zašleme návrhy několika vozů na
											základě Vaší poptávky, v případě, že
											Vás nějaký zaujme, doložíme bližší
											fotografie (podvozek, motorový
											prostor, interiér, exteriér, slabá
											místa včetně kosmetických vad apod.)
											+ video, jak běží motor.
										</li>
										<li>
											Po odsouhlasení ceny, termínu dodání
											a dalších náležitostí auto osobně
											zkontrolujeme a s Vámi podepíšeme
											doklad o dovozu (nejčastěji bývá
											podloženo VRATNOU zálohou), který
											doložíme podrobným popisem a fotkami
											vozu včetně veškerých defektů.
										</li>
										<li>
											Vůz dovezeme a Vy si jej pak
											přijedete zkontrolovat, proběhne
											zkušební jízda, kontrola na heveru,
											kontrola dokladů apod.
										</li>
										<li>
											V případě že je vše v pořádku,
											proběhne doplacení kupní ceny v
											opačném případě se ZÁLOHA VRACÍ.
										</li>
										<li>
											Po domluvě na autě uděláme servis,
											auto přihlásíme či dovezeme
											klientovi domů.
										</li>
									</ul>

									<div className="border-t border-gold/30 my-8"></div>

									<div className="mt-8">
										<h4 className="font-marcellus mb-2">
											Co vše jsme schopni zařídit:
										</h4>
										<p>
											Přihlašování jak na Bílé tak
											Veteránské SPZ, opravy, garážování,
											poptání náhradních dílů, komisní
											prodej apod.
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<section ref={servicesRef} className="mb-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={
							isServicesInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6 }}
						className="art-deco-border"
					>
						<div className="p-8 bg-cream">
							<h2 className="font-marcellus text-2xl md:text-3xl mb-8 vintage-heading">
								Co nabízíme:
							</h2>

							<ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{[
									"Celková kontrola vozu, pomoc s výběrem, testovací jízdy",
									"Přihlášení na bílé SPZ",
									"Přihlášení na veteránské SPZ (Historické průkazy, veteránské testace apod.)",
									"Renovace, vyvařování, dodávka náhradních dílů apod.",
									"Garážování",
									"Komisní prodej",
								].map((service, index) => (
									<motion.li
										key={index}
										initial={{
											opacity: 0,
											x: index % 2 === 0 ? -20 : 20,
										}}
										animate={
											isServicesInView
												? { opacity: 1, x: 0 }
												: {
														opacity: 0,
														x:
															index % 2 === 0
																? -20
																: 20,
												  }
										}
										transition={{
											duration: 0.5,
											delay: index * 0.1,
										}}
										className="flex items-start"
									>
										<span className="inline-block w-4 h-4 mt-1.5 mr-3 bg-gold flex-shrink-0"></span>
										<span className="font-montserrat">
											{service}
										</span>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.div>
				</section>

				<section ref={galleryRef} className="mb-24">
					<div className="flex items-center justify-between mb-12">
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading">
							Všechny prodané vozy
						</h2>
						<Link
							href="/fotogalerie/prodej"
							className="group flex items-center text-brown hover:text-gold transition-colors duration-300"
						>
							<span className="font-montserrat text-sm mr-2">
								Zobrazit všechny
							</span>
							<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="mb-8 text-center">
						<p className="font-cormorant text-xl text-brown">
							Galerie úspěšně prodaných vozů z našeho autoparku.
						</p>
					</div>

					{(() => {
						const featuredPhotos = soldCarsImages.slice(0, 3);
						const expandedPhotos = soldCarsImages.slice(0, 16);

						return (
							<>
								{!isGalleryExpanded ? (
									// Initial view - 3 featured photos
									<div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
										{featuredPhotos.map((photo, index) => (
											<motion.div
												key={`sold-featured-${index}`}
												initial={{ opacity: 0, y: 20 }}
												animate={
													isGalleryInView
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 20 }
												}
												transition={{
													duration: 0.5,
													delay: index * 0.2,
												}}
												className="group relative overflow-hidden block cursor-pointer"
												onClick={() =>
													openImageModal(photo)
												}
											>
												<div className="art-deco-border overflow-hidden">
													<div className="relative h-72 overflow-hidden">
														<Image
															src={photo.src}
															alt={photo.alt}
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-105"
														/>
														<div className="absolute top-2 left-2">
															<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
																Prodáno
															</span>
														</div>
														<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-4">
															<h3 className="text-cream font-marcellus text-lg">
																{photo.alt}
															</h3>
														</div>
														<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
															<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
																<p className="text-sm font-montserrat">
																	Klikněte pro
																	zvětšení
																</p>
															</div>
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								) : (
									// Expanded view - more photos without gaps
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 max-w-7xl mx-auto">
										{expandedPhotos.map((photo, index) => (
											<motion.div
												key={`sold-expanded-${index}`}
												initial={{ opacity: 0, y: 20 }}
												animate={
													isGalleryInView
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 20 }
												}
												transition={{
													duration: 0.5,
													delay: index * 0.05,
												}}
												className="group relative overflow-hidden block cursor-pointer"
												onClick={() =>
													openImageModal(photo)
												}
											>
												<div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
													<Image
														src={photo.src}
														alt={photo.alt}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105"
													/>
													<div className="absolute top-2 left-2">
														<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
															Prodáno
														</span>
													</div>
													<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-2">
														<h3 className="text-cream font-marcellus text-xs md:text-sm">
															{photo.alt}
														</h3>
													</div>
													<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
														<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
															<p className="text-xs font-montserrat">
																Klikněte pro
																zvětšení
															</p>
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								)}

								<div className="text-center mt-12">
									<button
										onClick={() =>
											setIsGalleryExpanded(
												!isGalleryExpanded
											)
										}
										className="vintage-button"
									>
										{isGalleryExpanded
											? "Sbalit"
											: "Rozbalit"}
									</button>
								</div>
							</>
						);
					})()}
				</section>

				{/* Fullscreen Image Modal */}
				{selectedImage && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
						<div className="relative w-full h-full flex items-center justify-center p-4">
							{/* Close Button */}
							<button
								onClick={() => setSelectedImage(null)}
								className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<X className="w-6 h-6" />
							</button>

							{/* Previous Button */}
							<button
								onClick={() => navigateImage("prev")}
								className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<ChevronLeft className="w-8 h-8" />
							</button>

							{/* Next Button */}
							<button
								onClick={() => navigateImage("next")}
								className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<ChevronRight className="w-8 h-8" />
							</button>

							{/* Image */}
							<div className="relative max-w-7xl max-h-full w-full h-full">
								<Image
									src={selectedImage.src}
									alt={selectedImage.alt}
									fill
									className="object-contain"
									priority
								/>
							</div>

							{/* Image Counter and Title */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg">
								<div className="text-center">
									<p className="text-white/70 text-sm font-montserrat mb-1">
										{currentImageIndex + 1} /{" "}
										{soldCarsImages.length}
									</p>
									<h3 className="text-white font-marcellus text-lg">
										{selectedImage.alt}
									</h3>
								</div>
							</div>

							{/* Click outside to close */}
							<div
								className="absolute inset-0 -z-10"
								onClick={() => setSelectedImage(null)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
