import { cn } from "@/lib/utils"

export interface ISectionProps {
  spacer?: "m" | "p"
  side?: "y" | "x" | "b" | "t" | "l" | "r"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
}

const sizeMap = {
  sm: {
    base: "5",
    lg: "10",
    xl: "20",
  },
  md: {
    base: "7",
    lg: "14",
    xl: "28",
  },
  lg: {
    base: "9",
    lg: "16",
    xl: "32",
  },
}

const generateClass = (
  spacer: ISectionProps["spacer"],
  side: ISectionProps["side"],
  size: ISectionProps["size"]
) => {
  return `${spacer}${side}-${sizeMap[size!].base} lg:${spacer}${side}-${
    sizeMap[size!].lg
  } xl:${spacer}${side}-${sizeMap[size!].xl}`
}

const Section: React.FC<ISectionProps> = ({
  spacer = "m",
  side = "y",
  size = "md",
  className,
  children,
}) => {
  return (
    <section className={cn(generateClass(spacer, side, size), className)}>
      {children}
    </section>
  )
}
Section.displayName = "Section"

export { Section, generateClass }
