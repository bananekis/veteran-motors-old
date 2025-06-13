"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars, rentalPrices } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import RentalForm from "@/components/rental-form";
import Image from "next/image";
import Link from "next/link";

export default function RentalPage() {
	const rentalCars = cars.filter(
		(car) => car.category === "rental" || car.category === "all"
	);

	const ref = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>PRONÁJEM</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Půjčte si auta do filmů, klipů na narozeniny nebo třeba
						jen tak na projížďku
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
						Půjčovaná auta
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{rentalCars.slice(0, 4).map((car, index) => (
							<div key={car.id} className="h-full">
								<CarCard
									car={car}
									type="rental"
									index={index}
								/>
							</div>
						))}
					</div>

					<div className="text-right mt-12">
						<Link href="/pronajem/vozy" className="vintage-button">
							Rozbalit vše
						</Link>
					</div>
				</section>

				<section ref={tableRef} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isTableInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Orientační ceník
					</motion.h2>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={
							isTableInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="art-deco-border"
					>
						<div className="overflow-x-auto bg-cream">
							<table className="w-full">
								<thead>
									<tr className="border-b-2 border-gold/40">
										<th className="py-4 px-4 text-left font-marcellus">
											Vůz
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											4 hodiny
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											8 hodin
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											24 hodin
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											Víkend
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											Kauce
										</th>
									</tr>
								</thead>
								<tbody>
									{rentalCars.map((car) => {
										const prices = rentalPrices[car.id];
										if (!prices) return null;

										return (
											<tr
												key={car.id}
												className="border-b border-gold/20"
											>
												<td className="py-4 px-4 font-montserrat">
													{car.name}
												</td>
												<td className="py-4 px-4 font-montserrat">
													{prices[0].price.toLocaleString()}{" "}
													Kč
												</td>
												<td className="py-4 px-4 font-montserrat">
													{prices[1].price.toLocaleString()}{" "}
													Kč
												</td>
												<td className="py-4 px-4 font-montserrat">
													{prices[2].price.toLocaleString()}{" "}
													Kč
												</td>
												<td className="py-4 px-4 font-montserrat">
													{prices[3].price.toLocaleString()}{" "}
													Kč
												</td>
												<td className="py-4 px-4 font-montserrat">
													{prices[0].deposit.toLocaleString()}{" "}
													Kč
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
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
								<h3 className="font-marcellus text-xl mb-4">
									Dovoz, předání, rezervace, kauce, pomínky,
									pojistka...
								</h3>

								<div className="space-y-4 font-montserrat">
									<p>
										Pronájem našich veteránů je jednoduchý
										proces, který začíná rezervací vozu na
										vámi požadovaný termín. Kauce je vratná
										a slouží jako pojistka proti případnému
										poškození.
									</p>

									<p>
										Vozy dovezeme na místo určení a předáme
										vám je v perfektním stavu. Před předáním
										provedeme krátké školení o ovládání
										historického vozu a specifických
										vlastnostech daného modelu.
									</p>

									<p>
										Všechny naše vozy jsou pojištěné,
										nicméně doporučujeme opatrné zacházení s
										těmito historickými skvosty. V případě
										jakýchkoliv dotazů jsme vám k dispozici
										na telefonu po celou dobu pronájmu.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<RentalForm
					title="Rezervace vozu"
					description="Vyplňte formulář pro rezervaci vozu na vámi požadovaný termín. Budeme vás kontaktovat s potvrzením dostupnosti."
				/>

				<section ref={galleryRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{rentalCars.slice(0, 5).map((car, index) => (
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
						<Link
							href="/fotogalerie/pronajem"
							className="vintage-button"
						>
							Zobrazit všechny fotky
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
