import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
	const featuredCars = cars.filter((car) => car.featured).slice(0, 3);

	return (
		<div>
			<HeroSection />

			<ServicesSection />

			<section className="section-padding bg-cream">
				<div className="container-vintage">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 vintage-heading mx-auto">
						VYBRANÉ VOZY
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{featuredCars.map((car) => (
							<CarCard
								key={car.id}
								car={car}
								type={
									car.category === "sale"
										? "sale"
										: car.category === "rental"
										? "rental"
										: "wedding"
								}
							/>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/prodej" className="vintage-button">
							Zobrazit všechny vozy
						</Link>
					</div>
				</div>
			</section>

			<section className="section-padding bg-cream-darker">
				<div className="container-vintage">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 vintage-heading mx-auto">
						NAŠE VOZY
					</h2>

					<div className="w-full mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							<div className="relative h-80 overflow-hidden art-deco-border">
								<Image
									src="/bmw-2002-touring-angle.jpeg"
									alt="BMW 2002 Touring"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-80 overflow-hidden art-deco-border">
								<Image
									src="/bmw-2002-touring-side.jpeg"
									alt="BMW 2002 Touring Side View"
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
							<div className="relative h-48 overflow-hidden art-deco-border">
								<Image
									src="/bmw-2002-touring-badge.jpeg"
									alt="BMW 2002 Touring Badge"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-48 overflow-hidden art-deco-border">
								<Image
									src="/bmw-2002-touring-interior.jpeg"
									alt="BMW 2002 Touring Interior"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-48 overflow-hidden art-deco-border">
								<Image
									src="/bmw-2002-touring-steering.jpeg"
									alt="BMW 2002 Touring Steering Wheel"
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<p className="text-center text-lg mb-8">
							Prohlédněte si naše vozy v detailu. Tento BMW 2002
							Touring je perfektním příkladem našich pečlivě
							udržovaných veteránů.
						</p>

						<div className="text-center">
							<Link
								href="/fotogalerie"
								className="vintage-button"
							>
								Zobrazit fotogalerii
							</Link>
						</div>
					</div>
				</div>
			</section>

			<AboutSection />
		</div>
	);
}
