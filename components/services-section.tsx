"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ArtDecoHeading from "./art-deco-heading";

const services = [
	{
		title: "PRODEJ",
		description:
			"Prodej a dovoz na zakázku. Nabízíme k prodeji pečlivě vybrané a prověřené veterány. V naší nabídce najdete jak vozy skladem, tak možnost dovozu na zakázku podle vašich představ.",
		image: "/mainPhotos/IMG_9435 (1).jpeg",
		link: "/prodej",
	},
	{
		title: "PRONÁJEM",
		description:
			"Půjčte si auta na focení, do filmů, na akce a eventy či jen na projížďku nebo výlet.",
		image: "/mainPhotos/IMG_0311 (1).jpeg",
		link: "/pronajem",
	},
	{
		title: "SVATBY",
		description:
			"Učiňte svůj jedinečný den opravdu jedinečným. Pronajměte si vůz na stavbu včetně výzdoby, řidiče, focení, dopravy a dalších služeb.",
		image: "/mainPhotos/IMG_9221 (1).jpeg",
		link: "/svatby",
	},
];

export default function ServicesSection() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			id="naše-služby"
			className="section-padding bg-cream-darker"
		>
			<div className="container-vintage">
				<ArtDecoHeading centered>NAŠE SLUŽBY</ArtDecoHeading>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 50 }}
							animate={
								isInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 50 }
							}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="group flex flex-col h-full"
						>
							<Link
								href={service.link}
								className="flex flex-col h-full"
							>
								<div className="art-deco-border overflow-hidden flex flex-col h-full cursor-pointer">
									<div className="relative h-72 overflow-hidden">
										<Image
											src={
												service.image ||
												"/placeholder.svg"
											}
											alt={service.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 to-transparent"></div>
										<div className="absolute inset-0 flex items-center justify-center">
											<h3 className="font-marcellus text-3xl text-white text-shadow tracking-wider">
												{service.title}
											</h3>
										</div>
									</div>

									<div className="p-6 bg-cream flex flex-col flex-grow group-hover:bg-cream-darker transition-colors duration-300">
										<p className="font-montserrat text-brown mb-6 flex-grow">
											{service.description}
										</p>
										<div className="vintage-button w-full text-center">
											Zjistit více
										</div>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
