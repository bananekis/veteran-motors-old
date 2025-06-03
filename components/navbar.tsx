"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Zap } from "lucide-react" // Added Zap for potential NFS icon
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const navItems = [
    { href: "/prodej", label: "Prodej" },
    { href: "/pronajem", label: "Pronájem" },
    { href: "/svatby", label: "Svatby" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${
          scrolled
            ? "bg-deep-indigo/95 backdrop-blur-md py-2 shadow-lg border-b border-neon-teal/30"
            : "bg-nfs-purple-drive py-4 shadow-md" // Using the new NFS gradient
        }`}
    >
      <div className="container-vintage">
        {" "}
        {/* Assuming .container-vintage is defined elsewhere */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* <ArtDecoLogo size={scrolled ? 42 : 52} /> */}
              {/* Placeholder for ArtDecoLogo if not available */}
              <div
                className={`transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-12 h-12"} bg-neon-pink/30 rounded-full flex items-center justify-center`}
              >
                <Zap className={`transition-all duration-300 ${scrolled ? "w-5 h-5" : "w-6 h-6"} text-white`} />
              </div>
              <div className="absolute inset-0 bg-neon-pink/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span
              className={`font-marcellus text-2xl md:text-3xl tracking-wider transition-all duration-500 group-hover:tracking-widest ${
                scrolled ? "text-white group-hover:text-neon-teal" : "text-white text-shadow group-hover:text-neon-pink"
              }`}
            >
              VETERAN MOTORS
            </span>
          </Link>

          <button
            className={`lg:hidden p-3 z-50 relative rounded-lg transition-all duration-300 hover:scale-110 ${
              scrolled ? "hover:bg-neon-teal/10" : "hover:bg-neon-pink/10"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? (
                <X size={24} className="text-white drop-shadow-lg" />
              ) : (
                <Menu size={24} className={scrolled ? "text-white" : "text-white drop-shadow-lg"} />
              )}
            </motion.div>
          </button>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative group px-6 py-3 font-marcellus text-lg uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden ${
                    scrolled ? "text-white hover:text-neon-teal" : "text-white text-shadow hover:text-neon-pink"
                  }`}
                >
                  <span
                    className={`absolute inset-0 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left ${
                      scrolled
                        ? "bg-gradient-to-r from-neon-teal/20 to-neon-blue/10"
                        : "bg-gradient-to-r from-neon-pink/25 via-neon-purple/15 to-spark-orange/10" // Enhanced hover for NFS feel
                    }`}
                  ></span>
                  <span
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${
                      scrolled
                        ? "bg-gradient-to-r from-neon-teal/30 via-neon-blue/20 to-transparent"
                        : "bg-gradient-to-r from-neon-pink/35 via-neon-purple/25 to-transparent" // Enhanced glow
                    }`}
                  ></span>
                  <span className="relative z-10 transition-all duration-300 group-hover:tracking-widest">
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2 ${
                      scrolled
                        ? "bg-gradient-to-r from-transparent via-neon-teal to-transparent"
                        : "bg-gradient-to-r from-transparent via-neon-pink to-transparent"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 top-1/2 w-0 h-6 transition-all duration-300 group-hover:w-0.5 transform -translate-y-1/2 ${
                      scrolled ? "bg-neon-teal/50" : "bg-neon-pink/50"
                    }`}
                  ></span>
                  <span
                    className={`absolute right-0 top-1/2 w-0 h-6 transition-all duration-300 group-hover:w-0.5 transform -translate-y-1/2 ${
                      scrolled ? "bg-neon-teal/50" : "bg-neon-pink/50"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 left-0 w-full h-full z-40 lg:hidden"
            >
              <motion.div
                className="absolute inset-0 bg-nfs-purple-drive backdrop-blur-lg" // Using NFS gradient for mobile backdrop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.nav
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-deep-indigo/90 border-r-2 border-neon-teal/40 overflow-y-auto shadow-2xl" // Slightly adjusted mobile nav bg for contrast
              >
                <div className="absolute inset-0 opacity-[0.03] art-deco-pattern"></div>
                <div className="relative p-6 pt-20">
                  <motion.div
                    className="art-deco-divider mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <span className="text-neon-pink text-3xl">✦</span>
                  </motion.div>
                  <div className="flex flex-col space-y-2 py-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.1 + index * 0.1,
                          type: "spring",
                          damping: 20,
                        }}
                        className="group"
                      >
                        <Link
                          href={item.href}
                          className="relative block py-4 px-4 font-marcellus text-2xl uppercase tracking-wider text-white hover:text-neon-teal transition-all duration-300 rounded-lg overflow-hidden"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -skew-x-12 group-hover:skew-x-0"></span>
                          <span className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                          <span className="relative z-10 transition-all duration-300 group-hover:tracking-widest group-hover:translate-x-2">
                            {item.label}
                          </span>
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon-pink opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                            →
                          </span>
                        </Link>
                        <motion.div
                          className="w-0 h-0.5 bg-gradient-to-r from-neon-teal/50 to-transparent mt-2 ml-4"
                          whileInView={{ width: "4rem" }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        ></motion.div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="mt-12 text-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="relative inline-block">
                      {/* <ArtDecoLogo size={60} /> */}
                      <div className="w-14 h-14 bg-neon-pink/30 rounded-full flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-neon-pink/30 blur-lg rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      ></motion.div>
                    </div>
                    <p className="text-white/80 mt-6 font-montserrat text-sm leading-relaxed">
                      Elegance a styl minulých dob na
                      <br />
                      čtyřech kolech
                    </p>
                  </motion.div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Placeholder for ArtDecoLogo if you don't have it
// const ArtDecoLogo = ({ size }: { size: number }) => (
//   <div style={{ width: size, height: size }} className="bg-neon-pink/30 rounded-full flex items-center justify-center">
//     <Zap style={{ width: size * 0.5, height: size * 0.5 }} className="text-white" />
//   </div>
// );
