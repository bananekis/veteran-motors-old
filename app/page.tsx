
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import FeaturedCarsSection from "@/components/featured-cars-section"
import ShowcaseSection from "@/components/showcase-section"
import { cars } from "@/lib/data"

export default async function Home() {
  const featuredCars = cars.filter((car) => car.featured).slice(0, 6)

  return (
    <div className="home-page">
      <HeroSection />
      <ServicesSection />
      <FeaturedCarsSection cars={featuredCars} />
      <ShowcaseSection />
      <AboutSection />
    </div>
  )
}
