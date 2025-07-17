import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const button = tv({
  base: [
    'relative inline-flex items-center justify-center',
    'gap-2 mx-0',
    'font-semibold',
    'transition-all duration-200 ease-out',
    'border border-solid after:border-none after:content-none',
    'outline-none',
  ],
  variants: {
    color: {
      default: 'bg-gray-100 border-gray-200 text-black',
      primary: 'bg-primary border-primary text-white',
      success: 'bg-success border-success text-white',
      warning: 'bg-warning border-warning text-white',
      danger: 'bg-danger border-danger text-white',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border-4',
      flat: 'border-none bg-slate-50',
      text: 'bg-transparent border-none',
    },
    size: {
      xs: 'h-6 px-2 text-xs rounded-md',
      sm: 'h-8 px-3 text-sm rounded-lg',
      md: 'h-10 px-4 text-base rounded-xl',
      lg: 'h-12 px-6 text-lg rounded-2xl',
    },
    isLoading: {
      true: 'opacity-50',
      false: '',
      auto: 'opacity',
    },
    isDisabled: {
      true: 'opacity-50',
      false: '',
    },
    isBlock: {
      true: 'w-full',
    },
    isInGroup: {
      true: 'rounded-none',
    },
    isIcon: {
      true: 'p-0',
    },
  },
  compoundVariants: [
    {
      variant: ['outline', 'flat', 'text'],
      color: 'primary',
      class: 'text-primary-500',
    },
    {
      variant: ['outline', 'flat', 'text'],
      color: 'success',
      class: 'text-success-500',
    },
    {
      variant: ['outline', 'flat', 'text'],
      color: 'warning',
      class: 'text-warning-500',
    },
    {
      variant: ['outline', 'flat', 'text'],
      color: 'danger',
      class: 'text-danger-500',
    },
    {
      variant: 'flat',
      color: 'default',
      class: 'bg-slate-50',
    },
    {
      variant: 'flat',
      color: 'primary',
      class: 'bg-primary-50',
    },
    {
      variant: 'flat',
      color: 'success',
      class: 'bg-success-50',
    },
    {
      variant: 'flat',
      color: 'warning',
      class: 'bg-warning-50',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger-50',
    },
    // isIcon state
    {
      isIcon: true,
      size: 'xs',
      class: 'min-w-6 w-6 h-6',
    },
    {
      isIcon: true,
      size: 'sm',
      class: 'min-w-8 w-8 h-8',
    },
    {
      isIcon: true,
      size: 'md',
      class: 'min-w-10 w-10 h-10',
    },
    {
      isIcon: true,
      size: 'lg',
      class: 'min-w-12 w-12 h-12',
    },
    // isInGroup state
    {
      isInGroup: true,
      size: 'xs',
      class: 'first:rounded-l-md last:rounded-r-md',
    },
    {
      isInGroup: true,
      size: 'sm',
      class: 'first:rounded-l-lg last:rounded-r-lg',
    },
    {
      isInGroup: true,
      size: 'md',
      class: 'first:rounded-l-xl last:rounded-r-xl',
    },
    {
      isInGroup: true,
      size: 'lg',
      class: 'first:rounded-l-2xl last:rounded-r-2xl',
    },
    // ? Important because native inject color in disabled state
    {
      isDisabled: true,
      color: ['primary', 'success', 'warning', 'danger'],
      variant: 'solid',
      class: '!text-white',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'default',
    variant: 'solid',
    isBlock: false,
    isDisabled: false,
    isInGroup: false,
    isLoading: false,
    isIcon: false,
  },
})

export type ButtonVariantProps = VariantProps<typeof button>

export const buttonHover = tv({
  base: 'scale-95',
  variants: {
    color: {
      default: 'bg-gray-200',
      primary: 'bg-primary-600',
      success: 'bg-success-600',
      warning: 'bg-warning-600',
      danger: 'bg-danger-600',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent',
      flat: 'border-none',
      text: 'border-none bg-transparent',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      color: 'primary',
      class: 'text-primary-600',
    },
    {
      variant: 'outline',
      color: 'success',
      class: 'text-success-600',
    },
    {
      variant: 'outline',
      color: 'warning',
      class: 'text-warning-600',
    },
    {
      variant: 'outline',
      color: 'danger',
      class: 'text-danger-600',
    },
    {
      variant: 'flat',
      color: 'primary',
      class: 'bg-primary-100 text-primary-600',
    },
    {
      variant: 'flat',
      color: 'success',
      class: 'bg-success-100 text-success-600',
    },
    {
      variant: 'flat',
      color: 'warning',
      class: 'bg-warning-100 text-warning-600',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger-100 text-danger-600',
    },
    {
      variant: 'text',
      color: 'primary',
      class: 'text-primary-600',
    },
    {
      variant: 'text',
      color: 'success',
      class: 'text-success-600',
    },
    {
      variant: 'text',
      color: 'warning',
      class: 'text-warning-600',
    },
    {
      variant: 'text',
      color: 'danger',
      class: 'text-danger-600',
    },
  ],
  defaultVariants: {
    color: 'default',
    variant: 'solid',
    isLoading: 'auto',
  },
})

export type ButtonHoverVariantProps = VariantProps<typeof buttonHover>
