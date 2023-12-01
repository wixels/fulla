import { VariantProps, cva } from "class-variance-authority"

const inputList = [
  "my-5 lg:my-10 xl:my-20",
  "my-7 lg:my-14 xl:my-28",
  "my-9 lg:my-16 xl:my-32",
  "mx-5 lg:mx-10 xl:mx-20",
  "mx-7 lg:mx-14 xl:mx-28",
  "mx-9 lg:mx-16 xl:mx-32",
  "mb-5 lg:mb-10 xl:mb-20",
  "mb-7 lg:mb-14 xl:mb-28",
  "mb-9 lg:mb-16 xl:mb-32",
  "mt-5 lg:mt-10 xl:mt-20",
  "mt-7 lg:mt-14 xl:mt-28",
  "mt-9 lg:mt-16 xl:mt-32",
  "ml-5 lg:ml-10 xl:ml-20",
  "ml-7 lg:ml-14 xl:ml-28",
  "ml-9 lg:ml-16 xl:ml-32",
  "mr-5 lg:mr-10 xl:mr-20",
  "mr-7 lg:mr-14 xl:mr-28",
  "mr-9 lg:mr-16 xl:mr-32",
  "py-5 lg:py-10 xl:py-20",
  "py-7 lg:py-14 xl:py-28",
  "py-9 lg:py-16 xl:py-32",
  "px-5 lg:px-10 xl:px-20",
  "px-7 lg:px-14 xl:px-28",
  "px-9 lg:px-16 xl:px-32",
  "pb-5 lg:pb-10 xl:pb-20",
  "pb-7 lg:pb-14 xl:pb-28",
  "pb-9 lg:pb-16 xl:pb-32",
  "pt-5 lg:pt-10 xl:pt-20",
  "pt-7 lg:pt-14 xl:pt-28",
  "pt-9 lg:pt-16 xl:pt-32",
  "pl-5 lg:pl-10 xl:pl-20",
  "pl-7 lg:pl-14 xl:pl-28",
  "pl-9 lg:pl-16 xl:pl-32",
  "pr-5 lg:pr-10 xl:pr-20",
  "pr-7 lg:pr-14 xl:pr-28",
  "pr-9 lg:pr-16 xl:pr-32",
]

const sectionVariants = cva("", {
  variants: {
    spacer: {
      m: "",
      p: "",
    },
    side: {
      x: "",
      y: "",
      t: "",
      b: "",
      l: "",
      r: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  // @ts-ignore
  compoundVariants: inputList.map((item) => {
    const sizeMap = {
      "5": "sm",
      "7": "md",
      "9": "lg",
      "10": "sm",
      "14": "md",
      "16": "lg",
      "20": "sm",
      "28": "md",
      "32": "lg",
    }
    const reference = item.split(" ")[0]
    const [spacerAndSide, size] = reference.split("-")
    const [spacer, side] = spacerAndSide.split("")

    //   @ts-ignore
    return { spacer, side, size: sizeMap[size], className: item }
  }),
  defaultVariants: {
    side: "y",
    size: "md",
    spacer: "m",
  },
})

export interface ISectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode
  className?: string
}

const Section: React.FC<ISectionProps> = ({
  side,
  className,
  size,
  spacer,
  children,
}) => {
  return (
    <section className={sectionVariants({ side, size, spacer, className })}>
      {children}
    </section>
  )
}
Section.displayName = "Section"

export { Section, sectionVariants }
