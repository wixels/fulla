import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { rounded } from "@/lib/constants"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      rounded,
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      rounded: "full",
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, rounded, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, rounded }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

// import { cva, VariantProps } from 'class-variance-authority'
// import { cn } from '@/lib/utils'
// import { shadow, rounded } from '@/lib/constants'
// import * as React from 'react'
// import { BaseCompProps } from '@/types/componentType'

// const badgeVariants = cva('inline-flex w-fit items-center justify-center overflow-ellipsis', {
//   variants: {
//     shadow,
//     rounded,
//     variant: {
//       border: 'border border-solid',
//     },
//     color: {
//       blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-400',
//       dark: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 border-zinc-400',
//       red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-400',
//       green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-400',
//       yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-400',
//       indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-400',
//       purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-400',
//       pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 border-pink-400',
//     },
//     blur: {
//       xs: 'backdrop-blur-xs bg-opacity-10',
//       sm: 'backdrop-blur-sm bg-opacity-10',
//       md: 'backdrop-blur-md bg-opacity-10',
//       lg: 'backdrop-blur-lg bg-opacity-10',
//       xl: 'backdrop-blur-xl bg-opacity-10',
//     },
//     size: {
//       xs: 'tracking-wider font-semibold text-[9px] leading-4 h-4 px-2',
//       sm: 'tracking-wider font-semibold text-[10px] leading-[18px] h-[18px] px-3',
//       md: 'tracking-wider font-semibold text-[11px] leading-5 h-5 px-3',
//       lg: 'tracking-wider font-semibold text-[13px] leading-6 h-6 px-4',
//       xl: 'tracking-wider font-semibold text-[16px] leading-8 h-8 px-4',
//     },
//   },
//   defaultVariants: {
//     color: 'blue',
//     shadow: 'none',
//     rounded: 'md',
//     size: 'md',
//   },
// })

// export interface IBadgeProps extends BaseCompProps, VariantProps<typeof badgeVariants> {}

// const Badge: React.FC<IBadgeProps> = ({ children, color, variant, size, blur, shadow, rounded }) => {
//   return (
//     <div
//       className={badgeVariants({
//         variant,
//         color,
//         size,
//         blur,
//         shadow,
//         rounded,
//       })}
//     >
//       {React.Children.map(children, (child) => (
//         <span className={blur ? 'mix-blend-hard-light' : ''}>{child}</span>
//       ))}
//     </div>
//   )
// }
// Badge.displayName = 'Badge'

// export { Badge, badgeVariants }
