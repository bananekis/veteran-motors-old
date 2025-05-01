"use client"

import { useRef } from "react"
import { cars } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion, useInView } from "framer-motion"
import ArtDecoHeading from "@/components/art-deco-heading"

interface CarDetailPageProps {
  params: {
    id: string
  }
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const car = cars.find((c) => c.id === params.id)

  if (!car) {
    notFound()
  }

  const mainImageRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const isMainImageInView = useInView(mainImageRef, { once: true, amount: 0.1 })
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.1 })

  return (
    <div className="pt-32 pb-16">
      <div className="container-vintage">
        <ArtDecoHeading>{car.name}</ArtDecoHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            ref={mainImageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isMainImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="art-deco-border">
              <div className="relative h-96 overflow-hidden">
                <Image src={car.mainImage || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {car.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMainImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="art-deco-border"
                >
                  <div className="relative h-24 overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${car.name} - detail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="art-deco-border">
              <div className="p-6 bg-cream">
                <h2 className="font-marcellus text-2xl mb-4 vintage-heading">CENA</h2>
                <p className="text-3xl font-bold text-gold font-marcellus">{car.price.toLocaleString()} Kč</p>
              </div>
            </div>

            <div className="art-deco-border">
              <div className="p-6 bg-cream">
                <h2 className="font-marcellus text-2xl mb-4 vintage-heading">Další informace</h2>

                <ul className="space-y-3 font-montserrat">
                  <li className="flex justify-between">
                    <span className="font-medium">Značka:</span>
                    <span>{car.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Model:</span>
                    <span>{car.model}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Rok výroby:</span>
                    <span>{car.year}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Motor:</span>
                    <span>{car.specifications.engine}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Převodovka:</span>
                    <span>{car.specifications.transmission}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Stav:</span>
                    <span>{car.specifications.condition}</span>
                  </li>
                  {car.specifications.mileage && (
                    <li className="flex justify-between">
                      <span className="font-medium">Najeto:</span>
                      <span>{car.specifications.mileage.toLocaleString()} km</span>
                    </li>
                  )}
                  {car.specifications.color && (
                    <li className="flex justify-between">
                      <span className="font-medium">Barva:</span>
                      <span>{car.specifications.color}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="art-deco-border">
              <div className="p-6 bg-cream">
                <h2 className="font-marcellus text-2xl mb-4 vintage-heading">Popis</h2>
                <p className="font-montserrat">{car.description}</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/kontakt" className="vintage-button">
                Mám zájem
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/prodej" className="vintage-button">
            Zpět na nabídku
          </Link>

          <div className="flex space-x-4">
            <Link href="/kontakt" className="vintage-button">
              KONTAKT
            </Link>
            <Link href="tel:+420123456789" className="vintage-button">
              tel
            </Link>
            <Link href="mailto:info@veteranmotors.cz" className="vintage-button">
              email
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
