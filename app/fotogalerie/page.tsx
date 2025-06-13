"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ArtDecoHeading from "@/components/art-deco-heading";
import { cars } from "@/lib/data";

export default function GalleryPage() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	// Filter cars for each category
	const saleCars = cars.filter((car) => car.category === "sale");
	const rentalCars = cars.filter((car) => car.category === "rental");
	const weddingCars = cars.filter((car) => car.category === "wedding");

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>FOTOGALERIE</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si naši fotogalerii rozdělenou do kategorií.
						Každá sekce obsahuje unikátní fotografie našich vozů.
					</p>
				</div>

				<section ref={ref} className="space-y-24">
					{/* Prodej Gallery Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="flex flex-col"
					>
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading mb-8">
							Prodej vozů
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{saleCars.slice(0, 6).map((car, index) => (
								<div
									key={car.id}
									className="art-deco-border overflow-hidden group cursor-pointer"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-all duration-300"
										/>
										<div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/30 transition-all duration-300"></div>
									</div>
									<div className="p-4 bg-cream-darker group-hover:bg-cream transition-colors duration-300">
										<h3 className="font-marcellus text-lg text-brown-dark group-hover:text-brown transition-colors duration-300">
											{car.name}
										</h3>
									</div>
								</div>
							))}
						</div>
						<div className="text-right">
							<Link
								href="/fotogalerie/prodej"
								className="vintage-button"
							>
								Zobrazit všechny fotky
							</Link>
						</div>
					</motion.div>

					{/* Pronájem Gallery Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col"
					>
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading mb-8">
							Pronájem vozů
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{rentalCars.slice(0, 6).map((car, index) => (
								<div
									key={car.id}
									className="art-deco-border overflow-hidden group cursor-pointer"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-all duration-300"
										/>
										<div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/30 transition-all duration-300"></div>
									</div>
									<div className="p-4 bg-cream-darker group-hover:bg-cream transition-colors duration-300">
										<h3 className="font-marcellus text-lg text-brown-dark group-hover:text-brown transition-colors duration-300">
											{car.name}
										</h3>
									</div>
								</div>
							))}
						</div>
						<div className="text-right">
							<Link
								href="/fotogalerie/pronajem"
								className="vintage-button"
							>
								Zobrazit všechny fotky
							</Link>
						</div>
					</motion.div>

					{/* Svatby Gallery Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="flex flex-col"
					>
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading mb-8">
							Svatební vozy
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{weddingCars.slice(0, 6).map((car, index) => (
								<div
									key={car.id}
									className="art-deco-border overflow-hidden group cursor-pointer"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-all duration-300"
										/>
										<div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/30 transition-all duration-300"></div>
									</div>
									<div className="p-4 bg-cream-darker group-hover:bg-cream transition-colors duration-300">
										<h3 className="font-marcellus text-lg text-brown-dark group-hover:text-brown transition-colors duration-300">
											{car.name}
										</h3>
									</div>
								</div>
							))}
						</div>
						<div className="text-right">
							<Link
								href="/fotogalerie/svatby"
								className="vintage-button"
							>
								Zobrazit všechny fotky
							</Link>
						</div>
					</motion.div>
				</section>
			</div>
		</div>
	);
}
