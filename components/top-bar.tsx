"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
				<div className="container-vintage">
					<div className="flex items-center justify-between py-4">
						<Link href="/" className="text-2xl font-marcellus">
							VETERAN MOTORS
						</Link>

						<nav className="hidden md:block">
							<ul className="flex space-x-8">
								<li>
									<Link
										href="/prodej"
										className={`hover:text-brown transition-colors ${
											pathname === "/prodej" ? "text-brown" : ""
										}`}
									>
										Prodej
									</Link>
								</li>
								<li>
									<Link
										href="/pronajem"
										className={`hover:text-brown transition-colors ${
											pathname === "/pronajem" ? "text-brown" : ""
										}`}
									>
										Pronájem
									</Link>
								</li>
								<li>
									<Link
										href="/svatby"
										className={`hover:text-brown transition-colors ${
											pathname === "/svatby" ? "text-brown" : ""
										}`}
									>
										Svatby
									</Link>
								</li>
								<li>
									<Link
										href="/kontakt"
										className={`hover:text-brown transition-colors ${
											pathname === "/kontakt" ? "text-brown" : ""
										}`}
									>
										Kontakt
									</Link>
								</li>
							</ul>
						</nav>

						<button
							className="md:hidden"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							<div className="w-6 h-5 relative">
								<span
									className={`absolute w-full h-0.5 bg-current transition-all duration-300 ${
										isOpen ? "top-2 rotate-45" : "top-0"
									}`}
								></span>
								<span
									className={`absolute w-full h-0.5 bg-current top-2 transition-all duration-300 ${
										isOpen ? "opacity-0" : "opacity-100"
									}`}
								></span>
								<span
									className={`absolute w-full h-0.5 bg-current transition-all duration-300 ${
										isOpen ? "top-2 -rotate-45" : "top-4"
									}`}
								></span>
							</div>
						</button>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className="fixed top-[72px] left-0 right-0 bg-white shadow-md z-40 md:hidden"
					>
						<nav className="container-vintage py-4">
							<ul className="space-y-4">
								<li>
									<Link
										href="/prodej"
										className={`block hover:text-brown transition-colors ${
											pathname === "/prodej" ? "text-brown" : ""
										}`}
										onClick={() => setIsOpen(false)}
									>
										Prodej
									</Link>
								</li>
								<li>
									<Link
										href="/pronajem"
										className={`block hover:text-brown transition-colors ${
											pathname === "/pronajem" ? "text-brown" : ""
										}`}
										onClick={() => setIsOpen(false)}
									>
										Pronájem
									</Link>
								</li>
								<li>
									<Link
										href="/svatby"
										className={`block hover:text-brown transition-colors ${
											pathname === "/svatby" ? "text-brown" : ""
										}`}
										onClick={() => setIsOpen(false)}
									>
										Svatby
									</Link>
								</li>
								<li>
									<Link
										href="/kontakt"
										className={`block hover:text-brown transition-colors ${
											pathname === "/kontakt" ? "text-brown" : ""
										}`}
										onClick={() => setIsOpen(false)}
									>
										Kontakt
									</Link>
								</li>
							</ul>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
