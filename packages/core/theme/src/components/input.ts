import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const input = tv({
  slots: {
    base: [
      'relative inline-flex items-center gap-3',
      'px-3',
      'w-full min-w-0',
      'transition-all duration-200 ease-out',
      'outline-none',
    ],
    input: ['w-full h-full', 'bg-transparent', 'border-none outline-none'],
    clearButton: 'flex-shrink-0 flex items-center justify-center h-full opacity-70 active:opacity-100',
    startContent: 'flex-shrink-0 flex items-center justify-center',
    endContent: 'flex-shrink-0 flex items-center justify-center',
    iInputClear: 'icon-input-clear',
  },
  variants: {
    variant: {
      default: {
        base: 'bg-slate-50',
      },
      twotone: {
        base: 'border-2',
      },
      outline: {
        base: 'border-2 border-gray-200 bg-transparent',
      },
      underline: {
        base: 'border-b-2 border-gray-200 rounded-none',
      },
    },
    color: {
      default: {
        base: 'bg-slate-50',
        clearButton: '',
      },
      primary: {
        base: 'bg-primary-50 text-primary',
        // input: 'text-primary',
        // clearButton: 'text-primary'
      },
      secondary: {
        base: 'bg-secondary-50 text-secondary',
        // input: 'text-secondary',
        // clearButton: 'text-secondary'
      },
      success: {
        base: 'bg-success-50 text-success',
        // input: 'text-success',
        // clearButton: 'text-success'
      },
      warning: {
        base: 'bg-warning-50 text-warning',
        // input: 'text-warning',
        // clearButton: 'text-warning'
      },
      danger: {
        base: 'bg-danger-50 text-danger',
        // input: 'text-danger',
        // clearButton: 'text-danger'
      },
    },
    size: {
      xs: {
        base: 'px-2 h-6 rounded-md',
        input: 'text-xs',
        clearButton: 'text-xs',
        startContent: 'text-xs',
        endContent: 'text-xs',
      },
      sm: {
        base: 'px-3 h-8 rounded-lg',
        input: 'text-sm',
        clearButton: 'text-sm',
        startContent: 'text-sm',
        endContent: 'text-sm',
      },
      md: {
        base: 'px-4 h-10 rounded-xl',
        input: 'text-base',
        clearButton: 'text-base',
        startContent: 'text-base',
        endContent: 'text-base',
      },
      lg: {
        base: 'px-5 h-12 rounded-2xl',
        input: 'text-lg',
        clearButton: 'text-lg',
        startContent: 'text-lg',
        endContent: 'text-lg',
      },
    },
    isDisabled: {
      true: {
        base: ['relative cursor-not-allowed overflow-hidden', 'before:content-[\'\'] before:absolute before:inset-0 before:bg-black/[0.02] before:z-0'],
        input: 'cursor-not-allowed',
      },
    },
    isFocused: {
      true: {},
    },
    isAutoFocused: {
      true: {},
    },
    isClearable: {
      true: {
        clearButton: '',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'underline',
      class: {
        base: 'rounded-none',
      },
    },
    {
      variant: ['outline', 'underline'],
      color: ['default', 'primary', 'success', 'warning', 'danger'],
      class: {
        base: 'bg-transparent',
      },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'primary',
      class: {
        base: 'border-primary-500',
      },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'success',
      class: {
        base: 'border-success-500',
      },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'warning',
      class: {
        base: 'border-warning-500',
      },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'danger',
      class: {
        base: 'border-danger-500',
      },
    },
    {
      isDisabled: true,
      color: 'default',
      class: {
        base: 'text-black/40',
      },
    },
    {
      isDisabled: true,
      color: 'primary',
      class: {
        base: 'text-primary/40',
      },
    },
    {
      isDisabled: true,
      color: 'success',
      class: {
        base: 'text-success/40',
      },
    },
    {
      isDisabled: true,
      color: 'warning',
      class: {
        base: 'text-warning/40',
      },
    },
    {
      isDisabled: true,
      color: 'danger',
      class: {
        base: 'text-danger/40',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'default',
    color: 'default',
  },
})

export type InputVariantProps = VariantProps<typeof input>
export type InputSlots = keyof ReturnType<typeof input>
