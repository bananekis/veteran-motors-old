"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/lib/data";
import ArtDecoHeading from "@/components/art-deco-heading";
import CarCard from "@/components/car-card";

export default function SalePage() {
	const carsForSale = cars.filter((car) => car.category === "sale");
	const inStockCars = carsForSale.slice(0, 4);
	const importCars = carsForSale.slice(0, 4);
	const soldCars = carsForSale.slice(0, 4); // This would be replaced with actual sold cars data

	const ref = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isFormInView = useInView(formRef, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>PRODEJ</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Nabízíme k prodeji pečlivě vybrané a udržované veterány.
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
						{inStockCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>

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
						<Link href="/prodej/skladem" className="vintage-button">
							Rozbalit vše
						</Link>
					</motion.div>
				</section>

				<section className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Auta na dovoz
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{importCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>

					<div className="text-right mt-8">
						<Link href="/prodej/dovoz" className="vintage-button">
							Rozbalit vše
						</Link>
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
										Ke každému zákazníkovi přistupujeme
										individuálně. Nejčastější průběh dovozu
										na zakázku je ale takovýto:
									</p>

									<ul className="list-disc pl-6 space-y-4">
										<li>
											Zašleme návrhy několika vozů na
											základě Vaší poptávky, v případě, že
											Vás nějaký zaujme, doložíme bližší
											fotky (podvozek, motorový prostor,
											interiér, exteriér, slabá místa
											včetně kosmetických vad apod.) a
											video jak běží motor.
										</li>
										<li>
											Po odsouhlasení ceny, termínu dodání
											apod. auto osobně zkontrolujeme a s
											Vámi podepíšeme doklad o dovozu
											(nejčastěji bývá podloženo VRATNOU
											zálohou), který doložíme podrobným
											popisem a fotkami vozu včetně
											veškerých defektů.
										</li>
										<li>
											Vůz dovezeme a vy si jej pak
											přijedete zkontrolovat, proběhne
											zkušební jízda, kontrola na heveru,
											kontrola dokladů apod.
										</li>
										<li>
											V případě že je vše v pořádku,
											proběhne doplacení kupní ceny v
											opačném případě se ZÁLOHA VRACÍ
										</li>
										<li>
											Po domluvě na autě uděláme servis,
											auto přihlásíme či dovezeme
											klientovi domů
										</li>
									</ul>

									<div className="mt-8">
										<h4 className="font-marcellus mb-2">
											Co vše jsme schopni zařídit:
										</h4>
										<p>
											Přihlašování jak na bílé tak
											Veteránské SPZ, opravy, garážování,
											shánění náhradních dílů, ...
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
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

							<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div>
										<label
											htmlFor="brand"
											className="block mb-2 font-medium"
										>
											Značka
										</label>
										<input
											type="text"
											id="brand"
											className="vintage-input"
										/>
									</div>

									<div>
										<label
											htmlFor="type"
											className="block mb-2 font-medium"
										>
											Typ
										</label>
										<input
											type="text"
											id="type"
											className="vintage-input"
										/>
									</div>

									<div>
										<label
											htmlFor="price"
											className="block mb-2 font-medium"
										>
											Cenová představa
										</label>
										<input
											type="text"
											id="price"
											className="vintage-input"
										/>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<label
											htmlFor="transmission"
											className="block mb-2 font-medium"
										>
											Převodovka
										</label>
										<input
											type="text"
											id="transmission"
											className="vintage-input"
										/>
									</div>

									<div>
										<label
											htmlFor="engine"
											className="block mb-2 font-medium"
										>
											Motor
										</label>
										<input
											type="text"
											id="engine"
											className="vintage-input"
										/>
									</div>

									<div>
										<label
											htmlFor="condition"
											className="block mb-2 font-medium"
										>
											Stav
										</label>
										<input
											type="text"
											id="condition"
											className="vintage-input"
										/>
									</div>
								</div>

								<div className="md:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 font-medium"
									>
										Doplňující popis
									</label>
									<textarea
										id="description"
										rows={4}
										className="vintage-input"
									></textarea>
								</div>

								<div className="space-y-4">
									<div>
										<label
											htmlFor="phone"
											className="block mb-2 font-medium"
										>
											Váš tel.
										</label>
										<input
											type="tel"
											id="phone"
											className="vintage-input"
										/>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<label
											htmlFor="email"
											className="block mb-2 font-medium"
										>
											Váš email
										</label>
										<input
											type="email"
											id="email"
											className="vintage-input"
										/>
									</div>
								</div>

								<div className="md:col-span-2 text-center mt-4">
									<button
										type="submit"
										className="vintage-button"
									>
										ODESLAT
									</button>
								</div>
							</form>
						</div>
					</motion.div>
				</section>

				<section className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Prodaná auta
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{soldCars.map((car, index) => (
							<CarCard
								key={car.id}
								car={car}
								type="sale"
								index={index}
							/>
						))}
					</div>

					<div className="text-right mt-8">
						<Link href="/prodej/prodana" className="vintage-button">
							Rozbalit vše
						</Link>
					</div>
				</section>

				<section ref={galleryRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Fotogalerie
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{inStockCars.slice(0, 5).map((car, index) => (
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
							href="/fotogalerie/prodej"
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
