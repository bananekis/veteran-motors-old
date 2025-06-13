"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";

export default function AllRentalCarsPage() {
	const rentalCars = cars.filter(
		(car) => car.category === "rental" || car.category === "all"
	);

	const carsRef = useRef<HTMLDivElement>(null);
	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>PŮJČOVANÁ AUTA</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Prohlédněte si naši kompletní nabídku vozů k pronájmu.
						Každý vůz je pečlivě udržovaný a připravený pro váš
						zážitek.
					</p>
				</div>

				<section ref={carsRef} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isCarsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Dostupné vozy
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{rentalCars.map((car, index) => (
							<div key={car.id} className="h-full">
								<CarCard
									car={car}
									type="rental"
									index={index}
								/>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
