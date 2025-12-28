import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const inputOtp = tv({
  slots: {
    base: [
      'relative inline-flex items-center gap-1',
      'w-fit min-w-0',
      'transition-all duration-200 ease-out',
      'outline-none',
    ],
    // px-4 for hidden cursor
    hiddenInput: ['absolute inset-0 my-auto px-4 w-0 h-0 opacity-0 text-2xl'],
    box: ['flex items-center justify-center font-medium select-none'],
    cursor: ['w-0.5 h-[60%] rounded-sm', 'animate-blink-caret'],
    dot: ['bg-current rounded-[100%]'],
  },
  variants: {
    variant: {
      default: { box: '' },
      outline: { box: 'bg-transparent border-2 border-gray-300' },
      twotone: { box: 'bg-transparent border-2 border-gray-300' },
      underline: { box: 'bg-transparent border-b-4 border-gray-300 rounded-none' },
    },
    color: {
      default: { box: 'bg-slate-50', cursor: 'bg-slate-500' },
      primary: { box: 'bg-primary-50 text-primary', cursor: 'bg-primary' },
      secondary: { box: 'bg-secondary-50 text-secondary', cursor: 'bg-secondary' },
      success: { box: 'bg-success-50 text-success', cursor: 'bg-success' },
      warning: { box: 'bg-warning-50 text-warning', cursor: 'bg-warning' },
      danger: { box: 'bg-danger-50 text-danger', cursor: 'bg-danger' },
    },
    size: {
      xs: { box: 'h-6 w-6 rounded-md text-xs', dot: 'w-1 h-1' },
      sm: { box: 'h-8 w-8 rounded-lg text-sm', dot: 'w-1.5 h-1.5' },
      md: { box: 'h-10 w-10 rounded-xl text-base', dot: 'w-2 h-2' },
      lg: { box: 'h-12 w-12 rounded-2xl text-lg', dot: 'w-3 h-3' },
    },
    radius: {
      none: { box: 'rounded-none' },
      sm: { box: 'rounded-lg' },
      md: { box: 'rounded-xl' },
      lg: { box: 'rounded-2xl' },
      full: { box: 'rounded-full' },
    },
    isDisabled: {
      true: { box: 'cursor-not-allowed opacity-50' },
    },
    isReadOnly: {
      true: { box: 'cursor-not-allowed' },
    },
    isPassword: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: ['underline'],
      class: { box: 'rounded-none' },
    },
    {
      variant: ['outline', 'underline'],
      color: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      class: { box: 'bg-transparent' },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'primary',
      class: { box: 'border-primary-500' },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'secondary',
      class: { box: 'border-secondary-500' },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'success',
      class: { box: 'border-success-500' },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'warning',
      class: { box: 'border-warning-500' },
    },
    {
      variant: ['outline', 'twotone', 'underline'],
      color: 'danger',
      class: { box: 'border-danger-500' },
    },
    {
      isDisabled: true,
      color: 'default',
      class: { box: 'text-black/40' },
    },
    {
      isDisabled: true,
      color: 'primary',
      class: { box: 'text-primary/40' },
    },
    {
      isDisabled: true,
      color: 'secondary',
      class: { box: 'text-secondary/40' },
    },
    {
      isDisabled: true,
      color: 'success',
      class: { box: 'text-success/40' },
    },
    {
      isDisabled: true,
      color: 'warning',
      class: { box: 'text-warning/40' },
    },
    {
      isDisabled: true,
      color: 'danger',
      class: { box: 'text-danger/40' },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'default',
    variant: 'default',
  },
})

export type InputOtpVariantProps = VariantProps<typeof inputOtp>
export type InputOtpSlots = keyof ReturnType<typeof inputOtp>
