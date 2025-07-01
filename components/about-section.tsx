"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ArtDecoHeading from "./art-deco-heading";

export default function AboutSection() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section ref={ref} className="section-padding">
			<div className="container-vintage">
				<ArtDecoHeading centered>O NÁS</ArtDecoHeading>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -50 }
						}
						transition={{ duration: 0.6 }}
						className="art-deco-border"
					>
						<div className="relative h-[500px] overflow-hidden">
							<Image
								src="/1930s-car-workshop.png"
								alt="Veteran Motors - O nás"
								fill
								className="object-cover"
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 50 }
						}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="space-y-6 font-montserrat text-brown">
							<p>
								Všechno to začalo už v dětství – láskou k autům
								a plakáty na stěnách. V osmnácti se u nás v
								garáži objevil první VW Brouk z roku 1965, který
								jsme si s tátou chtěli dát do pořádku. Jenže než
								jsme se pořádně pustili do práce, ozval se
								kupec… A tak jsme si pořídili druhého. A příběh
								se začal opakovat.
							</p>
							<p>
								Roky za volantem, cesty po Evropě s vlekem,
								odřená kolena při hledání koroze v podbězích a
								olej za nehty – to je náš svět posledních let.
								Dnes už místo obyčejných čtyřválců stojí v dílně
								V8, V6 i V12. Garáž jsme vyměnili za
								profesionální autodílnu a pod její střechou
								odpočívají mistrovské kusy těch nejslavnějších
								automobilových značek.
							</p>
							<p>
								Největší radost máme, když pomůžeme splnit
								někomu dětský sen – ať už jde o auto v
								předrenovačním stavu, na kterém si budete po
								večerech hrát, naleštěného veterána, na kterého
								bude žárlit vaše partnerka, nebo vůz na
								projížďky s drobnými nedostatky, ale velkým
								kouzlem.
							</p>
							<p>
								Sami jsme si tím vším prošli. Víme, jaké to je
								být na druhé straně. A možná právě proto si
								vždycky najdeme společnou řeč. Za ta léta jsme
								přivezli desítky aut na zakázku, půjčili je do
								klipů, filmů i na svatby, opravili celou řadu
								veteránů a prodali přes sto vozů. Příběh zdaleka
								nekončí. Třeba ten další napíšeme společně s
								Vámi.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
