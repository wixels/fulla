"use client"

import { VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { ArrowRight, Circle, Loader2, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  pending: boolean
  icon: "Plus" | "ArrowRight"
}
export const LoaderButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  rounded,
  size,
  icon = "ArrowRight",
  pending,
  ...props
}) => {
  const IconRenderer: React.FC<{ iconName: string }> = ({ iconName }) => {
    const iconMapping: { [key: string]: React.ComponentType<any> } = {
      Plus: Plus,
      ArrowRight: ArrowRight,
    }

    const IconComponent = iconMapping[iconName]

    if (!IconComponent) {
      return <Circle className="ml-2 h-3 w-3" />
    }

    return <IconComponent className="ml-2 h-3 w-3" />
  }
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, rounded, size, className }))}
    >
      {children}
      <motion.div
        animate={
          pending
            ? { y: 0, opacity: 1 }
            : { y: "100%", opacity: 0, display: "none" }
        }
      >
        <Loader2 className="ml-2 h-3 w-3 animate-spin" />
      </motion.div>
      <motion.div
        animate={
          !pending
            ? { y: 0, opacity: 1 }
            : { y: "-100%", opacity: 0, display: "none" }
        }
      >
        <IconRenderer iconName={icon} />
      </motion.div>
    </button>
  )
}
