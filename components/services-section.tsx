"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Zap, Gauge, Heart } from "lucide-react"
import SectionHeader from "./section-header"
import CyberpunkCard from "@/components/ui/cyberpunk-card"

const services = [
  {
    title: "PRODEJ",
    description:
      "Nabízíme k prodeji pečlivě vybrané a udržované veterány. V naší nabídce najdete jak vozy skladem, tak možnost dovozu na zakázku podle vašich představ.",
    image: "/vintage-gangster-car.png",
    link: "/prodej",
    icon: Zap,
  },
  {
    title: "PRONÁJEM",
    description:
      "Půjčte si auta do filmů, klipů, na narozeniny nebo třeba jen tak na projížďku. Nabízíme široký výběr vozů pro různé příležitosti.",
    image: "/vintage-car-rental-gangster.png",
    link: "/pronajem",
    icon: Gauge,
  },
  {
    title: "SVATBY",
    description:
      "Učiňte svůj jedinečný den opravdu jedinečným! Nabízíme pronájem vozů na svatby včetně výzdoby, dopravy a dalších služeb.",
    image: "/1930s-wedding-car.png",
    link: "/svatby",
    icon: Heart,
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: "url('/cyberpunkimage-min.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background overlay */}
      {/* <div className="absolute inset-0 bg-racing-black/80 backdrop-blur-sm"></div> */}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="container-vintage relative z-10">
        <SectionHeader title="NAŠE SLUŽBY" isInView={isInView} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <CyberpunkCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
              icon={service.icon}
              buttonText="ZJISTIT VÍCE"
              buttonLink={service.link}
              buttonVariant="accent"
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom racing stripe */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-orange via-nfs-yellow to-nfs-cyan"></div> */}
    </section>
  )
}
