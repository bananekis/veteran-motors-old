"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArtDecoHeading from "@/components/art-deco-heading";
import PhotoGallery from "@/components/photo-gallery";
import { cars } from "@/lib/data";

interface CarDetailPageProps {
	params: {
		id: string;
	};
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	const car = cars.find((c) => c.id === params.id);

	if (!car) {
		return (
			<div className="pt-32 pb-16">
				<div className="container-vintage">
					<ArtDecoHeading>Vůz nenalezen</ArtDecoHeading>
					<div className="text-center mt-8">
						<Link
							href="/fotogalerie/prodej"
							className="vintage-button"
						>
							Zpět na galerii
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const galleryImages = [
		{
			src: car.mainImage,
			alt: car.name,
		},
		{
			src: "/bmw-2002-touring-side.jpeg",
			alt: `${car.name} Side View`,
		},
		{
			src: "/bmw-2002-touring-badge.jpeg",
			alt: `${car.name} Badge`,
		},
		{
			src: "/bmw-2002-touring-interior.jpeg",
			alt: `${car.name} Interior`,
		},
		{
			src: "/bmw-2002-touring-steering.jpeg",
			alt: `${car.name} Steering Wheel`,
		},
	];

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading>{car.name}</ArtDecoHeading>

				<section ref={ref} className="mb-24">
					<PhotoGallery photos={galleryImages} className="mb-12" />

					<div className="text-center mt-12">
						<Link
							href="/fotogalerie/prodej"
							className="vintage-button"
						>
							Zpět na galerii
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
