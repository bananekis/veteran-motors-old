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
	const saleCars = cars.filter((car) => car.categories.includes("sale"));
	const rentalCars = cars.filter((car) => car.categories.includes("rental"));
	const weddingCars = cars.filter((car) =>
		car.categories.includes("wedding")
	);

	// Create a truly randomized mix from all categories
	const createRandomMix = () => {
		const allCarsWithCategory = [
			...saleCars.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Prodej",
			})),
			...rentalCars.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Pronájem",
			})),
			...weddingCars.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Svatby",
			})),
		];

		// Shuffle the array randomly and take 12 cars for a good mix
		const shuffled = allCarsWithCategory.sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 12);
	};

	const allMixedPhotos = createRandomMix();

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>FOTOGALERIE</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si naši fotogalerii - mix fotografií ze
						všech kategorií.
					</p>
				</div>

				<section ref={ref} className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{allMixedPhotos.map((photo, index) => (
							<motion.div
								key={`${photo.alt}-${index}`}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="art-deco-border overflow-hidden"
							>
								<div className="relative h-64">
									<Image
										src={photo.src}
										alt={photo.alt}
										fill
										className="object-cover"
									/>
									<div className="absolute top-2 left-2">
										<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
											{photo.category}
										</span>
									</div>
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-4">
										<h3 className="text-cream font-marcellus text-sm">
											{photo.alt}
										</h3>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<button
							onClick={() => {
								// This would expand to show all photos
								// For now, we'll create separate category sections
								const expanded =
									document.querySelector("#expanded-gallery");
								if (expanded) {
									expanded.scrollIntoView({
										behavior: "smooth",
									});
								}
							}}
							className="vintage-button"
						>
							Rozbalit
						</button>
					</div>
				</section>

				<section id="expanded-gallery" className="space-y-24">
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
									className="art-deco-border overflow-hidden"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover"
										/>
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
									className="art-deco-border overflow-hidden"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover"
										/>
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
									className="art-deco-border overflow-hidden"
								>
									<div className="relative h-64">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover"
										/>
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
