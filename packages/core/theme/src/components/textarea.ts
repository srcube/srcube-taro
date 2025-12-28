import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const textarea = tv({
  slots: {
    outsideWrapper: 'w-full',
    label: 'flex-shrink-0',
    controlWrapper: 'inline-flex w-full',
    control: 'flex items-start gap-2 w-full h-auto',
    input: 'flex items-start w-full',
    helperWrapper: 'w-full mt-1',
    description: 'w-full text-slate-400',
    errorMessage: 'w-full text-danger-500',
    startContent: 'flex-shrink-0 flex items-center justify-center',
    endContent: 'flex-shrink-0 flex items-center justify-center',
    clearButton: 'flex-shrink-0 flex items-center justify-center h-full opacity-70 active:opacity-100',
    iClear: 'icon-clear size-4',
  },
  variants: {
    variant: {
      default: { controlWrapper: 'bg-slate-50' },
      twotone: { controlWrapper: 'border-2' },
      outline: { controlWrapper: 'border-2 border-gray-200 bg-transparent' },
      underline: { controlWrapper: 'border-b-2 border-gray-200 rounded-none' },
    },
    color: {
      default: { controlWrapper: 'bg-slate-50' },
      primary: { controlWrapper: 'bg-primary-50 text-primary' },
      secondary: { controlWrapper: 'bg-secondary-50 text-secondary' },
      success: { controlWrapper: 'bg-success-50 text-success' },
      warning: { controlWrapper: 'bg-warning-50 text-warning' },
      danger: { controlWrapper: 'bg-danger-50 text-danger' },
    },
    size: {
      xs: {
        controlWrapper: 'px-2 rounded-md text-xs',
        control: 'gap-2 py-1',
        label: 'text-xs',
        description: 'text-xs',
        errorMessage: 'text-xs',
        clearButton: 'text-xs',
        iClear: 'size-2.5',
      },
      sm: {
        controlWrapper: 'px-3 rounded-lg text-sm',
        control: 'gap-2 py-1.5',
        label: 'text-sm',
        description: 'text-xs',
        errorMessage: 'text-xs',
        clearButton: 'text-sm',
        iClear: 'size-3',
      },
      md: {
        controlWrapper: 'px-4 rounded-xl text-base',
        control: 'gap-2 py-2',
        label: 'text-base',
        description: 'text-sm',
        errorMessage: 'text-sm',
        clearButton: 'text-base',
        iClear: 'size-4',
      },
      lg: {
        controlWrapper: 'px-5 rounded-2xl text-lg',
        control: 'gap-3 py-3',
        label: 'text-lg',
        description: 'text-base',
        errorMessage: 'text-base',
        clearButton: 'text-lg',
        iClear: 'size-5',
      },
    },
    labelPlacement: {
      'outside': { outsideWrapper: 'flex flex-col' },
      'outside-left': { outsideWrapper: 'flex flex-col' },
      'inside': { outsideWrapper: 'flex flex-row', controlWrapper: 'flex gap-2' },
    },
    isDisabled: {
      true: {
        label: 'opacity-50',
        controlWrapper: [
          'relative cursor-not-allowed overflow-hidden',
          'before:content[""] before:absolute before:inset-0 before:bg-black/[0.02] before:z-0',
        ],
        clearButton: 'invisible',
      },
    },
    isReadonly: { true: { controlWrapper: 'cursor-not-allowed' } },
    isInvalid: { true: { controlWrapper: 'ring-2 ring-danger-400' } },
    isClearable: { true: { clearButton: '' } },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    color: 'default',
    labelPlacement: 'outside',
  },
})

export type TextareaVariantProps = VariantProps<typeof textarea>
export type TextareaSlots = keyof ReturnType<typeof textarea>
