import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const checkboxGroup = tv({
  base: 'flex gap-2',
  variants: {
    isBlock: {
      true: 'w-full',
    },
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    isBlock: false,
  },
})

export type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroup>
