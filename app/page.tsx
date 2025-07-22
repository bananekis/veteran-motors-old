import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, Clock, Car, Heart } from "lucide-react";

export default function Home() {
	const featuredCars = cars.filter((car) => car.featured).slice(0, 3);

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
								<div className="art-deco-border overflow-hidden">
									<div className="relative h-72 overflow-hidden">
										<Image
											src={car.mainImage}
											alt={car.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/fotogalerie" className="vintage-button">
							Rozbalit
						</Link>
					</div>
				</div>
			</section>

			<section className="section-padding">
				<div className="container-vintage">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
						<div className="text-center p-3 art-deco-border">
							<Trophy className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								100+
							</h3>
							<p className="text-xs md:text-sm">Prodaných vozů</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Car className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								50+
							</h3>
							<p className="text-xs md:text-sm">
								Pronajatých vozů
							</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Heart className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								50+
							</h3>
							<p className="text-xs md:text-sm">Svateb</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Clock className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								10+
							</h3>
							<p className="text-xs md:text-sm">Let zkušeností</p>
						</div>
						<div className="text-center p-3 art-deco-border">
							<Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-nfs-cyan" />
							<h3 className="text-lg md:text-xl font-bold mb-1">
								100+
							</h3>
							<p className="text-xs md:text-sm">
								Spokojených klientů
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
