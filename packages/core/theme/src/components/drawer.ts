import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const drawer = tv({
  slots: {
    wrapper: ['fixed inset-0 z-[1000]'],
    backdrop: ['fixed inset-0 z-[1000]'],
    content: [
      'fixed z-[1000] bg-white shadow-lg flex flex-col',
    ],
    header: ['p-3 text-center text-lg font-semibold'],
    body: ['px-4 py-3 flex-1'],
    footer: ['px-3 pt-2 pb-safe'],
  },
  variants: {
    isOpen: {
      true: {},
      false: {},
    },
    placement: {
      left: {
        header: 'text-right',
        content: 'inset-y-0 left-0 right-auto h-full max-w-[90%] w-fit rounded-r-3xl',
        footer: '',
      },
      right: {
        header: 'text-left',
        content: 'inset-y-0 right-0 left-auto h-full max-w-[90%] w-fit rounded-l-3xl',
        footer: '',
      },
      top: {
        content: 'inset-x-0 top-0 bottom-autow-full h-fit rounded-b-3xl',
        footer: '',
      },
      bottom: {
        content: 'inset-x-0 bottom-0 top-auto w-full h-fit rounded-t-3xl',
        footer: '',
      },
    },
    backdrop: {
      transparent: { backdrop: 'bg-transparent' },
      opaque: { backdrop: 'bg-zinc-900/25' },
      blur: { backdrop: 'bg-zinc-900/25 backdrop-blur-sm' },
    },
    hasCustomNavigation: {
      true: {
        header: '',
      },
      false: {
        header: '',
      },
    },
  },
  compoundVariants: [
    // Safe area
    {
      hasCustomNavigation: true,
      placement: 'top',
      class: { header: 'pt-safe-3' },
    },
    // right
    {
      isOpen: true,
      placement: 'right',
      class: { content: 'animate-drawer-from-right-in' },
    },
    {
      isOpen: false,
      placement: 'right',
      class: { content: 'animate-drawer-from-right-out' },
    },
    // left
    {
      isOpen: true,
      placement: 'left',
      class: { content: 'animate-drawer-from-left-in' },
    },
    {
      isOpen: false,
      placement: 'left',
      class: { content: 'animate-drawer-from-left-out' },
    },
    // top
    {
      isOpen: true,
      placement: 'top',
      class: { content: 'animate-drawer-from-top-in' },
    },
    {
      isOpen: false,
      placement: 'top',
      class: { content: 'animate-drawer-from-top-out' },
    },
    // bottom
    {
      isOpen: true,
      placement: 'bottom',
      class: { content: 'animate-drawer-from-bottom-in' },
    },
    {
      isOpen: false,
      placement: 'bottom',
      class: { content: 'animate-drawer-from-bottom-out' },
    },
  ],
  defaultVariants: {
    placement: 'bottom',
    backdrop: 'opaque',
  },
})

export type DrawerVariantProps = VariantProps<typeof drawer>
export type DrawerSlots = keyof ReturnType<typeof drawer>
