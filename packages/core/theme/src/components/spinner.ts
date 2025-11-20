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
        iSpinner: 'size-2',
        label: 'text-xs',
      },
      sm: {
        iSpinner: 'size-3',
        label: 'text-sm',
      },
      md: {
        iSpinner: 'size-4',
        label: 'text-base',
      },
      lg: {
        iSpinner: 'size-6',
        label: 'text-lg',
      },
    },
    color: {
      current: {
        iSpinner: 'text-current',
        label: 'text-current',
      },
      default: {
        iSpinner: 'text-gray-400',
        label: 'text-gray-400',
      },
      primary: {
        iSpinner: 'text-primary-500',
        label: 'text-primary-500',
      },
      secondary: {
        iSpinner: 'text-secondary-500',
        label: 'text-secondary-500',
      },
      success: {
        iSpinner: 'text-success-500',
        label: 'text-success-500',
      },
      warning: {
        iSpinner: 'text-warning-500',
        label: 'text-warning-500',
      },
      danger: {
        iSpinner: 'text-danger-500',
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
