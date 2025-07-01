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

	// Mix all photos from all categories for the main gallery
	const allMixedPhotos = [
		...saleCars
			.slice(0, 4)
			.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Prodej",
			})),
		...rentalCars
			.slice(0, 4)
			.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Pronájem",
			})),
		...weddingCars
			.slice(0, 4)
			.map((car) => ({
				src: car.mainImage,
				alt: car.name,
				category: "Svatby",
			})),
	];

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
