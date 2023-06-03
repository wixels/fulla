import { BaseCompProps } from '@/types'
import { cva, VariantProps } from 'class-variance-authority'

const titleVariants = cva('', {
  variants: {
    level: {
      1: 'text-4xl lg:text-5xl xl:text-6xl my-7 lg:my-8 xl:my-9',
      2: 'text-3xl lg:text-4xl xl:text-5xl my-6 lg:my-7 xl:my-8',
      3: 'text-2xl lg:text-3xl xl:text-4xl my-5 lg:my-6 xl:my-7',
      4: 'text-xl lg:text-2xl xl:text-3xl my-4 lg:my-5 xl:my-6',
      5: 'text-lg lg:text-xl xl:text-2xl my-3 lg:my-4 xl:my-5',
      6: 'text-base lg:text-lg xl:text-xl my-2 lg:my-3 xl:my-4',
    },
  },
  defaultVariants: {
    level: 1,
  },
})

export interface TitleProps extends BaseCompProps, VariantProps<typeof titleVariants> {
  balance?: number
  showAs?: 1 | 2 | 3 | 4 | 5 | 6
}

const Title: React.FC<TitleProps> = ({ children, level = 1, showAs, className, balance = 0, ...rest }) => {
  const Component: React.ElementType<any> = `h${level}` as React.ElementType
  const determinedLevel = showAs || level
  return (
    <Component className={titleVariants({ level: determinedLevel, className })} {...rest}>
      {children}
    </Component>
  )
}
Title.displayName = 'Title'

export { Title, titleVariants }
