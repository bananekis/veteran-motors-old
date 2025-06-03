"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  Gauge,
  Flag,
  Zap,
  Flame,
  Timer,
  ArrowRight,
  Bolt,
} from "lucide-react"
import VideoPlayer from "./video-player"
import { usePathname } from "next/navigation"

export default function HeroSection() {
  const pathname = usePathname()
  const isWeddingPage = pathname === "/svatby" || pathname?.startsWith("/svatby/")

  const [isMounted, setIsMounted] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Handle component mounting
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // Handle video playback controls
  const togglePlayback = () => {
    setIsPlaying((prev) => !prev)
  }

  // Handle audio mute toggle
  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  // Handle video load complete
  const handleVideoLoaded = (videoElement: HTMLVideoElement) => {
    setIsVideoLoaded(true)
    videoRef.current = videoElement
  }

  // Scroll to content section
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified corner accent elements */}
      {!isWeddingPage && (
        <>
          {/* Top corners */}
          <motion.div
            className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-nfs-cyan rounded-tl-3xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-nfs-yellow rounded-tr-3xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />

          {/* Bottom corners */}
          <motion.div
            className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-nfs-purple rounded-bl-3xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-nfs-neon rounded-br-3xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />
        </>
      )}

      {/* Wedding page corners */}
      {isWeddingPage && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 border-l-3 border-t-3 border-gold rounded-tl-2xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 border-r-3 border-t-3 border-gold rounded-tr-2xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 border-l-3 border-b-3 border-gold rounded-bl-2xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-16 h-16 border-r-3 border-b-3 border-gold rounded-br-2xl z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />
        </>
      )}

      {/* Video background with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image that's always visible until video loads */}
        <AnimatePresence>
          {(!isVideoLoaded || !isMounted) && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Image src="/bmw-2002-touring-angle.jpeg" alt="BMW 2002 Touring" fill priority className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video player that loads after component mounts */}
        {isMounted && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          >
            <VideoPlayer
              src="/bmw-2002-touring-video.mp4"
              className="w-full h-full object-cover"
              autoPlay={true}
              muted={isMuted}
              loop={true}
              isPlaying={isPlaying}
              onLoaded={handleVideoLoaded}
            />
          </motion.div>
        )}

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none noise-texture"></div>

        {/* Need for Speed style overlays for non-wedding pages */}
        {!isWeddingPage && (
          <>
            {/* Dashboard elements */}
            <div className="absolute bottom-20 left-8 z-20 flex items-end space-x-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="bg-racing-black/80 backdrop-blur-sm p-3 rounded-lg border border-nfs-orange/30 transform rotate-2 shadow-glow"
              >
                <div className="flex items-center space-x-2">
                  <Gauge size={18} className="text-nfs-yellow" />
                  <div>
                    <div className="flex items-end">
                      <span className="speed-counter font-marcellus text-2xl text-nfs-yellow">320</span>
                      <span className="font-montserrat text-sm text-nfs-orange ml-1">KM/H</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="bg-racing-black/80 backdrop-blur-sm p-3 rounded-lg border border-nfs-orange/30 transform -rotate-1 shadow-glow"
              >
                <div className="flex items-center space-x-2">
                  <Timer size={18} className="text-nfs-neon" />
                  <div className="font-montserrat text-nfs-neon">READY</div>
                </div>
              </motion.div>
            </div>

            {/* Rev counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              className="absolute bottom-20 right-8 z-20"
            >
              <div className="bg-racing-black/80 backdrop-blur-sm p-3 rounded-lg border border-nfs-orange/30 shadow-glow">
                <div className="flex items-center">
                  <Flame size={20} className="text-nfs-orange mr-2" />
                  <div className="rev-dial w-8 h-8 border-4 border-nfs-yellow rounded-full flex items-center justify-center animate-pulse">
                    <div className="absolute h-4 w-1 bg-nfs-orange transform-gpu origin-bottom"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Darker overlay for better text visibility */}
        <div
          className={`absolute inset-0 ${
            isWeddingPage
              ? "bg-gradient-to-b from-black/80 via-black/70 to-black/80"
              : "bg-gradient-to-b from-racing-black/95 via-racing-black/85 to-racing-black/95"
          } z-10`}
        ></div>

        {/* Additional dark filter overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-75 z-5"></div>
      </div>

      {/* Video controls with updated colors */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-32 right-8 z-30 flex items-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={togglePlayback}
              className={`w-12 h-12 rounded-full ${
                isWeddingPage
                  ? "bg-gold/80 hover:bg-gold border-2 border-gold/50"
                  : "bg-nfs-purple/80 hover:bg-nfs-purple border-2 border-nfs-cyan/50 hover:border-nfs-cyan"
              } backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 shadow-glow`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full ${
                isWeddingPage
                  ? "bg-gold/80 hover:bg-gold border-2 border-gold/50"
                  : "bg-nfs-cyan/80 hover:bg-nfs-cyan border-2 border-nfs-yellow/50 hover:border-nfs-yellow"
              } backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 shadow-glow`}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container-vintage relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          {isWeddingPage ? (
            /* Wedding Title */
            <motion.h1
              className="font-marcellus text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wider text-shadow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              VETERAN MOTORS
            </motion.h1>
          ) : (
            /* Racing Title with intense NFS animations */
            <div className="relative">
              <motion.div
                className="absolute -top-14 left-0 right-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Flag size={40} className="text-nfs-yellow rotate-12 animate-pulse" />
                <Gauge size={44} className="text-nfs-orange ml-4 -rotate-6 animate-pulse-delayed" />
                <Zap size={42} className="text-nfs-neon ml-4 rotate-3 animate-pulse-glow" />
              </motion.div>

              <motion.h1
                className="font-marcellus text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wider text-racing flex justify-center perspective-1000 transform-gpu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="inline-block text-nfs-white neon-glow">VETERAN</span>
                <span className="mx-3 text-nfs-white neon-glow inline-block">MOTORS</span>
              </motion.h1>
            </div>
          )}

          {/* Wedding divider */}
          {isWeddingPage && (
            <motion.div
              className="w-24 h-1 bg-gold mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.div>
          )}

          <motion.p
            className={`${
              isWeddingPage ? "font-cormorant text-shadow" : "font-cormorant text-racing"
            } text-2xl md:text-3xl text-white mb-12 max-w-3xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {isWeddingPage ? "Elegance a styl minulých dob na čtyřech kolech" : "RYCHLOST • STYL • VÝKON • HISTORIE"}
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isWeddingPage ? (
                <Link href="/prodej" className="vintage-button border-gold text-white hover:text-gold">
                  Prohlédnout vozy
                </Link>
              ) : (
                <Link href="/prodej" className="nfs-button-primary group">
                  <Bolt size={20} className="mr-2 group-hover:animate-pulse" />
                  <span className="font-racing-sans tracking-widest">PROHLÉDNOUT VOZY</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isWeddingPage ? (
                <Link href="/kontakt" className="vintage-button border-gold/70 text-white hover:text-gold">
                  Kontaktujte nás
                </Link>
              ) : (
                <Link href="/kontakt" className="nfs-button-secondary group">
                  <Zap size={20} className="mr-2 group-hover:animate-pulse" />
                  <span className="font-racing-sans tracking-widest">KONTAKTUJTE NÁS</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <button
          onClick={scrollToContent}
          className={`flex flex-col items-center ${
            isWeddingPage ? "text-gold hover:text-gold-light" : "text-nfs-yellow hover:text-nfs-orange"
          } transition-colors duration-300 focus:outline-none group`}
          aria-label="Scroll down"
        >
          {!isWeddingPage && (
            <motion.div
              className="w-10 h-1 bg-nfs-orange mb-2"
              animate={{ width: [10, 40, 10] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
          )}
          <span className={`text-sm ${isWeddingPage ? "font-marcellus" : "font-marcellus"} tracking-wider mb-2`}>
            {isWeddingPage ? "OBJEVTE VÍCE" : "VÍCE OBSAHU"}
          </span>
          <motion.div
            animate={!isWeddingPage ? { y: [0, 8, 0], opacity: [0.5, 1, 0.5] } : { y: [0, 5, 0] }}
            transition={{
              duration: isWeddingPage ? 1.5 : 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <ChevronDown
              size={24}
              className={`${!isWeddingPage ? "text-nfs-orange" : ""} group-hover:scale-110 transition-transform`}
            />
          </motion.div>
          {!isWeddingPage && (
            <motion.div
              className="w-10 h-1 bg-nfs-yellow mt-2"
              animate={{ width: [40, 10, 40] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
          )}
        </button>
      </motion.div>

      {/* Simplified bottom transition element */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-25"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {isWeddingPage ? (
          /* Wedding transition */
          <div className="h-6 bg-gradient-to-t from-cream-darker to-transparent"></div>
        ) : (
          /* Racing transition */
          <div className="relative">
            <div className="h-8 bg-gradient-to-t from-racing-black via-racing-black/60 to-transparent"></div>

            {/* Racing stripe that stops at the corners */}
            <div className="absolute bottom-0 left-24 right-24 h-1 bg-gradient-to-r from-nfs-purple via-nfs-cyan to-nfs-yellow opacity-60"></div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
