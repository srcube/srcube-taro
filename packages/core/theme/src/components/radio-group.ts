import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const radioGroup = tv({
  base: 'flex gap-2',
  variants: {
    isBlock: {
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
    isBlock: false,
    isDisabled: false,
    isReadOnly: false,
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroup>
