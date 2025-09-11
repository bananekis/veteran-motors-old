"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImagePreviewProps {
	mainImage: string;
	images: string[];
	carName: string;
}

export default function ImagePreview({
	mainImage,
	images,
	carName,
}: ImagePreviewProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Combine main image with additional images
	const allImages = [mainImage, ...images];

	const openModal = (index: number) => {
		setCurrentIndex(index);
		setIsModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.style.overflow = "auto";
	};

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			goToPrevious();
		} else if (e.key === "ArrowRight") {
			goToNext();
		} else if (e.key === "Escape") {
			closeModal();
		}
	};

	return (
		<>
			{/* Main Image */}
			<div className="art-deco-border">
				<div
					className="relative h-96 overflow-hidden cursor-pointer group"
					onClick={() => openModal(0)}
				>
					<Image
						src={mainImage || "/placeholder.svg"}
						alt={carName}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-montserrat">
							Klikněte pro zvětšení
						</div>
					</div>
				</div>
			</div>

			{/* Thumbnail Images */}
			<div className="grid grid-cols-4 gap-2 mt-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="art-deco-border cursor-pointer group"
						onClick={() => openModal(index + 1)}
					>
						<div className="relative h-24 overflow-hidden">
							<Image
								src={image || "/placeholder.svg"}
								alt={`${carName} - detail ${index + 1}`}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
					onClick={closeModal}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					<button
						className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10"
						onClick={closeModal}
						aria-label="Close"
					>
						<X size={32} />
					</button>

					<button
						className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-10"
						onClick={(e) => {
							e.stopPropagation();
							goToPrevious();
						}}
						aria-label="Previous image"
					>
						<ChevronLeft size={48} />
					</button>

					<div
						className="relative h-[80vh] w-[90vw] md:w-[80vw]"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={allImages[currentIndex] || "/placeholder.svg"}
							alt={
								currentIndex === 0
									? carName
									: `${carName} - detail ${currentIndex}`
							}
							fill
							className="object-contain"
							priority
						/>
					</div>

					<button
						className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-10"
						onClick={(e) => {
							e.stopPropagation();
							goToNext();
						}}
						aria-label="Next image"
					>
						<ChevronRight size={48} />
					</button>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
						{currentIndex + 1} / {allImages.length}
					</div>
				</div>
			)}
		</>
	);
}
