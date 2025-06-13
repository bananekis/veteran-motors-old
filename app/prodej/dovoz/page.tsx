"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import Image from "next/image";
import Link from "next/link";

export default function ImportPage() {
	const importCars = cars.filter((car) => car.category === "sale");

	const servicesRef = useRef<HTMLDivElement>(null);
	const carsRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isServicesInView = useInView(servicesRef, {
		once: true,
		amount: 0.1,
	});
	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>AUTA NA DOVOZ</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si naši nabídku vozů na dovoz. Každý vůz je
						pečlivě vybrán a před dodáním prochází důkladnou
						kontrolou.
					</p>
				</div>

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
									"Výběr vozu podle vašich požadavků",
									"Osobní prohlídka vozu v zahraničí",
									"Kompletní servisní prohlídka",
									"Dovoz a registrace vozu",
									"Záruka na technický stav",
									"Pomoc s celním odbavením",
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

				<section ref={carsRef} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isCarsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Dostupné vozy na dovoz
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{importCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>
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
										Proces dovozu vozu je u nás jednoduchý a
										transparentní:
									</p>

									<ul className="list-disc pl-6 space-y-4">
										<li>
											Zašleme návrhy několika vozů na
											základě Vaší poptávky
										</li>
										<li>
											Po odsouhlasení ceny a termínu
											dodání auto osobně zkontrolujeme
										</li>
										<li>
											Podepíšeme doklad o dovozu s
											podrobným popisem a fotkami vozu
										</li>
										<li>
											Vůz dovezeme a vy si jej přijedete
											zkontrolovat
										</li>
										<li>
											Po domluvě na autě uděláme servis a
											přihlásíme jej
										</li>
									</ul>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<section ref={galleryRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{importCars.slice(0, 5).map((car, index) => (
							<div
								key={car.id}
								className="group flex flex-col h-full"
							>
								<div className="art-deco-border overflow-hidden flex flex-col h-full">
									<div className="relative h-72 overflow-hidden">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 to-transparent"></div>
										<div className="absolute inset-0 flex items-center justify-center">
											<h3 className="font-marcellus text-2xl text-white text-shadow tracking-wider text-center px-4">
												{car.name}
											</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/fotogalerie" className="vintage-button">
							Zobrazit všechny fotky
						</Link>
					</div>
				</section>

				<section ref={contactRef} className="text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isContactInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Kontakt a rezervace
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={
								isContactInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 30 }
							}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="art-deco-border"
						>
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Telefon
								</h3>
								<p className="font-montserrat">
									+420 123 456 789
								</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={
								isContactInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 30 }
							}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="art-deco-border"
						>
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Email
								</h3>
								<p className="font-montserrat">
									dovoz@veteranmotors.cz
								</p>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={
								isContactInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 30 }
							}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="art-deco-border"
						>
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Adresa
								</h3>
								<p className="font-montserrat">
									Veteran Motors s.r.o.
									<br />
									Praha 1, 110 00
								</p>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</div>
	);
}
