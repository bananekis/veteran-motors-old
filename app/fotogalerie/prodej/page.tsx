"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArtDecoHeading from "@/components/art-deco-heading";
import { cars } from "@/lib/data";

export default function SaleGalleryPage() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	// Filter sale cars and collect all their images
	const saleCars = cars.filter((car) => car.category === "sale");
	const allPhotos = saleCars.flatMap((car) => [
		{
			src: car.mainImage,
			alt: car.name,
			carName: car.name,
			id: car.id,
		},
		...car.images.map((image, index) => ({
			src: image,
			alt: `${car.name} - detail ${index + 1}`,
			carName: car.name,
			id: car.id,
		})),
	]);

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>
					FOTOGALERIE - PRODEJ VOZŮ
				</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si kompletní fotogalerii našich vozů na
						prodej. Každý vůz je pečlivě zdokumentován pro vaši
						prohlídku.
					</p>
				</div>

				<section ref={ref} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Všechny vozy na prodej
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{allPhotos.map((photo, index) => (
							<Link
								key={`${photo.carName}-${index}`}
								href={`/fotogalerie/prodej/${photo.id}`}
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
