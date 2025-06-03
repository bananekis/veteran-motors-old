"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import CyberpunkButton from "./cyberpunk-button"

interface CyberpunkCardProps {
  title: string
  description: string
  image: string
  icon?: LucideIcon
  buttonText?: string
  buttonLink?: string
  buttonVariant?: "primary" | "secondary" | "accent" | "outline"
  children?: ReactNode
  isInView?: boolean
  index?: number
}

export default function CyberpunkCard({
  title,
  description,
  image,
  icon: IconComponent,
  buttonText,
  buttonLink,
  buttonVariant = "primary",
  children,
  isInView = true,
  index = 0,
}: CyberpunkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
      }}
      className="group h-full"
    >
      <motion.div
        className="h-full flex flex-col overflow-hidden shadow-xl rounded-lg relative border-2 border-nfs-orange/30"
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        {/* Corner elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-nfs-cyan rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-nfs-yellow rounded-tr-lg" />

        {/* Image Section */}
        <div className="relative overflow-hidden">
          <div className="relative h-64 w-full overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1, rotateZ: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-racing-black/90 via-racing-black/60 to-transparent backdrop-blur-[2px]"></div>

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

            {/* Title overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div className="text-center" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                {IconComponent && (
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }} className="mb-3">
                    <IconComponent size={48} className="mx-auto text-nfs-orange drop-shadow-lg" />
                  </motion.div>
                )}
                <h3 className="text-4xl text-white font-bold tracking-wider drop-shadow-lg font-racing-sans neon-glow">
                  {title}
                </h3>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          className="flex-1 flex flex-col p-8 relative bg-gradient-to-br from-slate-900/95 via-zinc-900/95 to-neutral-900/95 backdrop-blur-sm"
          whileHover={{ backgroundColor: "rgba(15, 23, 42, 0.98)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-1">
              {children ? (
                children
              ) : (
                <p className="text-base leading-relaxed mb-6 font-montserrat text-gray-100">{description}</p>
              )}
            </div>

            {buttonText && buttonLink && (
              <div className="mt-auto">
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <CyberpunkButton href={buttonLink} variant={buttonVariant} fullWidth>
                    {buttonText}
                  </CyberpunkButton>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
