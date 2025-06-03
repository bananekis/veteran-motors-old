"use client"

import CarsGrid from "./cars-grid"
import type { Car } from "@/lib/types"

interface FeaturedCarsSectionProps {
  cars: Car[]
}

export default function FeaturedCarsSection({ cars }: FeaturedCarsSectionProps) {
  return (
    <CarsGrid
      title="VYBRANÉ VOZY"
      subtitle="Nejlepší vozy z naší nabídky"
      cars={cars}
      showViewAll={true}
      viewAllHref="/prodej"
      viewAllText="ZOBRAZIT VŠECHNY VOZY"
      backgroundImage="/cyberpunkimage-min.png"
      firstWordColor="text-nfs-cyan"
      restWordsColor="text-nfs-cyan"
    />
  )
}
