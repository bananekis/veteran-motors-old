"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, DollarSign, Gauge } from "lucide-react"
import SectionHeader from "./section-header"
import CyberpunkButton from "@/components/ui/cyberpunk-button"
import CyberpunkCard from "@/components/ui/cyberpunk-card"
import type { Car } from "@/lib/types"

interface CarsGridProps {
  title: string
  subtitle?: string
  cars: Car[]
  showViewAll?: boolean
  viewAllHref?: string
  viewAllText?: string
  backgroundImage?: string
  firstWordColor?: string
  restWordsColor?: string
}

export default function CarsGrid({
  title,
  subtitle,
  cars,
  showViewAll = false,
  viewAllHref = "/prodej",
  viewAllText = "ZOBRAZIT VŠECHNY VOZY",
  backgroundImage,
  firstWordColor,
  restWordsColor,
}: CarsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      {/* Background overlay */}
      {/* <div className="absolute inset-0 bg-racing-black/80 backdrop-blur-sm"></div> */}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="container-vintage relative z-10">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          isInView={isInView}
          firstWordColor={firstWordColor}
          restWordsColor={restWordsColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cars.map((car, index) => (
            <CyberpunkCard
              key={car.id}
              title={car.name}
              description={car.description}
              image={car.mainImage}
              icon={Gauge}
              buttonText="ZOBRAZIT DETAIL"
              buttonLink={`/prodej/${car.id}`}
              buttonVariant="primary"
              isInView={isInView}
              index={index}
            >
              {/* Custom content for car cards */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-nfs-cyan">
                    <Calendar size={14} className="mr-2" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center text-sm text-nfs-yellow">
                    <DollarSign size={14} className="mr-2" />
                    <span>{car.price.toLocaleString()} Kč</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-6 font-montserrat text-gray-100 line-clamp-3">
                  {car.description}
                </p>
              </div>
            </CyberpunkCard>
          ))}
        </div>

        {/* View all button */}
        {showViewAll && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <CyberpunkButton href={viewAllHref} variant="outline" size="lg">
              {viewAllText}
            </CyberpunkButton>
          </motion.div>
        )}
      </div>

      {/* Bottom racing stripe */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-orange via-nfs-yellow to-nfs-cyan"></div> */}
    </section>
  )
}
