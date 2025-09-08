"use client";

import { useState } from "react";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, Clock, Car, Heart } from "lucide-react";

export default function Home() {
	const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
	const featuredCars = cars.filter((car) => car.featured).slice(0, 3);

	// Get photos from all categories for expanded view, removing duplicates
	const allPhotos = cars
		.filter((car) => car.featured)
		.map((car) => ({
			src: car.mainImage,
			alt: car.name,
			category: car.categories.includes("sale")
				? "Prodej"
				: car.categories.includes("rental")
				? "Pronájem"
				: "Svatby",
			id: car.id,
		}))
		// Remove duplicates based on image src
		.filter(
			(photo, index, array) =>
				array.findIndex((p) => p.src === photo.src) === index
		);

	const expandedPhotos = allPhotos.slice(0, 15); // Show 15 unique photos when expanded

	return (
		<div>
			<HeroSection />

			<ServicesSection />

			<AboutSection />

			<section className="section-padding bg-cream-darker">
				<div className="container-vintage">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 vintage-heading mx-auto">
						FOTOGALERIE
					</h2>

					{!isGalleryExpanded ? (
						// Initial view - 3 featured cars
						<div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
							{featuredCars.map((car, index) => {
								const getGalleryUrl = (car: any) => {
									if (car.categories.includes("sale"))
										return `/fotogalerie/prodej/${car.id}`;
									if (car.categories.includes("rental"))
										return `/fotogalerie/pronajem/${car.id}`;
									if (car.categories.includes("wedding"))
										return `/fotogalerie/svatby/${car.id}`;
									return `/fotogalerie/prodej/${car.id}`; // fallback
								};

								return (
									<Link
										key={car.id}
										href={getGalleryUrl(car)}
										className="group flex flex-col h-full"
									>
										<div className="art-deco-border overflow-hidden">
											<div className="relative h-72 overflow-hidden">
												<Image
													src={car.mainImage}
													alt={car.name}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											</div>
										</div>
									</Link>
								);
							})}
						</div>
					) : (
						// Expanded view - more photos without gaps
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 max-w-7xl mx-auto">
							{expandedPhotos.map((photo, index) => {
								const getGalleryUrl = (
									category: string,
									id: string
								) => {
									if (category === "Prodej")
										return `/fotogalerie/prodej/${id}`;
									if (category === "Pronájem")
										return `/fotogalerie/pronajem/${id}`;
									if (category === "Svatby")
										return `/fotogalerie/svatby/${id}`;
									return `/fotogalerie/prodej/${id}`; // fallback
								};

								return (
									<Link
										key={photo.id}
										href={getGalleryUrl(
											photo.category,
											photo.id
										)}
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
								);
							})}
						</div>
					)}

					<div className="text-center mt-12">
						<button
							onClick={() =>
								setIsGalleryExpanded(!isGalleryExpanded)
							}
							className="vintage-button"
						>
							{isGalleryExpanded ? "Sbalit" : "Rozbalit"}
						</button>
					</div>
				</div>
			</section>

			<section className="section-padding">
				<div className="container-vintage">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
						<div className="text-center p-3 art-deco-border">
							<Trophy className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								100+
							</h3>
							<p className="text-xs md:text-sm">Prodaných vozů</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Car className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								50+
							</h3>
							<p className="text-xs md:text-sm">
								Pronajatých vozů
							</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Heart className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								50+
							</h3>
							<p className="text-xs md:text-sm">Svateb</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Clock className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								10+
							</h3>
							<p className="text-xs md:text-sm">Let zkušeností</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								100+
							</h3>
							<p className="text-xs md:text-sm">
								Spokojených klientů
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
