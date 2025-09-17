import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const radio = tv({
  slots: {
    wrapper: 'relative flex gap-2',
    radio: [
      'relative flex-shrink-0 flex items-center justify-center size-6 bg-transparent cursor-pointer',
      'before:absolute before:inset-0 before:border-4 before:border-gray-300 before:rounded-full',
      'after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-0 after:size-4 after:rounded-full after:transition after:duration-300',
    ],
    spinner: 'z-10',
    iconWrapper: 'flex items-center justify-center z-10 transition duration-300',
    iconDefault: 'size-4 rounded-full',
    content: 'relative',
    nRadio: 'absolute invisible w-full',
  },
  variants: {
    color: {
      default: {
        radio: 'after:bg-gray-300',
        iconWrapper: 'text-gray-300',
      },
      primary: {
        radio: 'after:bg-primary',
        iconWrapper: 'text-primary',
      },
      success: {
        radio: 'after:bg-success',
        iconWrapper: 'text-success',
      },
      warning: {
        radio: 'after:bg-warning',
        iconWrapper: 'text-warning',
      },
      danger: {
        radio: 'after:bg-danger',
        iconWrapper: 'text-danger',
      },
    },
    size: {
      xs: {
        radio: ['size-4', 'after:size-1.5'],
        iconWrapper: 'size-2',
        content: 'text-xs',
      },
      sm: {
        radio: ['size-5', 'after:size-2'],
        iconWrapper: 'size-2.5',
        content: 'text-sm',
      },
      md: {
        radio: ['size-6', 'after:size-2.5'],
        iconWrapper: 'size-3',
        content: 'text-base',
      },
      lg: {
        radio: ['size-7', 'after:size-3.5'],
        iconWrapper: 'size-4',
        content: 'text-lg',
      },
    },
    orientation: {
      horizontal: {
        wrapper: '',
      },
      vertical: {
        wrapper: '',
      },
    },
    isSelected: {
      true: {
        iconWrapper: 'display-block opacity-100 delay-200',
        radio: ['', 'after:opacity-100 after:scale-100'],
      },
      false: {
        iconWrapper: 'display-none opacity-0 duration-0',
        radio: ['', 'after:opacity-0 after:scale-0'],
      },
    },
    isReadOnly: {
      true: {
        wrapper: 'cursor-default',
      },
      false: {},
    },
    isDisabled: {
      true: {
        wrapper: 'opacity-50 cursor-not-allowed',
        radio: 'cursor-not-allowed',
      },
      false: {},
    },
    isLoading: {
      true: {
        wrapper: 'cursor-wait',
      },
      false: {},
    },
    hasIcon: {
      true: {
        radio: 'after:bg-transparent',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      color: ['primary', 'success', 'warning', 'danger'],
      class: {
        spinner: 'text-white',
        iconWrapper: '',
      },
    },
    {
      isLoading: true,
      isSelected: false,
      class: {
        radio: 'before:border-gray-500',
        spinner: 'opacity-20 text-black',
        iconWrapper: 'display-none opacity-20 text-black',
      },
    },
    {
      isSelected: true,
      color: 'default',
      class: {
        radio: 'before:border-gray-300',
      },
    },
    {
      isSelected: true,
      color: 'primary',
      class: {
        radio: 'before:border-primary',
      },
    },
    {
      isSelected: true,
      color: 'success',
      class: {
        radio: 'before:border-success',
      },
    },
    {
      isSelected: true,
      color: 'warning',
      class: {
        radio: 'before:border-warning',
      },
    },
    {
      isSelected: true,
      color: 'danger',
      class: {
        radio: 'before:border-danger',
      },
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
    orientation: 'vertical',
    isSelected: false,
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
  },
})

export type RadioVariantProps = VariantProps<typeof radio>
export type RadioSlots = keyof ReturnType<typeof radio>
