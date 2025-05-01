"use client";

import { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
	src: string;
	poster?: string;
	className?: string;
	autoPlay?: boolean;
	muted?: boolean;
	loop?: boolean;
	isPlaying?: boolean;
	onLoaded?: (videoElement: HTMLVideoElement) => void;
}

export default function VideoPlayer({
	src,
	poster,
	className = "",
	autoPlay = true,
	muted = true,
	loop = true,
	isPlaying = true,
	onLoaded,
}: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const mountedRef = useRef(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const [userInteracted, setUserInteracted] = useState(false);

	// Handle component lifecycle
	useEffect(() => {
		mountedRef.current = true;

		// Add user interaction detection
		const handleUserInteraction = () => {
			setUserInteracted(true);
			window.removeEventListener("click", handleUserInteraction);
			window.removeEventListener("touchstart", handleUserInteraction);
			window.removeEventListener("keydown", handleUserInteraction);
		};

		window.addEventListener("click", handleUserInteraction);
		window.addEventListener("touchstart", handleUserInteraction);
		window.addEventListener("keydown", handleUserInteraction);

		return () => {
			mountedRef.current = false;
			window.removeEventListener("click", handleUserInteraction);
			window.removeEventListener("touchstart", handleUserInteraction);
			window.removeEventListener("keydown", handleUserInteraction);
		};
	}, []);

	// Handle video loading and initial setup
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// Set video attributes
		video.muted = muted;
		video.playsInline = true;
		video.loop = loop;

		// Handle video loading events
		const handleLoadedData = () => {
			if (mountedRef.current) {
				console.log("Video loaded successfully");
				setIsLoaded(true);
				if (onLoaded) onLoaded(video);

				// Attempt initial play if autoPlay is true
				if (autoPlay) {
					attemptPlay();
				}
			}
		};

		// Function to attempt playing the video
		const attemptPlay = () => {
			if (!video || !mountedRef.current) return;

			video.play().catch((error) => {
				// Only log if component is still mounted
				if (mountedRef.current) {
					console.error("Video play failed:", error);

					// Add event listeners for user interaction to trigger play
					const playOnInteraction = () => {
						if (!video || !mountedRef.current) return;

						video.play().catch((e) => {
							console.error("Play failed after interaction:", e);
						});

						// Remove event listeners once play is attempted
						document.removeEventListener(
							"click",
							playOnInteraction
						);
						document.removeEventListener(
							"touchstart",
							playOnInteraction
						);
					};

					document.addEventListener("click", playOnInteraction, {
						once: true,
					});
					document.addEventListener("touchstart", playOnInteraction, {
						once: true,
					});
				}
			});
		};

		// Add event listeners
		video.addEventListener("loadeddata", handleLoadedData);
		video.addEventListener("canplay", handleLoadedData);

		// If video is already loaded, trigger the loaded handler
		if (video.readyState >= 3) {
			handleLoadedData();
		}

		// Clean up
		return () => {
			if (video) {
				video.removeEventListener("loadeddata", handleLoadedData);
				video.removeEventListener("canplay", handleLoadedData);
			}
		};
	}, [autoPlay, loop, muted, onLoaded]);

	// Handle play/pause state changes
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !isLoaded) return;

		if (isPlaying) {
			video
				.play()
				.catch((error) => console.error("Error playing video:", error));
		} else {
			video.pause();
		}
	}, [isPlaying, isLoaded]);

	// Handle mute state changes
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = muted;

		// If unmuting and user has interacted, try to play with sound
		if (!muted && userInteracted && video.paused && isPlaying) {
			video
				.play()
				.catch((error) =>
					console.error("Error playing video with sound:", error)
				);
		}
	}, [muted, userInteracted, isPlaying]);

	return (
		<video
			ref={videoRef}
			className={className}
			muted={muted}
			playsInline
			loop={loop}
			preload="auto"
			poster={poster}
		>
			<source src={src} type="video/mp4" />
			Your browser does not support video playback.
		</video>
	);
}
