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
						Půjčte si auta na focení, do filmů, klipů na akce a
						eventy či jen na na projížďku nebo výlet
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

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

					<p className="mb-6 font-montserrat">
						Finální cena je vždy stanovena individuálně podle
						parametrů účelu pronájmu.
					</p>

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
											hodina
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											půl den
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											den
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											víkenední
										</th>
										<th className="py-4 px-4 text-left font-marcellus">
											po domluvě
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-gold/20">
										<td className="py-4 px-4 font-montserrat">
											...
										</td>
										<td className="py-4 px-4 font-montserrat">
											499,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											999,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											1.999,- Kč
										</td>
										<td className="py-4 px-4 font-montserrat">
											po domluvě
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
						V případě pronájmu na focení, do filmů či na akce je
						cena individuální.
					</p>
				</section>

				<RentalForm
					title="Rezervace vozu"
					description="Vyplňte formulář pro rezervaci vozu na vámi požadovaný termín. Budeme vás kontaktovat s potvrzením dostupnosti."
					note={
						<p
							className="text-xs text-gray-500 mb-4"
							style={{ fontSize: "0.85rem" }}
						>
							ne všechny údaje jsou povinné
						</p>
					}
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
											domluvené místo. Na přání jsme
											schopni vůz i upravit podle vašich
											požadavků.
										</li>
										<li>
											Při předání podepíšeme předávací
											protokol a nájmení dohodu + Vás
											seznámíme s ovládáním vozu – není to
											nic složitého.
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

									<div className="mt-6 space-y-3">
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
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{rentalCars.slice(0, 3).map((car, index) => (
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
