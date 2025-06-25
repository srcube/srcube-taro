import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const dialog = tv({
  slots: {
    wrapper: ['absolute'],
    backdrop: ['absolute inset-0'],
    content: ['absolute inset-0 overflow-hidden m-auto w-full max-w-[90%] h-fit rounded-3xl bg-white shadow-sm'],
    header: ['text-center text-lg font-semibold'],
    body: ['pb-4 text-zinc-500'],
    footer: ['p-0 border-t-2 border-t-solid border-t-zinc-200'],
    actionButton: ['first:rounded-tl-none first:rounded-bl-3xl', 'last:rounded-tr-none last:rounded-br-3xl'],
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
    isConfirmOnly: {
      true: {
        actionButton: ['rounded-b-3xl'],
      },
    },
  },
  compoundVariants: [
  ],
  defaultVariants: {
  },
})

export type DialogVariantProps = VariantProps<typeof dialog>
export type DialogSlots = keyof ReturnType<typeof dialog>
