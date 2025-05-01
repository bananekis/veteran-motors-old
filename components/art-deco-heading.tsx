import type React from "react"
interface ArtDecoHeadingProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export default function ArtDecoHeading({ children, className = "", centered = false }: ArtDecoHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-marcellus text-3xl md:text-4xl lg:text-5xl tracking-wide text-brown-dark">{children}</h2>
      <div className="art-deco-divider mt-4">
        <span>✦</span>
      </div>
    </div>
  )
}
