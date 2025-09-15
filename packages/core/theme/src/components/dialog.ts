import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const dialog = tv({
  slots: {
    wrapper: [],
    backdrop: [],
    content: ['absolute inset-0 overflow-hidden m-auto w-full max-w-[90%] h-fit rounded-3xl bg-white shadow-sm'],
    header: ['p-3 text-center text-lg font-semibold'],
    body: ['px-4 pt-2 pb-4 text-zinc-500'],
    footer: ['p-0 h-12 border-t-2 border-t-solid border-t-zinc-100'],
    actionGroup: ['h-full'],
    actionButton: ['h-full first:rounded-tl-none first:rounded-bl-3xl', 'last:rounded-tr-none last:rounded-br-3xl'],
  },
  variants: {
    isOpen: {
      true: {
        backdrop: 'animate-fade-in',
        content: 'animate-dialog-in',
      },
      false: {
        backdrop: 'animate-fade-out',
        content: 'animate-dialog-out',
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
