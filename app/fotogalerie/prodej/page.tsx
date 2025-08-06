"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArtDecoHeading from "@/components/art-deco-heading";
import { cars } from "@/lib/data";

export default function SaleGalleryPage() {
	const ref = useRef<HTMLDivElement>(null);
	const soldRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isSoldInView = useInView(soldRef, { once: true, amount: 0.1 });

	// Filter sale cars and collect only their main images
	const saleCars = cars.filter((car) => car.category === "sale");
	const mainPhotos = saleCars.map((car) => ({
		src: car.mainImage,
		alt: car.name,
		carName: car.name,
		id: car.id,
	}));

	// Sold cars images from the sold-cars folder
	const soldCarsImages = [
		{ src: "/sold-cars/IMG_4515-min.jpeg", alt: "Prodaný vůz 1" },
		{ src: "/sold-cars/IMG_3321-min.jpeg", alt: "Prodaný vůz 2" },
		{ src: "/sold-cars/IMG_1165-min.jpeg", alt: "Prodaný vůz 3" },
		{ src: "/sold-cars/IMG_1296-min.jpeg", alt: "Prodaný vůz 4" },
		{ src: "/sold-cars/IMG_1317-min.jpg", alt: "Prodaný vůz 5" },
		{ src: "/sold-cars/IMG_3119-min.jpg", alt: "Prodaný vůz 6" },
		{ src: "/sold-cars/IMG_5234-min.jpg", alt: "Prodaný vůz 7" },
		{ src: "/sold-cars/IMG_9313-min.jpg", alt: "Prodaný vůz 8" },
		{ src: "/sold-cars/IMG_3177-min.jpg", alt: "Prodaný vůz 9" },
		{ src: "/sold-cars/IMG_1251-min.JPEG", alt: "Prodaný vůz 10" },
		{ src: "/sold-cars/IMG_7430.jpg", alt: "Prodaný vůz 11" },
		{
			src: "/sold-cars/4dc1a17f-5580-4d8a-8754-e00f7e117379.JPG",
			alt: "Prodaný vůz 12",
		},
		{
			src: "/sold-cars/f84a1fbe-0464-46d4-872d-8a495c176939.JPG",
			alt: "Prodaný vůz 13",
		},
		{
			src: "/sold-cars/b839b4dd-99a0-4c80-94cf-ba95a5a2f44f.JPG",
			alt: "Prodaný vůz 14",
		},
		{ src: "/sold-cars/IMG_6527.JPG", alt: "Prodaný vůz 15" },
		{
			src: "/sold-cars/869b0547-c57f-49e9-b960-8424f24229e8.JPG",
			alt: "Prodaný vůz 16",
		},
	];

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
						{mainPhotos.map((photo, index) => (
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

				<section ref={soldRef} className="mb-24">
					<h2 className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading">
						Všechny prodané vozy
					</h2>
					<div className="mb-8 text-center">
						<p className="font-cormorant text-xl text-brown">
							Galerie úspěšně prodaných vozů z našeho autoparku.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{soldCarsImages.map((photo, index) => (
							<motion.div
								key={`sold-${index}`}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isSoldInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{
									duration: 0.5,
									delay: index * 0.05,
								}}
								className="group"
							>
								<div className="art-deco-border overflow-hidden h-full">
									<div className="relative h-48">
										<Image
											src={photo.src}
											alt={photo.alt}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute top-2 left-2">
											<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
												Prodáno
											</span>
										</div>
										<div className="absolute inset-0 bg-brown-dark/20 group-hover:bg-brown-dark/40 transition-colors duration-300"></div>
									</div>
								</div>
							</motion.div>
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
