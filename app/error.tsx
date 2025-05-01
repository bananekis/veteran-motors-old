"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
			<div className="container-vintage text-center">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl md:text-6xl font-marcellus text-brown-dark mb-4">
						Něco se pokazilo
					</h1>
					<div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-12"
				>
					<p className="text-lg font-montserrat text-brown max-w-2xl mx-auto">
						Omlouváme se, ale vyskytl se problém při zpracování
						vašeho požadavku. Naši mechanici už na tom pracují.
					</p>
					{process.env.NODE_ENV === "development" && (
						<div className="mt-4 p-4 bg-cream border border-gold/30 rounded-md mx-auto max-w-2xl overflow-auto text-left">
							<p className="font-mono text-sm text-brown-dark">
								{error.message}
							</p>
						</div>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<button onClick={() => reset()} className="vintage-button">
						<RefreshCw className="mr-2 h-5 w-5" />
						Zkusit znovu
					</button>
					<Link href="/" className="vintage-button">
						<Home className="mr-2 h-5 w-5" />
						Zpět na domovskou stránku
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
