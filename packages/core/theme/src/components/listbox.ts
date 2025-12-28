import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const listbox = tv({
  slots: {
    base: '',
    list: '',
    emptyContent: '',
  },
})

export type ListboxVariantProps = VariantProps<typeof listbox>
export type ListboxSlots = keyof ReturnType<typeof listbox>
