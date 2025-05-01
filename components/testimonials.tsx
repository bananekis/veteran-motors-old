"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import ArtDecoHeading from "./art-deco-heading"

const testimonials = [
  {
    id: 1,
    name: "Jan Novák",
    role: "Sběratel veteránů",
    content:
      "Spolupráce s Veteran Motors byla naprosto bezproblémová. Jejich profesionalita a znalost historických vozidel je na nejvyšší úrovni. Díky nim jsem získal svůj vysněný Bentley v perfektním stavu.",
  },
  {
    id: 2,
    name: "Markéta Svobodová",
    role: "Nevěsta",
    content:
      "Naše svatba byla díky nádhernému Rolls-Royce z Veteran Motors opravdu pohádková. Všichni hosté byli nadšení a fotografie s tímto skvostem jsou nejkrásnější z celého dne. Děkujeme za profesionální přístup a perfektní servis!",
  },
  {
    id: 3,
    name: "Tomáš Dvořák",
    role: "Filmový producent",
    content:
      "Pro natáčení historického filmu jsme potřebovali autentické vozy z 30. let. Veteran Motors nám poskytli přesně to, co jsme hledali, a jejich flexibilita při změnách v harmonogramu natáčení byla neocenitelná.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="section-padding bg-brown-dark text-white">
      <div className="container-vintage">
        <ArtDecoHeading centered className="text-white">
          CO O NÁS ŘÍKAJÍ
        </ArtDecoHeading>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Quote size={48} className="text-gold" />
              </div>
              <p className="font-cormorant text-xl md:text-2xl italic mb-8">{testimonials[current].content}</p>
              <div className="w-16 h-0.5 bg-gold mx-auto mb-4"></div>
              <h3 className="font-marcellus text-xl text-gold mb-1">{testimonials[current].name}</h3>
              <p className="font-montserrat text-sm text-white/80">{testimonials[current].role}</p>
            </motion.div>

            <div className="flex justify-center mt-12 space-x-4">
              <button
                onClick={prev}
                className="p-2 border border-gold/50 text-gold hover:bg-gold/10 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="p-2 border border-gold/50 text-gold hover:bg-gold/10 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
