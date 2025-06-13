import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, Clock } from "lucide-react";

export default function Home() {
	const featuredCars = cars.filter((car) => car.featured).slice(0, 5);

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

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
						{featuredCars.map((car, index) => (
							<div
								key={car.id}
								className="group flex flex-col h-full"
							>
								<div className="art-deco-border overflow-hidden flex flex-col h-full">
									<div className="relative h-72 overflow-hidden">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 to-transparent"></div>
										<div className="absolute inset-0 flex items-center justify-center">
											<h3 className="font-marcellus text-2xl text-white text-shadow tracking-wider text-center px-4">
												{car.name}
											</h3>
										</div>
									</div>

									<div className="p-6 bg-cream flex flex-col flex-grow">
										<p className="font-montserrat text-brown mb-6 flex-grow line-clamp-3">
											{car.description}
										</p>
										<Link
											href={`/prodej/${car.id}`}
											className="vintage-button w-full text-center"
										>
											Zobrazit detail
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/fotogalerie" className="vintage-button">
							Zobrazit všechny vozy
						</Link>
					</div>
				</div>
			</section>

			<section className="section-padding">
				<div className="container-vintage">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
						<div className="text-center p-8 art-deco-border">
							<Trophy className="w-16 h-16 mx-auto mb-4 text-nfs-cyan" />
							<h3 className="text-2xl font-bold mb-2">100+</h3>
							<p className="text-lg">Prodaných vozů</p>
						</div>
						<div className="text-center p-8 art-deco-border">
							<Clock className="w-16 h-16 mx-auto mb-4 text-nfs-cyan" />
							<h3 className="text-2xl font-bold mb-2">10+</h3>
							<p className="text-lg">Let zkušeností</p>
						</div>
						<div className="text-center p-8 art-deco-border">
							<Users className="w-16 h-16 mx-auto mb-4 text-nfs-cyan" />
							<h3 className="text-2xl font-bold mb-2">100+</h3>
							<p className="text-lg">Spokojených klientů</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
