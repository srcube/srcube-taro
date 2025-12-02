import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const checkboxGroup = tv({
  base: 'flex gap-2',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    fullWidth: false,
  },
})

export type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroup>
