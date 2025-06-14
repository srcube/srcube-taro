import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const modal = tv({
  slots: {
    wrapper: ['relative'],
    backdrop: ['absolute inset-0'],
    content: ['absolute inset-0 overflow-hidden m-auto w-full max-w-[90%] h-fit rounded-3xl bg-white shadow-sm'],
    header: ['px-3 py-3'],
    body: ['px-4 py-2'],
    footer: ['px-3 py-3 flex gap-2 justify-end'],
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
