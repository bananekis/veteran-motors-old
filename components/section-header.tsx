"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  isInView: boolean
  firstWordColor?: string
  restWordsColor?: string
}

export default function SectionHeader({
  title,
  subtitle,
  isInView,
  firstWordColor = "text-nfs-yellow",
  restWordsColor = "text-nfs-orange",
}: SectionHeaderProps) {
  const words = title.split(" ")
  const firstWord = words[0]
  const restWords = words.slice(1).join(" ")

  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-6 racing-text-glow">
        <span className={firstWordColor}>{firstWord}</span> <span className={restWordsColor}>{restWords}</span>
      </h2>

      {/* NFS-style underline */}
      <motion.div
        className="flex justify-center items-center space-x-2 mx-auto max-w-xs my-6"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="h-0.5 w-16 bg-nfs-purple"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="h-0.5 w-24 bg-nfs-cyan"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="h-0.5 w-16 bg-nfs-yellow"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {subtitle && (
        <motion.p
          className="text-lg text-racing-white max-w-2xl mx-auto font-montserrat"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
