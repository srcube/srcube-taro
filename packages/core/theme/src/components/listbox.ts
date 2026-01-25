import type { ExcludePrivateSlotKeys, VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const listbox = tv({
  slots: {
    base: '',
    list: '',
    emptyContent: 'flex flex-col items-center justify-center size-full p-4 text-sm text-gray-300',
    _iEmpty: 'icon-box-open size-8',
  },
  variants: {
    orientation: {
      xy: {
        emptyContent: 'flex-col',
      },
      x: {
        emptyContent: 'flex-row items-center gap-3',
      },
      y: {
        emptyContent: 'flex-col items-center',
      },
    },
  },
})

export type ListboxVariantProps = VariantProps<typeof listbox>
export type ListboxSlots = ExcludePrivateSlotKeys<keyof ReturnType<typeof listbox>>
