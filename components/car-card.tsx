"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Car } from "@/lib/types";

interface CarCardProps {
	car: Car;
	type: "sale" | "rental" | "wedding";
	index?: number;
}

export default function CarCard({ car, type, index = 0 }: CarCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(cardRef, { once: true, amount: 0.3 });

	const href =
		type === "sale"
			? `/prodej/${car.id}`
			: type === "rental"
			? `/pronajem/${car.id}`
			: `/svatby/${car.id}`;

	const CardContent = (
		<div className="art-deco-border overflow-hidden h-full flex flex-col">
			<div className="relative overflow-hidden h-64">
				<Image
					src={car.mainImage || "/placeholder.svg"}
					alt={car.name}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<div className="vintage-button w-full flex justify-center bg-gold hover:bg-gold/90 text-brown-dark font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-gold hover:border-cream">
						{type === "sale" ? "Zobrazit detail" : "Detail není dostupný"}
					</div>
				</div>
			</div>

			<div className="p-6 bg-cream-darker flex-1 flex flex-col min-h-[120px]">
				<h3 className="font-marcellus text-xl mb-2 text-brown-dark line-clamp-2 h-[56px]">
					{car.name}
				</h3>
				<div className="flex justify-between items-center mt-auto">
					<p className="font-montserrat text-sm text-brown">
						Rok: {car.year}
					</p>
					{type === "sale" && (
						<p className="font-marcellus text-lg text-gold">
							{car.price.toLocaleString()} Kč
						</p>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{type === "sale" ? (
				<Link href={href} className="block h-full">
					{CardContent}
				</Link>
			) : (
				<div className="block h-full cursor-default">
					{CardContent}
				</div>
			)}
		</motion.div>
	);
}
