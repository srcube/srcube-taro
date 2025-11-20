import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const spinner = tv({
  slots: {
    wrapper: 'relative flex flex-col items-center justify-center gap-2',
    iSpinner: 'icon-spinner size-4',
    label: 'text-base',
  },
  variants: {
    size: {
      xs: {
        icon: 'size-2',
        label: 'text-xs',
      },
      sm: {
        icon: 'size-3',
        label: 'text-sm',
      },
      md: {
        icon: 'size-4',
        label: 'text-base',
      },
      lg: {
        icon: 'size-6',
        label: 'text-lg',
      },
    },
    color: {
      current: {
        icon: 'text-current',
        label: 'text-current',
      },
      default: {
        icon: 'text-gray-400',
        label: 'text-gray-400',
      },
      primary: {
        icon: 'text-primary-500',
        label: 'text-primary-500',
      },
      success: {
        icon: 'text-success-500',
        label: 'text-success-500',
      },
      warning: {
        icon: 'text-warning-500',
        label: 'text-warning-500',
      },
      danger: {
        icon: 'text-danger-500',
        label: 'text-danger-500',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
})

export type SpinnerVariantProps = VariantProps<typeof spinner>
export type SpinnerSlots = keyof ReturnType<typeof spinner>
