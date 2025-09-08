"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import Image from "next/image";
import Link from "next/link";

export default function InStockPage() {
	const inStockCars = cars.filter(
		(car) => car.categories.includes("sale") && car.stockType === "skladem"
	);

	const carsRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>AUTA NA SKLADĚ</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si naši kompletní nabídku vozů skladem.
						Všechny vozy jsou pečlivě vybrané a udržované.
					</p>
				</div>

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
						Dostupné vozy
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{inStockCars.map((car, index) => (
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
										Proces koupě vozu na skladě je přímočarý
										a transparentní:
									</p>

									<ul className="list-disc pl-6 space-y-4">
										<li>
											Vyberte si vůz z naší nabídky vozů
											na skladě nebo nás kontaktujte pro
											bližší informace
										</li>
										<li>
											Domluvte si osobní prohlídku vozu a
											zkušební jízdu u nás na prodejně
										</li>
										<li>
											Po kontrole technického stavu a
											dohodě podmínek sepíšeme kupní
											smlouvu
										</li>
										<li>
											Zajistíme kompletní přihlášení vozu
											a předání v perfektním stavu
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

				<section ref={galleryRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{inStockCars.slice(0, 3).map((car, index) => (
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
									prodej@veteranmotors.cz
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
