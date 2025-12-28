import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const skeleton = tv({
  slots: {
    base: 'relative inline-flex items-center',
    content: 'w-full transition-opacity duration-300',
    placeholder: 'absolute inset-0 rounded-md bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse',
  },
  variants: {
    radius: {
      none: { placeholder: 'rounded-none' },
      sm: { placeholder: 'rounded-lg' },
      md: { placeholder: 'rounded-xl' },
      lg: { placeholder: 'rounded-2xl' },
      full: { placeholder: 'rounded-full' },
    },
  },
  defaultVariants: {
    radius: 'md',
  },
})

export type SkeletonVariantProps = VariantProps<typeof skeleton>
export type SkeletonSlots = keyof ReturnType<typeof skeleton>
