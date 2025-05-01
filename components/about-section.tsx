"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import ArtDecoHeading from "./art-deco-heading"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="section-padding">
      <div className="container-vintage">
        <ArtDecoHeading centered>O NÁS</ArtDecoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="art-deco-border"
          >
            <div className="relative h-[500px] overflow-hidden">
              <Image src="/1930s-car-workshop.png" alt="Veteran Motors - O nás" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 font-montserrat text-brown">
              <p>
                Začalo to již od mala, láskou k autům a plakátama na stěnách. Ve svých 18 prvním VW broukem z roku 1965
                u Nás v garáži, který jsme si s otcem chtěli opravit, ale během týdne si pro něj přijel kupec, tak jsme
                si pořídili druhého a pohádka se opakovala.
              </p>
              <p>
                Hodiny strávené za volantem, ježdění po Evropě s vlekem, odřená kolena od hledání koroze v podbězích a
                olej za nehtama, to je pohádka několika posledních let. Jen teď za sebou máme místo obyčejných 4válců
                několika litrové V8čky, V6 a někdy i V12. Garáž jsme vyměnili za autodílnu a pod střechu uklidily
                mistrovská díla těch nejznámějších automobilek světa.
              </p>
              <p>
                Baví nás sledovat nadšení každého z vás, komu splníme dětský sen a to ať už autem v předrenovačním stavu
                se kterým si budete moct v dílně po večerech hrát, leštěnkou, na kterou vaše paní bude žárlit anebo
                třeba kouskem na projížďky, který má nějaký ten kosmetický nedostatek.
              </p>
              <p>
                Sami jsme byli ve Vašich botách a proto máme pochopení a vždy se nějak domluvíme. Je to už několik let,
                během kterých jsme zjistili na co si dát pozor, desítky aut dovezených na zakázku, pronajatých do klipů,
                filmů nebo na svatby, množství aut opravených, dohromady přes sto aut pordaných. Budeme se těšit na
                spolupráci i s Vámi.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
