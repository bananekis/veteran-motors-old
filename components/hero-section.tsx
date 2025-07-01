"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import VideoPlayer from "./video-player";

export default function HeroSection() {
	const [isMounted, setIsMounted] = useState(false);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isMuted, setIsMuted] = useState(true); // Start muted to comply with autoplay policies
	const [showControls, setShowControls] = useState(false);

	const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Handle component mounting
	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	// Handle mouse movement to show/hide controls
	useEffect(() => {
		const handleMouseMove = () => {
			setShowControls(true);

			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}

			controlsTimeoutRef.current = setTimeout(() => {
				setShowControls(false);
			}, 3000);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}
		};
	}, []);

	// Handle video playback controls
	const togglePlayback = () => {
		setIsPlaying((prev) => !prev);
	};

	// Handle audio mute toggle
	const toggleMute = () => {
		setIsMuted((prev) => !prev);
	};

	// Handle video load complete
	const handleVideoLoaded = (videoElement: HTMLVideoElement) => {
		setIsVideoLoaded(true);
		videoRef.current = videoElement;
	};

	return (
		<div className="relative h-screen flex items-center justify-center overflow-hidden">
			{/* Video background with overlay */}
			<div className="absolute inset-0 z-0">
				{/* Fallback image that's always visible until video loads */}
				<AnimatePresence>
					{(!isVideoLoaded || !isMounted) && (
						<motion.div
							className="absolute inset-0"
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1.5 }}
						>
							<Image
								src="/bmw-2002-touring-angle.jpeg"
								alt="BMW 2002 Touring"
								fill
								priority
								className="object-cover"
							/>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Video player that loads after component mounts */}
				{isMounted && (
					<motion.div
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: isVideoLoaded ? 1 : 0 }}
						transition={{ duration: 1.5 }}
					>
						<VideoPlayer
							src="/bmw-2002-touring-video.mp4"
							className="w-full h-full object-cover"
							autoPlay={true}
							muted={isMuted}
							loop={true}
							isPlaying={isPlaying}
							onLoaded={handleVideoLoaded}
						/>
					</motion.div>
				)}

				{/* Vintage film grain overlay */}
				<div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>

				{/* Dark overlay for text visibility */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"></div>
			</div>

			{/* Video controls */}
			<AnimatePresence>
				{showControls && (
					<motion.div
						className="absolute bottom-20 right-8 z-30 flex items-center space-x-4"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
					>
						<button
							onClick={togglePlayback}
							className="w-10 h-10 rounded-full bg-gold/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
							aria-label={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? (
								<Pause size={18} />
							) : (
								<Play size={18} />
							)}
						</button>

						<button
							onClick={toggleMute}
							className="w-10 h-10 rounded-full bg-gold/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold transition-colors duration-300"
							aria-label={isMuted ? "Unmute" : "Mute"}
						>
							{isMuted ? (
								<VolumeX size={18} />
							) : (
								<Volume2 size={18} />
							)}
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Content */}
			<div className="container-vintage relative z-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-center"
				>
					<motion.h1
						className="font-marcellus text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wider text-shadow"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
					>
						VETERAN MOTORS
					</motion.h1>

					<motion.div
						className="w-24 h-1 bg-gold mx-auto mb-8"
						initial={{ width: 0 }}
						animate={{ width: 96 }}
						transition={{ duration: 1, delay: 0.6 }}
					></motion.div>

					<motion.p
						className="font-cormorant text-2xl md:text-3xl text-white mb-12 max-w-3xl mx-auto text-shadow"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 0.8 }}
					>
						Elegance a styl minulých let na čtyřech kolech
					</motion.p>

					<div className="flex flex-col sm:flex-row justify-center gap-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1.0 }}
						>
							<button
								onClick={() => {
									const servicesSection =
										document.querySelector("#naše-služby");
									if (servicesSection) {
										servicesSection.scrollIntoView({
											behavior: "smooth",
										});
									}
								}}
								className="vintage-button border-gold text-white hover:text-gold"
							>
								Naše služby
							</button>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
