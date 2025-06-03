"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type CyberpunkButtonVariant = "primary" | "secondary" | "accent" | "outline"
export type CyberpunkButtonSize = "sm" | "md" | "lg"

interface CyberpunkButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: CyberpunkButtonVariant
  size?: CyberpunkButtonSize
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  animated?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function CyberpunkButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  icon = <ChevronRight size={18} />,
  iconPosition = "right",
  animated = true,
  disabled = false,
  type = "button",
}: CyberpunkButtonProps) {
  // Use existing NFS button classes
  const variantClasses = {
    primary: "nfs-button-primary",
    secondary: "nfs-button-secondary",
    accent: "nfs-button-accent",
    outline: "nfs-button-outline",
  }

  // Size adjustments
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "", // Default size from CSS
    lg: "text-xl px-10 py-5",
  }

  const buttonClasses = cn(
    variantClasses[variant],
    sizeClasses[size],
    {
      "w-full": fullWidth,
      "opacity-60 cursor-not-allowed": disabled,
    },
    className,
  )

  // Content with icon
  const content = (
    <>
      {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
      {children}
      {iconPosition === "right" && icon && (
        <span className={`ml-2 ${animated ? "group-hover:translate-x-1 transition-transform duration-200" : ""}`}>
          {icon}
        </span>
      )}
    </>
  )

  // Render as Link or button
  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    )
  }

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      whileHover={animated && !disabled ? { scale: 1.03 } : {}}
      whileTap={animated && !disabled ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  )
}
