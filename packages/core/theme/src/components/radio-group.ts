import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const radioGroup = tv({
  base: 'flex gap-2',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row gap-4',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: {},
    },
    isReadOnly: {
      true: 'cursor-default',
      false: {},
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    fullWidth: false,
    isDisabled: false,
    isReadOnly: false,
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroup>
