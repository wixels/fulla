import type { BaseCompProps } from '@/types'
import { cva, VariantProps } from 'class-variance-authority'

const paragraphVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs lg:text-sm xl:text-base',
      md: 'text-sm lg:text-base xl:text-lg',
      lg: 'text-base lg:text-lg xl:text-xl',
    },
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    BaseCompProps,
    VariantProps<typeof paragraphVariants> {}

const Paragraph: React.FC<ParagraphProps> = ({ children, size, className, clamp, ...rest }) => {
  return (
    <p {...rest} className={paragraphVariants({ className, size, clamp })}>
      {children}
    </p>
  )
}

Paragraph.displayName = 'Paragraph'
export { Paragraph, paragraphVariants }
