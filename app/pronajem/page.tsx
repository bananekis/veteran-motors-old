"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars, rentalPrices } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";

export default function RentalPage() {
	const rentalCars = cars.filter(
		(car) => car.category === "rental" || car.category === "all"
	);

	const ref = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });

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

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{rentalCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="rental"
								index={index}
							/>
						))}
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

				<section className="text-center">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Rezervace a další informace
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Telefon
								</h3>
								<p className="font-montserrat">
									+420 123 456 789
								</p>
							</div>
						</div>

						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Email
								</h3>
								<p className="font-montserrat">
									pronajem@veteranmotors.cz
								</p>
							</div>
						</div>

						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<h3 className="font-marcellus text-xl mb-3">
									Sociální sítě
								</h3>
								<div className="flex justify-center space-x-4">
									<a
										href="#"
										className="text-brown hover:text-gold transition-colors duration-300"
									>
										<span className="sr-only">
											Facebook
										</span>
										<svg
											className="h-6 w-6"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
												clipRule="evenodd"
											/>
										</svg>
									</a>
									<a
										href="#"
										className="text-brown hover:text-gold transition-colors duration-300"
									>
										<span className="sr-only">
											Instagram
										</span>
										<svg
											className="h-6 w-6"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
												clipRule="evenodd"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
