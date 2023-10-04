import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gridVariants = cva("grid grid-cols-12", {
  variants: {
    gap: {
      xs: "gap-1 md:gap-2 lg:gap-4 xl:gap-6",
      sm: "gap-2 md:gap-4 lg:gap-6 xl:gap-8",
      md: "gap-4 md:gap-6 lg:gap-8 xl:gap-10",
      lg: "gap-6 md:gap-8 lg:gap-10 xl:gap-12",
      xl: "gap-10 md:gap-12 lg:gap-12 xl:gap-14",
    },
  },
  defaultVariants: {
    gap: "md",
  },
})

export interface IGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid: React.FC<IGridProps> = ({ className, children, gap, ...rest }) => {
  return (
    <div {...rest} className={cn(gridVariants({ gap, className }))}>
      {children}
    </div>
  )
}
Grid.displayName = "Grid"

export { Grid, gridVariants }
