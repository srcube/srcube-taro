import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const field = tv({
  slots: {
    base: [
      'relative flex flex-col',
      'w-full min-w-0',
      'transition-all duration-200 ease-out',
      'outline-none',
    ],
    outsideWrapper: 'w-full',
    label: 'flex-shrink-0 text-black',
    control: 'flex items-center gap-2 w-full',
    controlWrapper: 'inline-flex items-center gap-2 w-full',
    input: 'flex items-center w-full h-full',
    helperWrapper: 'w-full mt-1 font-light',
    description: 'w-full text-slate-400',
    errorMessage: 'w-full text-danger',
    startContent: 'flex-shrink-0 flex items-center justify-center',
    endContent: 'flex-shrink-0 flex items-center justify-center',
    clearButton: 'flex-shrink-0 flex items-center justify-center h-full opacity-70 active:opacity-100',
    iClear: 'icon-clear size-4',
  },
  variants: {
    variant: {
      default: {
        controlWrapper: 'bg-slate-50',
      },
      twotone: {
        controlWrapper: 'border-2',
      },
      outline: {
        controlWrapper: 'border-2 border-slate-200 bg-transparent',
      },
      underline: {
        controlWrapper: 'border-b-2 border-slate-200 rounded-none',
      },
    },
    color: {
      default: {
        controlWrapper: 'bg-slate-50',
      },
      primary: {
        controlWrapper: 'bg-primary-50 text-primary',
      },
      secondary: {
        controlWrapper: 'bg-secondary-50 text-secondary',
      },
      success: {
        controlWrapper: 'bg-success-50 text-success',
      },
      warning: {
        controlWrapper: 'bg-warning-50 text-warning',
      },
      danger: {
        controlWrapper: 'bg-danger-50 text-danger',
      },
    },
    size: {
      xs: {
        controlWrapper: 'px-2 rounded-md text-xs',
        control: 'gap-2 h-6',
        helperWrapper: '',
        label: 'text-xs',
        description: 'text-xs',
        errorMessage: 'text-xs',
        startContent: 'text-xs',
        endContent: 'text-xs',
        clearButton: 'text-xs',
        iClear: 'size-2.5',
      },
      sm: {
        controlWrapper: 'px-3 rounded-lg text-sm',
        control: 'gap-2 h-8',
        helperWrapper: '',
        label: 'text-sm',
        description: 'text-xs',
        errorMessage: 'text-xs',
        startContent: 'text-sm',
        endContent: 'text-sm',
        clearButton: 'text-sm',
        iClear: 'size-3',
      },
      md: {
        controlWrapper: 'px-4 rounded-xl text-base',
        control: 'gap-2 h-10',
        helperWrapper: '',
        label: 'text-base',
        description: 'text-sm',
        errorMessage: 'text-sm',
        startContent: 'text-base',
        endContent: 'text-base',
        clearButton: 'text-base',
        iClear: 'size-4',
      },
      lg: {
        controlWrapper: 'px-5 rounded-2xl text-lg',
        control: 'gap-3 h-12',
        helperWrapper: '',
        label: 'text-lg',
        description: 'text-base',
        errorMessage: 'text-base',
        startContent: 'text-lg',
        endContent: 'text-lg',
        clearButton: 'text-lg',
        iClear: 'size-5',
      },
    },
    labelPlacement: {
      'outside': {
        base: 'flex-col gap-1.5',
        outsideWrapper: 'flex flex-col',
      },
      'outside-left': {
        base: 'flex-row items-center gap-2',
        outsideWrapper: 'flex flex-col',
      },
      'inside': {
        base: 'flex-col',
        controlWrapper: 'flex gap-4',
        outsideWrapper: 'flex flex-row',
      },
    },
    isDisabled: {
      true: {
        label: 'opacity-50',
        controlWrapper: [
          'relative cursor-not-allowed overflow-hidden',
          'before:content[\'\'] before:absolute before:inset-0 before:bg-black/[0.02] before:z-0',
        ],
        clearButton: 'invisible',
      },
    },
    isReadonly: {
      true: {
        controlWrapper: 'cursor-not-allowed',
      },
    },
    isInvalid: {
      true: {
        controlWrapper: 'ring-2 ring-danger-400',
      },
    },
    isFocused: {
      true: {},
    },
    isLoading: {
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
      class: { controlWrapper: 'rounded-none' },
    },
    {
      variant: ['outline', 'underline'],
      color: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      class: { controlWrapper: 'bg-transparent' },
    },
    // underline default
    {
      variant: ['underline'],
      color: 'primary',
      class: { controlWrapper: 'border-primary-100' },
    },
    {
      variant: ['underline'],
      color: 'secondary',
      class: { controlWrapper: 'border-secondary-100' },
    },
    {
      variant: ['underline'],
      color: 'success',
      class: { controlWrapper: 'border-success-100' },
    },
    {
      variant: ['underline'],
      color: 'warning',
      class: { controlWrapper: 'border-warning-100' },
    },
    {
      variant: ['underline'],
      color: 'danger',
      class: { controlWrapper: 'border-danger-100' },
    },
    // underline focused
    {
      variant: ['underline'],
      isFocused: true,
      color: 'default',
      class: { controlWrapper: 'border-slate-900' },
    },
    {
      variant: ['underline'],
      isFocused: true,
      color: 'primary',
      class: { controlWrapper: 'border-primary-500' },
    },
    {
      variant: ['underline'],
      isFocused: true,
      color: 'secondary',
      class: { controlWrapper: 'border-secondary-500' },
    },
    {
      variant: ['underline'],
      isFocused: true,
      color: 'success',
      class: { controlWrapper: 'border-success-500' },
    },
    {
      variant: ['underline'],
      isFocused: true,
      color: 'warning',
      class: { controlWrapper: 'border-warning-500' },
    },
    {
      variant: ['underline'],
      isFocused: true,
      color: 'danger',
      class: { controlWrapper: 'border-danger-500' },
    },
    // outline, twotone
    {
      variant: ['outline', 'twotone'],
      color: 'primary',
      class: { controlWrapper: 'border-primary-500' },
    },
    {
      variant: ['outline', 'twotone'],
      color: 'secondary',
      class: { controlWrapper: 'border-secondary-500' },
    },
    {
      variant: ['outline', 'twotone'],
      color: 'success',
      class: { controlWrapper: 'border-success-500' },
    },
    {
      variant: ['outline', 'twotone'],
      color: 'warning',
      class: { controlWrapper: 'border-warning-500' },
    },
    {
      variant: ['outline', 'twotone'],
      color: 'danger',
      class: { controlWrapper: 'border-danger-500' },
    },
    {
      isDisabled: true,
      color: 'default',
      class: { controlWrapper: 'text-black/40' },
    },
    {
      isDisabled: true,
      color: 'primary',
      class: { controlWrapper: 'text-primary/40' },
    },
    {
      isDisabled: true,
      color: 'secondary',
      class: { controlWrapper: 'text-secondary/40' },
    },
    {
      isDisabled: true,
      color: 'success',
      class: { controlWrapper: 'text-success/40' },
    },
    {
      isDisabled: true,
      color: 'warning',
      class: { controlWrapper: 'text-warning/40' },
    },
    {
      isDisabled: true,
      color: 'danger',
      class: { controlWrapper: 'text-danger/40' },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'default',
    color: 'default',
    labelPlacement: 'outside',
  },
})

export type FieldVariantProps = VariantProps<typeof field>
export type FieldSlots = keyof ReturnType<typeof field>
