import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const buttonGroup = tv({
  base: 'inline-flex items-center justify-center h-auto',
  variants: {
    isBlock: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    isBlock: false,
  },
})

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>
