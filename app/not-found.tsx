"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
			<div className="container-vintage text-center">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-6xl md:text-8xl font-marcellus text-brown-dark mb-4">
						404
					</h1>
					<div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-marcellus text-brown-dark mb-4">
						Stránka nenalezena
					</h2>
					<p className="text-lg font-montserrat text-brown max-w-2xl mx-auto">
						Zdá se, že jste sjeli z cesty. Tato stránka neexistuje
						nebo byla přesunuta na jinou adresu.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<Link href="/" className="vintage-button">
						<Home className="mr-2 h-5 w-5" />
						Zpět na domovskou stránku
					</Link>
					<button
						onClick={() => window.history.back()}
						className="vintage-button"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Zpět na předchozí stránku
					</button>
				</motion.div>
			</div>
		</div>
	);
}
