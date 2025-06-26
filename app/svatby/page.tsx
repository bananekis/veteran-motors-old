"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars, weddingServices } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import RentalForm from "@/components/rental-form";
import Image from "next/image";
import Link from "next/link";

export default function WeddingsPage() {
	const weddingCars = cars.filter(
		(car) => car.category === "wedding" || car.category === "all"
	);

	const servicesRef = useRef<HTMLDivElement>(null);
	const carsRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isServicesInView = useInView(servicesRef, {
		once: true,
		amount: 0.1,
	});
	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });
	const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });
	const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>SVATBY</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Učiňte svůj jedinečný den opravdu jedinečným! Nabízíme
						pronájem vozů na svatby včetně výzdoby, dopravy a
						dalších služeb.
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
						Vozy pro svatby
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{weddingCars.slice(0, 4).map((car, index) => (
							<div key={car.id} className="h-full">
								<CarCard
									car={car}
									type="wedding"
									index={index}
								/>
							</div>
						))}
					</div>

					<div className="text-right mt-12">
						<Link href="/svatby/vozy" className="vintage-button">
							Rozbalit vše
						</Link>
					</div>
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
								Co všechno umíme zařídit:
							</h2>

							<ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{weddingServices.map((service, index) => (
									<motion.li
										key={service.id}
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
											{service.name}
										</span>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.div>
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
											Služba
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											Popis
										</th>
										<th className="py-4 px-4 text-right font-marcellus">
											Cena od
										</th>
									</tr>
								</thead>
								<tbody>
									{weddingServices.map((service) => (
										<tr
											key={service.id}
											className="border-b border-gold/20"
										>
											<td className="py-4 px-4 font-montserrat font-medium">
												{service.name}
											</td>
											<td className="py-4 px-4 font-montserrat">
												{service.description}
											</td>
											<td className="py-4 px-4 text-right font-montserrat">
												{service.price.toLocaleString()}{" "}
												Kč
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>

					<p className="mt-4 text-sm italic font-montserrat">
						* Ceny jsou orientační a mohou se lišit podle
						konkrétních požadavků a vzdálenosti. Pro přesnou
						kalkulaci nás prosím kontaktujte.
					</p>
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
									Výzdoba, doprava, rezervace, kauce...
								</h3>

								<div className="space-y-4 font-montserrat">
									<p>
										Pronájem vozu na svatbu je jednoduchý
										proces. Vyberte si vůz, který se vám
										líbí, a my se postaráme o vše ostatní.
									</p>

									<p>
										Vozy dovezeme na místo určení v
										perfektním stavu a s krásnou výzdobou.
										Můžeme zajistit i dopravu nevěsty a
										ženicha mezi jednotlivými místy obřadu.
									</p>

									<p>
										Všechny naše vozy jsou pojištěné a řidič
										je profesionál s dlouholetými
										zkušenostmi. Můžete se spolehnout na
										spolehlivost a eleganci.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<RentalForm
					title="Rezervace vozu na svatbu"
					description="Vyplňte formulář pro rezervaci vozu na váš svatební den. Budeme vás kontaktovat s potvrzením dostupnosti a dalšími detaily."
				/>

				<section ref={galleryRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{weddingCars.slice(0, 5).map((car, index) => (
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
							href="/fotogalerie/svatby"
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
