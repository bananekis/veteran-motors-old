import Link from "next/link";
import ArtDecoLogo from "./art-deco-logo";

export default function Footer() {
	return (
		<footer className="bg-brown-dark text-white py-16">
			<div className="container-vintage">
				<div className="flex flex-col items-center mb-12">
					<ArtDecoLogo size={60} />
					<h2 className="font-marcellus text-3xl mt-4 tracking-wider">
						VETERAN MOTORS
					</h2>
					<div className="art-deco-divider w-full max-w-xs my-6">
						<span>✦</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
					<div className="text-center md:text-left">
						<h3 className="font-marcellus text-xl mb-6 tracking-wider text-gold">
							KONTAKT
						</h3>
						<address className="not-italic font-montserrat">
							<p className="mb-2">Veteran Motors s.r.o.</p>
							<p className="mb-2">Bílý Kostel nad Nisou 509</p>
							<p className="mb-2">463 31 Bílý Kostel nad Nisou</p>
							<p className="mb-2">Česká republika</p>
						</address>
					</div>

					<div className="text-center">
						<h3 className="font-marcellus text-xl mb-6 tracking-wider text-gold">
							SPOJENÍ
						</h3>
						<p className="mb-2 font-montserrat">
							<a
								href="tel:+420735705601"
								className="hover:text-gold transition-colors"
							>
								Tel: +420 735 705 601
							</a>
						</p>
						<p className="mb-2 font-montserrat">
							<a
								href="mailto:veteran.mot@gmail.com"
								className="hover:text-gold transition-colors"
							>
								Email: veteran.mot@gmail.com
							</a>
						</p>
						<div className="flex justify-center space-x-6 mt-6">
							<a
								href="#"
								className="hover:text-gold transition-colors"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
							<a
								href="https://www.instagram.com/veteran.motors?igsh=a2F6ZHlzb3BvaTgx&utm_source=qr"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gold transition-colors"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</div>
					</div>

					<div className="text-center md:text-right">
						<h3 className="font-marcellus text-xl mb-6 tracking-wider text-gold">
							NAVIGACE
						</h3>
						<ul className="space-y-2 font-montserrat">
							<li>
								<Link
									href="/"
									className="hover:text-gold transition-colors duration-300"
								>
									Domů
								</Link>
							</li>
							<li>
								<Link
									href="/prodej"
									className="hover:text-gold transition-colors duration-300"
								>
									Prodej
								</Link>
							</li>
							<li>
								<Link
									href="/pronajem"
									className="hover:text-gold transition-colors duration-300"
								>
									Pronájem
								</Link>
							</li>
							<li>
								<Link
									href="/svatby"
									className="hover:text-gold transition-colors duration-300"
								>
									Svatby
								</Link>
							</li>

							<li>
								<Link
									href="/kontakt"
									className="hover:text-gold transition-colors duration-300"
								>
									Kontakt
								</Link>
							</li>
							<li>
								<Link
									href="/fotogalerie"
									className="hover:text-gold transition-colors duration-300"
								>
									Fotogalerie
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gold/30 pt-8 text-center">
					<p className="font-montserrat text-sm">
						&copy; {new Date().getFullYear()} Veteran Motors.
						Všechna práva vyhrazena.
					</p>
				</div>
			</div>
		</footer>
	);
}
