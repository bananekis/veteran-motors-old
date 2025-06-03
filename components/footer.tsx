"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Zap, Phone, Mail, MapPin, Building, Globe } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()
  const isWeddingPage = pathname === "/svatby" || pathname?.startsWith("/svatby/")

  return (
    <footer
      className={
        isWeddingPage
          ? "bg-brown-dark text-white py-16 relative"
          : "bg-racing-black text-racing-white py-16 relative overflow-hidden"
      }
    >
      {/* Racing theme background effects */}
      {!isWeddingPage && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Speed lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-nfs-purple to-transparent animate-speed-line"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-nfs-cyan to-transparent animate-speed-line-delayed-2"></div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-nfs-cyan rounded-tl-3xl opacity-30" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-nfs-yellow rounded-tr-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-nfs-purple rounded-bl-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-nfs-neon rounded-br-3xl opacity-30" />
        </div>
      )}

      <div className="container-vintage relative z-10">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {isWeddingPage ? (
            <div className="mb-4">
              {/* Keep original art deco logo for wedding pages */}
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <span className="text-brown-dark font-bold text-2xl">VM</span>
              </div>
            </div>
          ) : (
            <motion.div
              className="relative mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              LOGO
            </motion.div>
          )}

          <motion.h2
            className={`font-marcellus text-3xl mt-4 tracking-[0.3em] ${
              isWeddingPage ? "text-gold" : "text-nfs-yellow neon-glow"
            }`}
            whileHover={!isWeddingPage ? { scale: 1.02 } : {}}
            transition={{ duration: 0.2 }}
          >
            VETERAN MOTORS
          </motion.h2>

          {isWeddingPage ? (
            <div className="art-deco-divider w-full max-w-xs my-6">
              <span>✦</span>
            </div>
          ) : (
            <motion.div
              className="flex justify-center items-center space-x-2 w-full max-w-xs my-6"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-0.5 w-16 bg-nfs-purple"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <Zap size={16} className="text-nfs-yellow animate-pulse" />
              <motion.div
                className="h-0.5 w-24 bg-nfs-cyan"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <Zap size={16} className="text-nfs-purple animate-pulse" />
              <motion.div
                className="h-0.5 w-16 bg-nfs-yellow"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3
              className={`font-marcellus text-xl mb-6 tracking-wider ${
                isWeddingPage ? "text-gold" : "text-nfs-purple neon-glow"
              }`}
            >
              KONTAKT
            </h3>

            <address className="not-italic font-montserrat space-y-3">
              <motion.div
                className="flex items-center justify-center md:justify-start space-x-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {!isWeddingPage && <Building size={16} className="text-nfs-cyan" />}
                <p className={`${!isWeddingPage ? "text-racing-white/90" : ""}`}>Veteran Motors s.r.o.</p>
              </motion.div>

              <motion.div
                className="flex items-center justify-center md:justify-start space-x-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {!isWeddingPage && <MapPin size={16} className="text-nfs-yellow" />}
                <p className={`${!isWeddingPage ? "text-racing-white/90" : ""}`}>Klasická 123</p>
              </motion.div>

              <motion.div
                className="flex items-center justify-center md:justify-start space-x-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {!isWeddingPage && <Globe size={16} className="text-nfs-purple" />}
                <p className={`${!isWeddingPage ? "text-racing-white/90" : ""}`}>110 00 Praha</p>
              </motion.div>

              <motion.div
                className="flex items-center justify-center md:justify-start space-x-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {!isWeddingPage && <span className="text-nfs-neon text-lg">🇨🇿</span>}
                <p className={`${!isWeddingPage ? "text-racing-white/90" : ""}`}>Česká republika</p>
              </motion.div>
            </address>
          </motion.div>

          {/* Connection Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className={`font-marcellus text-xl mb-6 tracking-wider ${
                isWeddingPage ? "text-gold" : "text-nfs-purple neon-glow"
              }`}
            >
              SPOJENÍ
            </h3>

            {/* Clickable phone number */}
            <motion.a
              href="tel:+420123456789"
              className={`flex items-center justify-center space-x-2 mb-3 font-montserrat group transition-all duration-300 ${
                isWeddingPage ? "hover:text-gold" : "text-racing-white/90 hover:text-nfs-cyan"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {!isWeddingPage && <Phone size={16} className="text-nfs-cyan group-hover:animate-pulse" />}
              <span>Tel: +420 123 456 789</span>
            </motion.a>

            {/* Clickable email */}
            <motion.a
              href="mailto:info@veteranmotors.cz"
              className={`flex items-center justify-center space-x-2 mb-6 font-montserrat group transition-all duration-300 ${
                isWeddingPage ? "hover:text-gold" : "text-racing-white/90 hover:text-nfs-yellow"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {!isWeddingPage && <Mail size={16} className="text-nfs-yellow group-hover:animate-pulse" />}
              <span>Email: info@veteranmotors.cz</span>
            </motion.a>

            <div className="flex justify-center space-x-8">
              <motion.a
                href="#"
                className={`transition-all duration-300 ${
                  isWeddingPage ? "text-white/70 hover:text-gold" : "text-racing-white/60 hover:text-nfs-purple"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
                aria-label="Facebook"
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className={`transition-all duration-300 ${
                  isWeddingPage ? "text-white/70 hover:text-gold" : "text-racing-white/60 hover:text-nfs-cyan"
                }`}
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ duration: 0.2 }}
                aria-label="Instagram"
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className={`transition-all duration-300 ${
                  isWeddingPage ? "text-white/70 hover:text-gold" : "text-racing-white/60 hover:text-nfs-yellow"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
                aria-label="YouTube"
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Section */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3
              className={`font-marcellus text-xl mb-6 tracking-wider ${
                isWeddingPage ? "text-gold" : "text-nfs-purple neon-glow"
              }`}
            >
              NAVIGACE
            </h3>
            <ul className="space-y-3 font-montserrat">
              {[
                { href: "/", label: "Domů", color: "nfs-yellow" },
                { href: "/prodej", label: "Prodej", color: "nfs-purple" },
                { href: "/pronajem", label: "Pronájem", color: "nfs-cyan" },
                { href: "/svatby", label: "♥ Svatby ♥", color: "pink-300" },
                { href: "/kontakt", label: "Kontakt", color: "nfs-yellow" },
                { href: "/fotogalerie", label: "Fotogalerie", color: "nfs-neon" },
              ].map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.href}
                    className={`transition-all duration-300 inline-block relative group ${
                      pathname === item.href || pathname?.startsWith(`${item.href}/`)
                        ? isWeddingPage
                          ? "text-gold"
                          : `text-${item.color}`
                        : isWeddingPage
                          ? "hover:text-gold"
                          : `hover:text-${item.color}`
                    }`}
                  >
                    {!isWeddingPage && (pathname === item.href || pathname?.startsWith(`${item.href}/`)) && (
                      <span className="text-nfs-yellow mr-2 animate-pulse">➤</span>
                    )}
                    <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      {item.label}
                    </motion.span>
                    {!isWeddingPage && (
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className={`${isWeddingPage ? "border-t border-gold/30" : "border-t border-nfs-purple/30"} pt-8 text-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className={`font-montserrat text-sm ${isWeddingPage ? "" : "text-racing-white/80"}`}>
            &copy; {new Date().getFullYear()} Veteran Motors.{" "}
            <span className={isWeddingPage ? "text-gold" : "text-nfs-yellow"}>Všechna práva vyhrazena.</span>
          </p>

          {/* Racing signature */}
          {!isWeddingPage && (
            <motion.div
              className="flex justify-center items-center space-x-2 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-8 bg-nfs-purple"></div>
              <Zap size={12} className="text-nfs-cyan animate-pulse" />
              <span className="text-xs text-nfs-yellow tracking-widest">POWERED BY SPEED</span>
              <Zap size={12} className="text-nfs-purple animate-pulse" />
              <div className="h-px w-8 bg-nfs-cyan"></div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom racing stripe */}
      {!isWeddingPage && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nfs-purple via-nfs-cyan to-nfs-yellow"></div>
      )}
    </footer>
  )
}
