import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

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
