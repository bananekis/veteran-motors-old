"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import WeddingForm from "@/components/wedding-form";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WeddingsPage() {
	const weddingCars = cars.filter(
		(car) => car.category === "wedding" || car.category === "all"
	);

	const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
	const [isWeddingCarsExpanded, setIsWeddingCarsExpanded] = useState(false);

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
						Učiňte svůj jedinečný den opravdu jedinečným. Pronajměte
						si vůz na stavbu včetně výzdoby, řidiče, focení, dopravy
						a dalších služeb.
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

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(isWeddingCarsExpanded
							? weddingCars
							: weddingCars.slice(0, 4)
						).map((car, index) => (
							<div key={car.id} className="h-full">
								<CarCard
									car={car}
									type="wedding"
									index={index}
								/>
							</div>
						))}
					</div>

					{weddingCars.length > 4 && (
						<div className="text-right mt-12">
							<button
								onClick={() =>
									setIsWeddingCarsExpanded(
										!isWeddingCarsExpanded
									)
								}
								className="vintage-button"
							>
								{isWeddingCarsExpanded
									? "Sbalit"
									: "Rozbalit vše"}
							</button>
						</div>
					)}
				</section>

				<section ref={servicesRef} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isServicesInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Ceník
					</motion.h2>

					<p className="mb-6 font-montserrat">
						Finální cena je vždy stanovena individuálně podle
						rozsahu služeb a délky pronájmu.
					</p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={
							isServicesInView
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
											Ceník
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											hodina
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											půl den
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											den
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											vícedenní
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											Ford Mustang GT
										</td>
										<td className="py-4 px-4 font-montserrat">
											490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											BMW 2002
										</td>
										<td className="py-4 px-4 font-montserrat">
											290,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											790,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											VW Brouk
										</td>
										<td className="py-4 px-4 font-montserrat">
											290,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											790,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											Chevrolet Camaro SS
										</td>
										<td className="py-4 px-4 font-montserrat">
											490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											Chevrolet Corvette C3
										</td>
										<td className="py-4 px-4 font-montserrat">
											490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											Cadillac Eldorado
										</td>
										<td className="py-4 px-4 font-montserrat">
											490,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.990,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</motion.div>

					<p className="mt-4 text-sm italic font-montserrat">
						V případě svateb jsou k dispozici i doplňkové služby:
						řidič, výzdoba, fotoportrét.
					</p>

					<p className="mt-4 text-sm italic font-montserrat">
						* Ceny jsou orientační a mohou se lišit podle konkrétní
						objednávky. Pro přesnou kalkulaci a podmínky pronájmu
						nás kontaktujte.
					</p>
				</section>

				<WeddingForm
					title="Rezervace vozu na svatbu"
					description="Vyplňte formulář pro rezervaci vozu a my se vám ozveme s potvrzením objednávky."
				/>

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
									<ul className="list-disc pl-6 space-y-4">
										<li>
											Po rezervaci se Vám ozveme a
											společně doladíme podmínky pronájmu.
											Pokud chcete, můžete se na auto
											předem přijet osobně podívat.
										</li>
										<li>
											Vůz vám můžeme přistavit na předem
											domluvené místo, vyzvednout
											novomanžele či přichystat dle
											požadavků výše.
										</li>
										<li>
											Při předání podepíšeme předávací
											protokol a nájemní dohodu + Vás
											seznámíme s užíváním a ovládáním
											vozu – není to nic složitého.
										</li>
										<li>
											Zároveň složíte vratnou zálohu a
											předáme Vám klíčky od vozu. Rádi se
											mezitím postaráme i o Vaše vlastní
											auto.
										</li>
										<li>
											Po skončení pronájmu si auto buď
											vyzvedneme, nebo si ho předáme na
											domluveném místě. Vše vyúčtujeme a
											případně vrátíme zbývající část
											zálohy.
										</li>
									</ul>

									<div className="border-t border-gold/30 my-6"></div>

									<div className="space-y-3">
										<p>
											Všechny naše vozy jsou pojištěné,
											ale doporučujeme s nimi zacházet s
											citem.
										</p>
										<p>
											Po celou dobu pronájmu jsme vám k
											dispozici na telefonu.
										</p>
										<p>
											V případě poruchy, nehody nebo
											jiných problémů vám okamžitě
											pomůžeme vše vyřešit.
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<section ref={galleryRef} className="mb-24">
					<div className="flex items-center justify-between mb-12">
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading">
							Fotogalerie
						</h2>
						<Link
							href="/fotogalerie/svatby"
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
							Prohlédněte si galerii našich svatebních vozů.
						</p>
					</div>

					{(() => {
						// Get photos from wedding cars
						const allPhotos = weddingCars
							.map((car) => ({
								src: car.mainImage,
								alt: car.name,
								category: "Svatby",
								id: car.id,
							}))
							// Remove duplicates based on image src
							.filter(
								(photo, index, array) =>
									array.findIndex(
										(p) => p.src === photo.src
									) === index
							);

						const featuredPhotos = allPhotos.slice(0, 3);
						const expandedPhotos = allPhotos.slice(0, 15);

						return (
							<>
								{!isGalleryExpanded ? (
									// Initial view - 3 featured photos
									<div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
										{featuredPhotos.map((photo, index) => (
											<Link
												key={photo.id}
												href={`/fotogalerie/svatby/${photo.id}`}
												className="group relative overflow-hidden block"
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
																{photo.category}
															</span>
														</div>
														<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-4">
															<h3 className="text-cream font-marcellus text-lg">
																{photo.alt}
															</h3>
														</div>
													</div>
												</div>
											</Link>
										))}
									</div>
								) : (
									// Expanded view - more photos without gaps
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 max-w-7xl mx-auto">
										{expandedPhotos.map((photo, index) => (
											<Link
												key={photo.id}
												href={`/fotogalerie/svatby/${photo.id}`}
												className="group relative overflow-hidden block"
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
															{photo.category}
														</span>
													</div>
													<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-2">
														<h3 className="text-cream font-marcellus text-xs md:text-sm">
															{photo.alt}
														</h3>
													</div>
												</div>
											</Link>
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
			</div>
		</div>
	);
}
