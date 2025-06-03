"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Wrench, Trophy, Users, Star } from "lucide-react"
import SectionHeader from "./section-header"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden">
      {/* Subtle background effects */}

      <div className="container-vintage relative z-10">
        <SectionHeader
          title="O NÁS"
          isInView={isInView}
          firstWordColor="text-nfs-purple"
          restWordsColor="text-nfs-cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg border-2 border-nfs-purple/40 shadow-cyber-glow"
          >
            {/* Corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-nfs-cyan rounded-tl-lg z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-nfs-yellow rounded-tr-lg z-10" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-nfs-purple rounded-bl-lg z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-nfs-neon rounded-br-lg z-10" />

            <div className="relative h-[500px] overflow-hidden">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}>
                <Image src="/1930s-car-workshop.png" alt="Veteran Motors - O nás" fill className="object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-racing-black/80 via-racing-black/30 to-transparent" />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                  }}
                />
              </motion.div>

              {/* Racing stripes */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-purple via-nfs-cyan to-nfs-yellow opacity-80" />

              {/* Floating elements */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i % 4 === 0
                        ? "bg-nfs-purple"
                        : i % 4 === 1
                          ? "bg-nfs-cyan"
                          : i % 4 === 2
                            ? "bg-nfs-yellow"
                            : "bg-nfs-neon"
                    }`}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 relative"
          >
            {/* Background glow effect */}
            <div className="absolute -inset-4 bg-nfs-purple/5 rounded-3xl blur-xl" />

            <div className="space-y-6 font-montserrat text-racing-white/90 leading-relaxed relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg"
              >
                <span className="text-nfs-purple font-bold">Začalo to již od mala</span>, láskou k autům a plakátama na
                stěnách. Ve svých 18 prvním VW broukem z roku 1965 u Nás v garáži, který jsme si s otcem chtěli opravit,
                ale během týdne si pro něj přijel kupec, tak jsme si pořídili druhého a pohádka se opakovala.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-nfs-cyan font-bold">Hodiny strávené za volantem</span>, ježdění po Evropě s
                vlekem, odřená kolena od hledání koroze v podbězích a olej za nehtama, to je pohádka několika posledních
                let. Jen teď za sebou máme místo obyčejných 4válců několika litrové V8čky, V6 a někdy i V12. Garáž jsme
                vyměnili za autodílnu a pod střechu uklidily mistrovská díla těch nejznámějších automobilek světa.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="text-nfs-yellow font-bold">Baví nás sledovat nadšení</span> každého z vás, komu splníme
                dětský sen a to ať už autem v předrenovačním stavu se kterým si budete moct v dílně po večerech hrát,
                leštěnkou, na kterou vaše paní bude žárlit anebo třeba kouskem na projížďky, který má nějaký ten
                kosmetický nedostatek.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-nfs-neon font-bold">Sami jsme byli ve Vašich botách</span> a proto máme pochopení
                a vždy se nějak domluvíme. Je to už několik let, během kterých jsme zjistili na co si dát pozor, desítky
                aut dovezených na zakázku, pronajatých do klipů, filmů nebo na svatby, množství aut opravených,
                dohromady přes sto aut pordaných. Budeme se těšit na spolupráci i s Vámi.
              </motion.p>
            </div>

            {/* Stats section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { icon: Trophy, value: "100+", label: "PRODANÝCH VOZŮ", color: "nfs-yellow" },
                { icon: Wrench, value: "15+", label: "LET ZKUŠENOSTÍ", color: "nfs-cyan" },
                { icon: Users, value: "500+", label: "SPOKOJENÝCH KLIENTŮ", color: "nfs-purple" },
                { icon: Star, value: "50+", label: "FILMOVÝCH PROJEKTŮ", color: "nfs-neon" },
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg border border-gray-800 bg-racing-black/40 backdrop-blur-sm text-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 20px rgba(var(--${stat.color.replace("nfs-", "")}), 0.3)`,
                      borderColor: `rgb(var(--${stat.color.replace("nfs-", "")}))`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent size={20} className={`mx-auto mb-2 text-${stat.color}`} />
                    <div className={`text-xl font-racing-sans font-bold text-${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs font-racing-sans text-white/70 tracking-wider">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom racing stripe */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-purple via-nfs-cyan to-nfs-yellow"></div> */}
    </section>
  )
}
