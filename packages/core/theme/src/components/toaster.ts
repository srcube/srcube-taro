import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const toaster = tv({
  slots: {
    wrapper: [
      'absolute inset-0 flex items-center justify-center m-auto w-fit h-fit',
    ],
    stack: [],
  },
  variants: {
  },
  compoundVariants: [
  ],
  defaultVariants: {
  },
})

export const toast = tv({
  slots: {
    wrapper: [
      'absolute',
      'flex flex-col items-center justify-center gap-1',
      'm-2 p-4 w-40 min-h-40 border-box',
      'border-box rounded-2xl shadow-lg',
      'backdrop-blur-md',
      'animate-toast-from-center-in',
    ],
    icon: 'mb-1.5 text-5xl leading-[0]',
    title: 'font-medium text-center break-all',
    content: 'w-fit text-sm font-normal break-all',
    _icon: 'icon-info',
  },
  variants: {
    color: {
      light: {
        wrapper: 'bg-gray-100/80',
        content: 'text-black/80',
      },
      dark: {
        wrapper: 'bg-black/80',
        icon: 'text-white',
        title: 'text-white',
        content: 'text-white/80',
      },
      primary: {
        wrapper: 'bg-primary-50/80',
        icon: 'text-primary-500',
        title: 'text-primary-600',
      },
      secondary: {
        wrapper: 'bg-secondary-50/80',
        icon: 'text-secondary-500',
        title: 'text-secondary-600',
        _icon: 'icon-toast-secondary',
      },
      success: {
        wrapper: 'bg-success-50/80',
        icon: 'text-success-500',
        title: 'text-success-600',
        _icon: 'icon-toast-success',
      },
      warning: {
        wrapper: 'bg-warning-50/80',
        icon: 'text-warning-500',
        title: 'text-warning-600',
        _icon: 'icon-toast-warning',
      },
      danger: {
        wrapper: 'bg-danger-50/80',
        icon: 'text-danger-500',
        title: 'text-danger-600',
        _icon: 'icon-toast-danger',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
})

export type ToasterVariantProps = VariantProps<typeof toaster>
export type ToasterSlots = keyof ReturnType<typeof toaster>

export type ToastVariantProps = VariantProps<typeof toast>
export type ToastSlots = keyof ReturnType<typeof toast>
