import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const modal = tv({
  slots: {
    'rootPortal': '',
    'backdrop': 'fixed inset-0 z-[1000]',
    'content': ['fixed inset-0 z-[1000] overflow-hidden flex flex-col h-fit bg-white'],
    'header': [''],
    'body': [''],
    'footer': [''],
  },
  variants: {
    isOpen: {
      true: {
        backdrop: 'animate-fade-in',
        content: 'animate-modal-in',
      },
      false: {
        backdrop: 'animate-fade-out',
        content: 'animate-modal-out',
      },
    },
    backdrop: {
      transparent: {
        backdrop: 'bg-transparent',
      },
      opaque: {
        backdrop: 'bg-zinc-900/25',
      },
      blur: {
        backdrop: 'bg-zinc-900/25 backdrop-blur-sm',
      },
    },
  },
  compoundVariants: [
  ],
  defaultVariants: {
    backdrop: 'opaque',
  },
})

export type ModalVariantProps = VariantProps<typeof modal>
export type ModalSlots = keyof ReturnType<typeof modal>
