import Image from "next/image";

export default function ContactPage() {
	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-12 vintage-heading mx-auto">
					KONTAKT
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
					<div className="space-y-8">
						<div className="vintage-card">
							<h2 className="text-2xl font-semibold mb-6 vintage-heading">
								Kontaktní údaje
							</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Adresa
									</h3>
									<address className="not-italic">
										<p>Veteran Motors s.r.o.</p>
										<p>Klasická 123</p>
										<p>110 00 Praha</p>
										<p>Česká republika</p>
									</address>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Telefon
									</h3>
									<p>+420 123 456 789</p>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Email
									</h3>
									<p>info@veteranmotors.cz</p>
								</div>

								<div>
									<h3 className="text-xl font-medium mb-2 text-gold">
										Otevírací doba
									</h3>
									<p>Pondělí - Pátek: 9:00 - 17:00</p>
									<p>
										Sobota: 10:00 - 14:00 (po předchozí
										domluvě)
									</p>
									<p>Neděle: Zavřeno</p>
								</div>
							</div>
						</div>

						<div className="vintage-card">
							<h2 className="text-2xl font-semibold mb-6 vintage-heading">
								Sociální sítě
							</h2>

							<div className="flex space-x-6">
								<a
									href="#"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">Facebook</span>
									<svg
										className="h-8 w-8"
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
									href="#"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">Instagram</span>
									<svg
										className="h-8 w-8"
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
								<a
									href="#"
									className="text-brown hover:text-gold transition-colors duration-300"
								>
									<span className="sr-only">YouTube</span>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>

					<div className="vintage-card">
						<h2 className="text-2xl font-semibold mb-6 vintage-heading">
							Napište nám
						</h2>

						<form className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block mb-2 font-medium"
									>
										Jméno a příjmení
									</label>
									<input
										type="text"
										id="name"
										className="vintage-input w-full"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block mb-2 font-medium"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										className="vintage-input w-full"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="phone"
										className="block mb-2 font-medium"
									>
										Telefon
									</label>
									<input
										type="tel"
										id="phone"
										className="vintage-input w-full"
									/>
								</div>

								<div className="relative">
									<label
										htmlFor="inquiry-type"
										className="block mb-2 font-medium"
									>
										Typ dotazu
									</label>
									<div className="relative">
										<select
											id="inquiry-type"
											className="vintage-input w-full appearance-none pr-10"
											required
										>
											<option value="">
												Vyberte typ dotazu
											</option>
											<option value="prodej">
												Prodej vozů
											</option>
											<option value="pronajem">
												Pronájem vozů
											</option>
											<option value="svatby">
												Svatební služby
											</option>
											<option value="servis">
												Servis a opravy
											</option>
											<option value="jine">Jiné</option>
										</select>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold">
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block mb-2 font-medium"
								>
									Předmět
								</label>
								<input
									type="text"
									id="subject"
									className="vintage-input w-full"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block mb-2 font-medium"
								>
									Zpráva
								</label>
								<textarea
									id="message"
									rows={6}
									className="vintage-input w-full"
									required
								></textarea>
							</div>

							<div className="text-center md:text-left">
								<button
									type="submit"
									className="vintage-button"
								>
									Odeslat zprávu
								</button>
							</div>
						</form>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-8 text-center vintage-heading mx-auto">
						Kde nás najdete
					</h2>

					<div className="vintage-card p-0 h-96 relative overflow-hidden">
						<Image
							src="/vintage-prague-map-pin.png"
							alt="Mapa - Veteran Motors"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
