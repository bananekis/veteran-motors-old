"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cars } from "@/lib/data";
import CarCard from "@/components/car-card";
import ArtDecoHeading from "@/components/art-deco-heading";
import WeddingForm from "@/components/wedding-form";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function WeddingsPage() {
	const weddingCars = cars.filter(
		(car) =>
			car.categories.includes("wedding") || car.categories.includes("all")
	);

	const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
	const [isWeddingCarsExpanded, setIsWeddingCarsExpanded] = useState(false);
	const [selectedImage, setSelectedImage] = useState<{
		src: string;
		alt: string;
	} | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Wedding cars images array (moved outside for navigation)
	const weddingCarsImages = [
		{
			src: "/wedding-cars/IMG_9221-min.jpg",
			alt: "Svatební vůz 1",
		},
		{
			src: "/wedding-cars/IMG_9206-min.jpg",
			alt: "Svatební vůz 2",
		},
		{
			src: "/wedding-cars/IMG_1327.JPG",
			alt: "Svatební vůz 3",
		},
		{
			src: "/wedding-cars/IMG_1325.WEBP",
			alt: "Svatební vůz 4",
		},
		{
			src: "/wedding-cars/IMG_1328.JPG",
			alt: "Svatební vůz 5",
		},
		{
			src: "/wedding-cars/IMG_1323.JPG",
			alt: "Svatební vůz 6",
		},
		{
			src: "/wedding-cars/IMG_1326.JPG",
			alt: "Svatební vůz 7",
		},
		{
			src: "/wedding-cars/IMG_1330.JPG",
			alt: "Svatební vůz 8",
		},
		{
			src: "/wedding-cars/IMG_1324.JPG",
			alt: "Svatební vůz 9",
		},
		{
			src: "/wedding-cars/IMG_1501.JPG",
			alt: "Svatební vůz 10",
		},
	];

	const openImageModal = (photo: { src: string; alt: string }) => {
		const index = weddingCarsImages.findIndex(
			(img) => img.src === photo.src
		);
		setCurrentImageIndex(index);
		setSelectedImage(photo);
	};

	const navigateImage = (direction: "prev" | "next") => {
		const newIndex =
			direction === "next"
				? (currentImageIndex + 1) % weddingCarsImages.length
				: (currentImageIndex - 1 + weddingCarsImages.length) %
				  weddingCarsImages.length;
		setCurrentImageIndex(newIndex);
		setSelectedImage(weddingCarsImages[newIndex]);
	};

	const servicesRef = useRef<HTMLDivElement>(null);
	const carsRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const isServicesInView = useInView(servicesRef, {
		once: true,
		amount: 0.1,
	});
	const isCarsInView = useInView(carsRef, { once: true, amount: 0.1 });
	const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });
	const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 });
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<ArtDecoHeading centered>SVATBY</ArtDecoHeading>

				<div className="mb-16 text-center">
					<p className="font-cormorant text-2xl text-brown">
						Učiňte svůj jedinečný den opravdu jedinečným. Pronajměte
						si vůz na stavbu včetně výzdoby, řidiče, focení, dopravy
						a dalších služeb.
					</p>
				</div>

				<section ref={ref} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Vozy pro svatby
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(isWeddingCarsExpanded
							? weddingCars
							: weddingCars.slice(0, 4)
						).map((car, index) => (
							<div key={car.id} className="h-full">
								<CarCard
									car={car}
									type="wedding"
									index={index}
								/>
							</div>
						))}
					</div>

					{weddingCars.length > 4 && (
						<div className="text-right mt-12">
							<button
								onClick={() =>
									setIsWeddingCarsExpanded(
										!isWeddingCarsExpanded
									)
								}
								className="vintage-button"
							>
								{isWeddingCarsExpanded
									? "Sbalit"
									: "Rozbalit vše"}
							</button>
						</div>
					)}
				</section>

				<section ref={servicesRef} className="mb-24">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={
							isServicesInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="font-marcellus text-2xl md:text-3xl mb-12 vintage-heading"
					>
						Co všechno umíme zařídit
					</motion.h2>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={
							isServicesInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 30 }
						}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="art-deco-border"
					>
						<div className="p-8 bg-cream">
							<div className="space-y-8 font-montserrat">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-4">
										<h4 className="font-marcellus text-lg text-brown">
											Základní služby:
										</h4>
										<ul className="space-y-2 text-brown">
											<li>
												• Pronájem vozu na celou či
												jenom část svatby
											</li>
											<li>
												• Projížďka vozem (spolujízda
												nebo řízení pod dohledem)
											</li>
											<li>
												• Vyzvednutí novomanželů z
												domluveného místa
											</li>
											<li>
												• Dovoz vozu na určené místo
											</li>
										</ul>
									</div>
									<div className="space-y-4">
										<h4 className="font-marcellus text-lg text-brown">
											Doplňkové služby:
										</h4>
										<ul className="space-y-2 text-brown">
											<li>
												• Výzdoba vozu na přání
												zákazníka
											</li>
											<li>• Focení ve voze a další</li>
											<li>• Řidič s uniformou</li>
											<li>• Fotoportrét s vozem</li>
										</ul>
									</div>
								</div>

								<div className="border-t border-gold/30 my-6"></div>

								<div className="space-y-3">
									<h4 className="font-marcellus text-lg text-brown">
										Další možnosti:
									</h4>
									<p className="text-brown">
										Přihlašování na Bílé i Veteránské SPZ,
										opravy, garážování, poptání náhradních
										dílů, kompletní servis a údržba vozů.
									</p>
									<p className="text-brown">
										Všechny naše vozy jsou pojištěné a po
										celou dobu pronájmu jsme vám k dispozici
										na telefonu.
									</p>
								</div>

								<div className="border-t border-gold/30 my-6"></div>

								<div className="space-y-4">
									<h4 className="font-marcellus text-xl text-brown mb-4">
										Orientační ceník
									</h4>
									<div className="space-y-3">
										<div className="flex justify-between items-center py-2 border-b border-gold/20">
											<span className="text-brown">
												Pronájem vozu
											</span>
											<span className="font-semibold text-brown">
												1.999,-/den
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gold/20">
											<span className="text-brown">
												Výzdoba na přání zákazníka
											</span>
											<span className="font-semibold text-brown">
												1.999,-
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gold/20">
											<span className="text-brown">
												Přistavení vozu
											</span>
											<span className="font-semibold text-brown">
												15,-/km
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gold/20">
											<span className="text-brown">
												Osobní řidič
											</span>
											<span className="font-semibold text-brown">
												1.999,-/den
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gold/20">
											<span className="text-brown">
												Focení
											</span>
											<span className="font-semibold text-brown">
												999,-
											</span>
										</div>
										<div className="flex justify-between items-center py-2">
											<span className="text-brown">
												Další
											</span>
											<span className="font-semibold text-brown">
												po domluvě
											</span>
										</div>
									</div>
								</div>

								<p className="mt-6 text-sm italic text-brown">
									* Ceny jsou orientační a mohou se lišit
									podle konkrétní objednávky. Pro přesnou
									kalkulaci a podmínky pronájmu nás
									kontaktujte.
								</p>
							</div>
						</div>
					</motion.div>
				</section>

				<WeddingForm
					title="Rezervace vozu na svatbu"
					description="Vyplňte formulář pro rezervaci vozu a my se vám ozveme s potvrzením objednávky."
				/>

				<section
					ref={infoRef}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
				>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={
							isInfoInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -30 }
						}
						transition={{ duration: 0.5 }}
						className="md:col-span-1"
					>
						<h2 className="font-marcellus text-2xl mb-6 vintage-heading">
							Jak to funguje
						</h2>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={
							isInfoInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 30 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="md:col-span-2"
					>
						<div className="art-deco-border">
							<div className="p-6 bg-cream">
								<div className="space-y-4 font-montserrat">
									<ul className="list-disc pl-6 space-y-4">
										<li>
											Po rezervaci se Vám ozveme a
											společně doladíme podmínky pronájmu.
											Pokud chcete, můžete se na auto
											předem přijet osobně podívat.
										</li>
										<li>
											Vůz vám můžeme přistavit na předem
											domluvené místo, vyzvednout
											novomanžele či přichystat dle
											požadavků výše.
										</li>
										<li>
											Při předání podepíšeme předávací
											protokol a nájemní dohodu + Vás
											seznámíme s užíváním a ovládáním
											vozu – není to nic složitého.
										</li>
										<li>
											Zároveň složíte vratnou zálohu a
											předáme Vám klíčky od vozu. Rádi se
											mezitím postaráme i o Vaše vlastní
											auto.
										</li>
										<li>
											Po skončení pronájmu si auto buď
											vyzvedneme, nebo si ho předáme na
											domluveném místě. Vše vyúčtujeme a
											případně vrátíme zbývající část
											zálohy.
										</li>
									</ul>

									<div className="border-t border-gold/30 my-6"></div>

									<div className="space-y-3">
										<p>
											Všechny naše vozy jsou pojištěné,
											ale doporučujeme s nimi zacházet s
											citem.
										</p>
										<p>
											Po celou dobu pronájmu jsme vám k
											dispozici na telefonu.
										</p>
										<p>
											V případě poruchy, nehody nebo
											jiných problémů vám okamžitě
											pomůžeme vše vyřešit.
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<section ref={galleryRef} className="mb-24">
					<div className="flex items-center justify-between mb-12">
						<h2 className="font-marcellus text-2xl md:text-3xl vintage-heading">
							Svatební galerie
						</h2>
						<Link
							href="/fotogalerie/svatby"
							className="group flex items-center text-brown hover:text-gold transition-colors duration-300"
						>
							<span className="font-montserrat text-sm mr-2">
								Zobrazit všechny
							</span>
							<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="mb-8 text-center">
						<p className="font-cormorant text-xl text-brown">
							Inspirujte se snímky z našich svatebních akcí.
						</p>
					</div>

					{(() => {
						const featuredPhotos = weddingCarsImages.slice(0, 3);
						const expandedPhotos = weddingCarsImages.slice(0, 10);

						return (
							<>
								{!isGalleryExpanded ? (
									// Initial view - 3 featured photos
									<div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
										{featuredPhotos.map((photo, index) => (
											<motion.div
												key={`wedding-featured-${index}`}
												initial={{ opacity: 0, y: 20 }}
												animate={
													isGalleryInView
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 20 }
												}
												transition={{
													duration: 0.5,
													delay: index * 0.2,
												}}
												className="group relative overflow-hidden block cursor-pointer"
												onClick={() =>
													openImageModal(photo)
												}
											>
												<div className="art-deco-border overflow-hidden">
													<div className="relative h-72 overflow-hidden">
														<Image
															src={photo.src}
															alt={photo.alt}
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-105"
														/>
														<div className="absolute top-2 left-2">
															<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
																Svatby
															</span>
														</div>
														<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-4">
															<h3 className="text-cream font-marcellus text-lg">
																{photo.alt}
															</h3>
														</div>
														<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
															<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
																<p className="text-sm font-montserrat">
																	Klikněte pro
																	zvětšení
																</p>
															</div>
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								) : (
									// Expanded view - more photos without gaps
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 max-w-7xl mx-auto">
										{expandedPhotos.map((photo, index) => (
											<motion.div
												key={`wedding-expanded-${index}`}
												initial={{ opacity: 0, y: 20 }}
												animate={
													isGalleryInView
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 20 }
												}
												transition={{
													duration: 0.5,
													delay: index * 0.05,
												}}
												className="group relative overflow-hidden block cursor-pointer"
												onClick={() =>
													openImageModal(photo)
												}
											>
												<div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
													<Image
														src={photo.src}
														alt={photo.alt}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105"
													/>
													<div className="absolute top-2 left-2">
														<span className="bg-brown-dark/80 text-cream px-2 py-1 text-xs font-montserrat rounded">
															Svatby
														</span>
													</div>
													<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/70 to-transparent p-2">
														<h3 className="text-cream font-marcellus text-xs md:text-sm">
															{photo.alt}
														</h3>
													</div>
													<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
														<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
															<p className="text-xs font-montserrat">
																Klikněte pro
																zvětšení
															</p>
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								)}

								<div className="text-center mt-12">
									<button
										onClick={() =>
											setIsGalleryExpanded(
												!isGalleryExpanded
											)
										}
										className="vintage-button"
									>
										{isGalleryExpanded
											? "Sbalit"
											: "Rozbalit"}
									</button>
								</div>
							</>
						);
					})()}
				</section>

				{/* Fullscreen Image Modal */}
				{selectedImage && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
						<div className="relative w-full h-full flex items-center justify-center p-4">
							{/* Close Button */}
							<button
								onClick={() => setSelectedImage(null)}
								className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<X className="w-6 h-6" />
							</button>

							{/* Previous Button */}
							<button
								onClick={() => navigateImage("prev")}
								className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<ChevronLeft className="w-8 h-8" />
							</button>

							{/* Next Button */}
							<button
								onClick={() => navigateImage("next")}
								className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-300"
							>
								<ChevronRight className="w-8 h-8" />
							</button>

							{/* Image */}
							<div className="relative max-w-7xl max-h-full w-full h-full">
								<Image
									src={selectedImage.src}
									alt={selectedImage.alt}
									fill
									className="object-contain"
									priority
								/>
							</div>

							{/* Image Counter and Title */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg">
								<div className="text-center">
									<p className="text-white/70 text-sm font-montserrat mb-1">
										{currentImageIndex + 1} /{" "}
										{weddingCarsImages.length}
									</p>
									<h3 className="text-white font-marcellus text-lg">
										{selectedImage.alt}
									</h3>
								</div>
							</div>

							{/* Click outside to close */}
							<div
								className="absolute inset-0 -z-10"
								onClick={() => setSelectedImage(null)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
