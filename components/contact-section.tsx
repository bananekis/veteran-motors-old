"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ArtDecoHeading from "@/components/art-deco-heading";
import Link from "next/link";

export default function ContactSection() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section ref={ref} className="py-24 bg-cream">
			<div className="container-vintage">
				<ArtDecoHeading centered>KONTAKT</ArtDecoHeading>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mt-16">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -30 }
						}
						transition={{ duration: 0.5 }}
					>
						<div className="art-deco-border">
							<div className="p-6 bg-white">
								<h2 className="font-marcellus text-2xl mb-6">
									Kontaktní informace
								</h2>

								<div className="space-y-4 font-montserrat">
									<p>
										<strong>Adresa:</strong>
										<br />
										<Link
											href="https://www.google.com/maps/search/?api=1&query=Veteran+Motors+Praha"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-brown transition-colors"
										>
											Veteran Motors
											<br />
											Hlavní 123
											<br />
											123 45 Praha
										</Link>
									</p>

									<p>
										<strong>Telefon:</strong>
										<br />
										<Link
											href="tel:+420123456789"
											className="hover:text-brown transition-colors"
										>
											+420 123 456 789
										</Link>
									</p>

									<p>
										<strong>Email:</strong>
										<br />
										<Link
											href="mailto:info@veteranmotors.cz"
											className="hover:text-brown transition-colors"
										>
											info@veteranmotors.cz
										</Link>
									</p>

									<div className="mt-6">
										<strong className="block mb-2">
											Sledujte nás:
										</strong>
										<div className="flex space-x-4">
											<Link
												href="https://facebook.com/veteranmotors"
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-brown transition-colors"
											>
												Facebook
											</Link>
											<Link
												href="https://instagram.com/veteranmotors"
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-brown transition-colors"
											>
												Instagram
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 30 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="art-deco-border">
							<div className="p-6 bg-white">
								<h2 className="font-marcellus text-2xl mb-6">
									Otevírací doba
								</h2>

								<div className="space-y-4 font-montserrat">
									<p>
										<strong>Pondělí - Pátek:</strong> 9:00 -
										18:00
									</p>
									<p>
										<strong>Sobota:</strong> 9:00 - 14:00
									</p>
									<p>
										<strong>Neděle:</strong> Zavřeno
									</p>
								</div>
							</div>
						</div>

						<div className="art-deco-border mt-8">
							<div className="p-6 bg-white">
								<h2 className="font-marcellus text-2xl mb-6">
									Najdete nás zde
								</h2>

								<Link
									href="https://www.google.com/maps/search/?api=1&query=Veteran+Motors+Praha"
									target="_blank"
									rel="noopener noreferrer"
									className="block relative h-64 w-full overflow-hidden hover:opacity-90 transition-opacity"
								>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.1234567890123!2d14.12345678901234!3d50.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA3JzI0LjUiTiAxNMKwMDcnMjQuNSJF!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe>
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
