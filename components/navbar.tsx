"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ArtDecoLogo from "./art-deco-logo";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	const getHeaderStyles = () => {
		if (isHomePage) {
			return scrolled ? "bg-white py-2 shadow-md" : "bg-transparent py-4";
		} else {
			return scrolled ? "bg-white py-2 shadow-md" : "bg-black py-4";
		}
	};

	const getTextColor = () => {
		if (isHomePage) {
			return scrolled ? "text-black" : "text-white";
		} else {
			return scrolled ? "text-black" : "text-white";
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}
		>
			<div className="container-vintage">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<ArtDecoLogo size={scrolled ? 40 : 50} />
						<span
							className={`font-marcellus text-2xl md:text-3xl tracking-wider transition-all duration-300 ${getTextColor()}`}
						>
							VETERAN MOTORS
						</span>
					</Link>

					{/* Mobile menu button */}
					<button
						className="lg:hidden p-2 z-50 relative"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					>
						{isMenuOpen ? (
							<X size={24} className="text-white" />
						) : (
							<Menu size={24} className={getTextColor()} />
						)}
					</button>

					{/* Desktop navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{["prodej", "pronajem", "svatby", "kontakt"].map(
							(item, index) => (
								<Link
									key={item}
									href={`/${item}`}
									className={`relative group font-marcellus text-lg uppercase tracking-wider transition-all duration-300 ${getTextColor()}`}
								>
									<span className="relative z-10 hover:text-gold transition-colors duration-300">
										{item === "prodej"
											? "Prodej"
											: item === "pronajem"
											? "Pronájem"
											: item === "svatby"
											? "Svatby"
											: "Kontakt"}
									</span>
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
								</Link>
							)
						)}
					</nav>
				</div>

				{/* Mobile navigation */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 top-0 left-0 w-full h-full z-40 lg:hidden"
						>
							{/* Backdrop overlay */}
							<motion.div
								className="absolute inset-0 bg-black/95 backdrop-blur-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setIsMenuOpen(false)}
							/>

							{/* Menu content */}
							<motion.nav
								initial={{ x: "-100%" }}
								animate={{ x: 0 }}
								exit={{ x: "-100%" }}
								transition={{ type: "tween", duration: 0.3 }}
								className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-black border-r border-gold/30 overflow-y-auto"
							>
								<div className="p-6 pt-20">
									<div className="art-deco-divider mb-8">
										<span>✦</span>
									</div>

									<div className="flex flex-col space-y-6 py-4">
										{[
											"prodej",
											"pronajem",
											"svatby",
											"kontakt",
										].map((item, index) => (
											<motion.div
												key={item}
												initial={{ x: -20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{
													delay: index * 0.1,
												}}
											>
												<Link
													href={`/${item}`}
													className="block py-2 font-marcellus text-2xl uppercase tracking-wider text-white hover:text-gold transition-colors duration-300"
													onClick={() =>
														setIsMenuOpen(false)
													}
												>
													{item === "prodej"
														? "Prodej"
														: item === "pronajem"
														? "Pronájem"
														: item === "svatby"
														? "Svatby"
														: "Kontakt"}
												</Link>
												<div className="w-16 h-0.5 bg-gold/30 mt-2"></div>
											</motion.div>
										))}
									</div>

									<div className="mt-12 text-center">
										<ArtDecoLogo size={60} />
										<p className="text-white/70 mt-6 font-montserrat text-sm">
											Elegance a styl minulých dob na
											čtyřech kolech
										</p>
									</div>
								</div>
							</motion.nav>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}
