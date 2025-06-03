"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { ChevronRight, Calendar, DollarSign, Eye, Gauge } from "lucide-react"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
  type: "sale" | "rental" | "wedding"
  index?: number
}

export default function CarCard({ car, type, index = 0 }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  const href = type === "sale" ? `/prodej/${car.id}` : type === "rental" ? `/pronajem/${car.id}` : `/svatby/${car.id}`

  // Animate card when it comes into view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.1,
        },
      })
    }
  }, [isInView, controls, index])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full relative overflow-hidden bg-gradient-to-br from-racing-black to-racing-dark border-2 border-nfs-orange/40 shadow-cyber-glow rounded-xl backdrop-blur-sm"
        whileHover={{
          y: -15,
          scale: 1.03,
          boxShadow:
            "0 25px 50px -12px rgba(0, 255, 255, 0.4), 0 0 30px rgba(255, 85, 0, 0.3), 0 0 50px rgba(57, 255, 20, 0.2)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Corner elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-nfs-cyan rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-nfs-yellow rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-nfs-orange rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-nfs-purple rounded-br-xl" />

        {/* Racing scanlines background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 4px,
                rgba(0, 255, 255, 0.1) 4px,
                rgba(0, 255, 255, 0.1) 8px
              )`,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="relative h-80 w-full overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1, rotateZ: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image src={car.mainImage || "/placeholder.svg"} alt={car.name} fill className="object-cover" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-racing-black/90 via-racing-black/40 to-transparent" />

              {/* Speed lines overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`speed-line-${i}`}
                    className={`absolute h-1 w-32 blur-sm ${
                      i % 3 === 0 ? "bg-nfs-cyan" : i % 3 === 1 ? "bg-nfs-orange" : "bg-nfs-yellow"
                    }`}
                    style={{
                      top: `${20 + i * 15}%`,
                      left: "-100px",
                      transform: "skewX(-15deg)",
                    }}
                    animate={{
                      x: [0, 400],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 85, 0, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
            </motion.div>

            {/* Year badge */}
            <motion.div
              className="absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-md border-2 bg-racing-black/90 text-nfs-cyan border-nfs-orange shadow-cyber-glow"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.8), 0 0 40px rgba(255, 85, 0, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="neon-glow">{car.year}</span>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              className="absolute bottom-4 left-4 flex items-center space-x-2 px-3 py-2 rounded-lg bg-racing-black/90 backdrop-blur-md border border-nfs-cyan/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Gauge size={14} className="text-nfs-cyan animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-nfs-cyan neon-glow">
                {car.available ? "READY" : "OFFLINE"}
              </span>
            </motion.div>

            {/* Racing stripes */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-orange via-nfs-yellow to-nfs-cyan opacity-80" />

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-racing-black/95 via-racing-black/70 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={href}
                className="flex items-center px-6 py-3 rounded-lg font-bold backdrop-blur-md border-2 transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-nfs-orange to-nfs-yellow hover:from-nfs-yellow hover:to-nfs-orange border-nfs-cyan text-racing-black shadow-cyber-glow"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-nfs-cyan/20 to-nfs-purple/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                <Eye size={18} className="mr-2 relative z-10" />
                <span className="relative z-10 font-racing-sans tracking-wider">VIEW DETAILS</span>
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 relative bg-racing-black/95 backdrop-blur-sm">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 85, 0, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            {/* Title */}
            <motion.h3
              className="font-marcellus text-xl mb-4 tracking-wide text-nfs-cyan neon-glow"
              whileHover={{
                x: 6,
                textShadow: "0 0 15px rgba(0, 255, 255, 0.8), 0 0 25px rgba(255, 85, 0, 0.4)",
              }}
              transition={{ duration: 0.2 }}
            >
              {car.name}
            </motion.h3>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-lg border-2 backdrop-blur-sm bg-racing-black/80 border-nfs-orange/40 shadow-glow">
                <div className="flex items-center text-xs mb-1 text-nfs-cyan">
                  <Calendar size={12} className="mr-1" />
                  <span className="font-racing-sans tracking-wider">YEAR</span>
                </div>
                <div className="font-bold text-nfs-yellow neon-glow">{car.year}</div>
              </div>

              {type === "sale" && (
                <div className="p-3 rounded-lg border-2 backdrop-blur-sm bg-racing-black/80 border-nfs-cyan/40 shadow-glow">
                  <div className="flex items-center text-xs mb-1 text-nfs-orange">
                    <DollarSign size={12} className="mr-1" />
                    <span className="font-racing-sans tracking-wider">PRICE</span>
                  </div>
                  <motion.div
                    className="font-bold text-nfs-yellow neon-glow"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {car.price.toLocaleString()} Kč
                  </motion.div>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center py-2 border-b-2 border-nfs-orange/30">
                <span className="text-sm text-nfs-cyan">Motor</span>
                <span className="text-sm font-medium text-nfs-yellow">{car.specifications.engine}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-nfs-orange/30">
                <span className="text-sm text-nfs-cyan">Stav</span>
                <span className="text-sm font-medium text-nfs-neon">{car.specifications.condition}</span>
              </div>
            </div>

            {/* Action button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
              <Link
                href={href}
                className="w-full flex items-center justify-center px-6 py-4 rounded-lg font-bold transition-all duration-300 group relative overflow-hidden border-2 bg-gradient-to-r from-nfs-orange via-nfs-yellow to-nfs-orange hover:from-nfs-cyan hover:via-nfs-neon hover:to-nfs-cyan text-racing-black border-nfs-cyan shadow-cyber-glow"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-nfs-cyan/20 via-nfs-purple/20 to-nfs-orange/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Speed lines in button */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`btn-line-${i}`}
                    className="absolute top-1/2 -left-full w-full h-0.5 bg-white/50 transform -translate-y-1/2"
                    animate={isHovered ? { x: ["0%", "200%"] } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                ))}

                <span className="relative z-10 flex items-center tracking-wider font-racing-sans">
                  {type === "wedding" ? "REZERVOVAT" : type === "rental" ? "RENT NOW" : "BUY NOW"}
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="mt-4 h-3 rounded-full overflow-hidden border bg-racing-black border-nfs-orange/30">
              <motion.div
                className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-nfs-orange via-nfs-yellow to-nfs-cyan"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.6), 0 0 25px rgba(255, 85, 0, 0.4)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-nfs-cyan" : "bg-nfs-orange"}`}
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
      </motion.div>
    </motion.div>
  )
}
