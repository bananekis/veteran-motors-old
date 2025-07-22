"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArtDecoHeading from "@/components/art-deco-heading";
import { cars } from "@/lib/data";

export default function WeddingGalleryPage() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	// Filter wedding cars and collect only main images
	const weddingCars = cars.filter((car) => car.category === "wedding");
	const mainPhotos = weddingCars.map((car) => ({
		src: car.mainImage,
		alt: car.name,
		carName: car.name,
		carId: car.id,
	}));

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>
					FOTOGALERIE - SVATEBNÍ VOZY
				</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si kompletní fotogalerii našich svatebních
						vozů. Každý vůz je připravený pro váš nezapomenutelný
						svatební den.
					</p>
				</div>

				<section ref={ref} className="mb-24">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mainPhotos.map((photo, index) => (
							<Link
								key={`${photo.carName}-${index}`}
								href={`/fotogalerie/svatby/${photo.carId}`}
								className="group"
							>
								<motion.div
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
									className="art-deco-border overflow-hidden h-full"
								>
									<div className="relative h-64">
										<Image
											src={photo.src}
											alt={photo.alt}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-102"
										/>
										<div className="absolute inset-0 bg-brown-dark/20 group-hover:bg-brown-dark/40 transition-colors duration-300"></div>
									</div>
									<div className="p-4 bg-cream-darker">
										<h3 className="font-marcellus text-lg text-brown-dark">
											{photo.carName}
										</h3>
									</div>
								</motion.div>
							</Link>
						))}
					</div>
				</section>

				<div className="text-center">
					<Link href="/fotogalerie" className="vintage-button">
						Zpět na hlavní galerii
					</Link>
				</div>
			</div>
		</div>
	);
}
