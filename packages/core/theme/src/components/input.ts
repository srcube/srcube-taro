import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const input = tv({
  base: ['w-full h-full', 'bg-transparent', 'border-none', 'outline-none'],
})

export type InputVariantProps = VariantProps<typeof input>
