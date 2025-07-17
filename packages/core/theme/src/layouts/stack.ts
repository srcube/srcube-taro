import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const stack = tv({
  base: 'flex',
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    spacing: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-5',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    spacing: 'md',
    align: 'stretch',
    justify: 'start',
  },
})

export type StackVariantsProps = VariantProps<typeof stack>
