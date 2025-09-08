"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import CarCard from "./car-card";
import ArtDecoHeading from "./art-deco-heading";
import type { Car } from "@/lib/types";

interface FeaturedCarsProps {
	cars: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section ref={ref} className="section-padding bg-cream-darker">
			<div className="container-vintage">
				<ArtDecoHeading centered>VYBRANÉ VOZY</ArtDecoHeading>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{cars.map((car, index) => (
						<CarCard
							key={car.id}
							car={car}
							type={
								car.categories.includes("sale")
									? "sale"
									: car.categories.includes("rental")
									? "rental"
									: "wedding"
							}
							index={index}
						/>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="text-center mt-12"
				>
					<Link href="/prodej" className="vintage-button">
						Zobrazit všechny vozy
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
