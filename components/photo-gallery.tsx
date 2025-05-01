"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Photo {
	src: string;
	alt: string;
}

interface PhotoGalleryProps {
	photos: Photo[];
	className?: string;
}

export default function PhotoGallery({
	photos,
	className = "",
}: PhotoGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			prevIndex === 0 ? photos.length - 1 : prevIndex - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === photos.length - 1 ? 0 : prevIndex + 1
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
		<div className={`${className}`}>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{photos.map((photo, index) => (
					<div
						key={index}
						className="relative aspect-square vintage-card overflow-hidden cursor-pointer group p-0"
						onClick={() => openModal(index)}
					>
						<Image
							src={photo.src || "/placeholder.svg"}
							alt={photo.alt}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
				))}
			</div>

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
							src={photos[currentIndex].src || "/placeholder.svg"}
							alt={photos[currentIndex].alt}
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
						{currentIndex + 1} / {photos.length}
					</div>
				</div>
			)}
		</div>
	);
}
