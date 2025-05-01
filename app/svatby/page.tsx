"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars, weddingServices } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";

export default function WeddingsPage() {
	const weddingCars = cars.filter(
		(car) => car.category === "wedding" || car.category === "all"
	);

	const servicesRef = useRef<HTMLDivElement>(null);
	const carsRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	const isServicesInView = useInView(servicesRef, {
		once: true,
		amount: 0.1,
	});
	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });
	const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });
	const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>SVATBY</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Učiňte svůj jedinečný den opravdu jedinečným!
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
						Půjčovaná auta
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{weddingCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="wedding"
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
						Rezervace a další informace
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
									svatby@veteranmotors.cz
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
						</motion.div>
					</div>
				</section>
			</div>
		</div>
	);
}
