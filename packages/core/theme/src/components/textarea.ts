import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const textarea = tv({
  slots: {
    wrapper: [
      'relative inline-flex items-start gap-3',
      'px-3',
      'w-full min-w-0',
      'transition-all duration-200 ease-out',
      'outline-none',
    ],
    textarea: ['w-full max-h-24', 'bg-transparent', 'border-none outline-none resize-none'],
    clearButton: 'flex-shrink-0 flex items-center justify-center h-full opacity-70 active:opacity-100',
    iInputClear: 'icon-input-clear',
  },
  variants: {
    size: {
      xs: {
        wrapper: 'px-2 py-1 rounded-md',
        textarea: 'max-h-16 text-xs',
        clearButton: 'text-xs',
        startContent: 'text-xs',
        endContent: 'text-xs',
      },
      sm: {
        wrapper: 'px-3 py-1.5 rounded-lg',
        textarea: 'max-h-20 text-sm',
        clearButton: 'text-sm',
        startContent: 'text-sm',
        endContent: 'text-sm',
      },
      md: {
        wrapper: 'px-4 py-2 rounded-xl',
        textarea: 'max-h-24 text-base',
        clearButton: 'text-base',
        startContent: 'text-base',
        endContent: 'text-base',
      },
      lg: {
        wrapper: 'px-5 py-3 rounded-2xl',
        textarea: 'max-h-28 text-lg',
        clearButton: 'text-lg',
        startContent: 'text-lg',
        endContent: 'text-lg',
      },
    },
    color: {
      default: {
        wrapper: 'bg-slate-50',
      },
      primary: {
        wrapper: 'bg-primary-50 text-primary',
      },
      success: {
        wrapper: 'bg-success-50 text-success',
      },
      warning: {
        wrapper: 'bg-warning-50 text-warning',
      },
      danger: {
        wrapper: 'bg-danger-50 text-danger',
      },
    },
    isDisabled: {
      true: {
        wrapper: ['relative cursor-not-allowed overflow-hidden', 'before:content-[""] before:absolute before:inset-0 before:bg-black/[0.02] before:z-0'],
        textarea: 'cursor-not-allowed',
      },
      false: {},
    },
    isClearable: {
      true: {
        clearButton: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
})

export type TextareaVariantProps = VariantProps<typeof textarea>
export type TextareaSlots = keyof ReturnType<typeof textarea>
