"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Camera, Eye, ArrowRight, Gauge } from "lucide-react"
import SectionHeader from "./section-header"
import CyberpunkButton from "@/components/ui/cyberpunk-button"

const showcaseImages = [
  {
    src: "/bmw-2002-touring-angle.jpeg",
    alt: "BMW 2002 Touring",
    title: "CLASSIC ANGLE",
    size: "large",
  },
  {
    src: "/bmw-2002-touring-side.jpeg",
    alt: "BMW 2002 Touring Side View",
    title: "SIDE PROFILE",
    size: "large",
  },
  {
    src: "/bmw-2002-touring-badge.jpeg",
    alt: "BMW 2002 Touring Badge",
    title: "BADGE DETAIL",
    size: "small",
  },
  {
    src: "/bmw-2002-touring-interior.jpeg",
    alt: "BMW 2002 Touring Interior",
    title: "INTERIOR",
    size: "small",
  },
  {
    src: "/bmw-2002-touring-steering.jpeg",
    alt: "BMW 2002 Touring Steering Wheel",
    title: "STEERING",
    size: "small",
  },
]

export default function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

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
      {/* <div className="absolute inset-0 bg-racing-black/85 backdrop-blur-sm"></div> */}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-15"></div>

      {/* Racing speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`speed-line-${i}`}
            className={`absolute h-1 w-64 blur-sm ${
              i % 4 === 0
                ? "bg-nfs-purple"
                : i % 4 === 1
                  ? "bg-nfs-cyan"
                  : i % 4 === 2
                    ? "bg-nfs-yellow"
                    : "bg-nfs-neon"
            }`}
            style={{
              top: `${10 + i * 12}%`,
              left: "-200px",
              transform: "skewX(-15deg)",
            }}
            animate={{
              x: [0, window.innerWidth + 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="container-vintage relative z-10">
        <SectionHeader
          title="NAŠE VOZY"
          subtitle="Prohlédněte si naše vozy v detailu"
          isInView={isInView}
          firstWordColor="text-nfs-purple"
          restWordsColor="text-nfs-cyan"
        />

        {/* Large images grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {showcaseImages.slice(0, 2).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <motion.div
                className="relative h-80 overflow-hidden rounded-lg border-2 border-nfs-purple/40 shadow-cyber-glow"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(138, 43, 226, 0.4), 0 0 30px rgba(0, 255, 255, 0.3)",
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Corner elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-nfs-cyan rounded-tl-lg z-10" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-nfs-yellow rounded-tr-lg z-10" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-nfs-purple rounded-bl-lg z-10" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-nfs-neon rounded-br-lg z-10" />

                {/* Image */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-racing-black/80 via-racing-black/40 to-transparent" />

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </motion.div>

                {/* Title overlay */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-racing-black/90 backdrop-blur-md border border-nfs-purple/50">
                    <Camera size={20} className="text-nfs-cyan" />
                    <span className="font-racing-sans text-lg tracking-wider text-nfs-yellow neon-glow">
                      {image.title}
                    </span>
                  </div>
                </motion.div>

                {/* Hover scan line effect */}
                {hoveredImage === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute w-full h-1 bg-nfs-cyan shadow-glow"
                      animate={{ y: [0, 320, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Small images grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {showcaseImages.slice(2).map((image, index) => (
            <motion.div
              key={index + 2}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredImage(index + 2)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <motion.div
                className="relative h-48 overflow-hidden rounded-lg border-2 border-nfs-cyan/40 shadow-glow"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(0, 255, 255, 0.4), 0 0 25px rgba(138, 43, 226, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-nfs-yellow rounded-tl-lg z-10" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-nfs-purple rounded-tr-lg z-10" />

                {/* Image */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.15, rotateZ: 2 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-racing-black/70 via-transparent to-transparent" />
                </motion.div>

                {/* Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-center p-2 rounded bg-racing-black/80 backdrop-blur-sm border border-nfs-cyan/30">
                    <span className="font-racing-sans text-sm tracking-wider text-nfs-cyan">{image.title}</span>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i === 0 ? "bg-nfs-purple" : i === 1 ? "bg-nfs-cyan" : "bg-nfs-yellow"
                      }`}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Description and CTA */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Description box */}
          <div className="p-8 mb-8 rounded-lg border-2 border-nfs-purple/30 bg-racing-black/60 backdrop-blur-md shadow-cyber-glow relative overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Gauge size={32} className="text-nfs-purple mr-3" />
                <h3 className="font-racing-sans text-2xl tracking-wider text-nfs-cyan neon-glow">
                  PRECISION ENGINEERING
                </h3>
                <Gauge size={32} className="text-nfs-purple ml-3" />
              </div>

              <p className="text-lg leading-relaxed font-montserrat text-racing-white mb-6">
                Prohlédněte si naše vozy v detailu. Tento{" "}
                <span className="text-nfs-yellow font-bold">BMW 2002 Touring</span> je perfektním příkladem našich
                pečlivě udržovaných veteránů. Každý vůz prochází důkladnou kontrolou a renovací, aby splňoval naše{" "}
                <span className="text-nfs-purple font-bold">vysoké standardy kvality</span>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "PHOTOS", value: "150+", color: "nfs-cyan" },
                  { label: "DETAILS", value: "HD", color: "nfs-yellow" },
                  { label: "ANGLES", value: "360°", color: "nfs-purple" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-lg border border-gray-700 bg-racing-black/40"
                    whileHover={{ scale: 1.05, borderColor: `rgb(var(--${stat.color}))` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-2xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-sm text-racing-white/80 font-racing-sans tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <CyberpunkButton
              href="/fotogalerie"
              variant="primary"
              size="lg"
              icon={<Eye size={20} />}
              iconPosition="left"
            >
              <span className="flex items-center">
                ZOBRAZIT FOTOGALERII
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </CyberpunkButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom racing stripe */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nfs-purple via-nfs-cyan to-nfs-yellow"></div> */}
    </section>
  )
}
