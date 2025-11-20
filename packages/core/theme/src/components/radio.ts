import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const radio = tv({
  slots: {
    wrapper: 'relative flex gap-2',
    radio: [
      'relative flex-shrink-0 flex items-center justify-center size-6 bg-transparent cursor-pointer',
      'before:absolute before:inset-0 before:border-4 before:border-gray-300 before:rounded-full',
    ],
    spinner: 'z-10',
    content: 'relative',
    iconWrapper: 'flex items-center justify-center z-10 transition duration-300',
    iDefault: 'size-3 rounded-full',
    nRadio: 'absolute invisible w-full',
  },
  variants: {
    color: {
      default: {
        iconWrapper: 'text-gray-300',
      },
      primary: {
        iconWrapper: 'text-primary',
      },
      success: {
        iconWrapper: 'text-success',
      },
      warning: {
        iconWrapper: 'text-warning',
      },
      danger: {
        iconWrapper: 'text-danger',
      },
    },
    size: {
      xs: {
        radio: ['size-4'],
        iconWrapper: 'size-2',
        content: 'text-xs',
        iDefault: 'size-2',
      },
      sm: {
        radio: ['size-5'],
        iconWrapper: 'size-2.5',
        content: 'text-sm',
        iDefault: 'size-2.5',
      },
      md: {
        radio: ['size-6'],
        iconWrapper: 'size-3',
        content: 'text-base',
        iDefault: 'size-3',
      },
      lg: {
        radio: ['size-7'],
        iconWrapper: 'size-4',
        content: 'text-lg',
        iDefault: 'size-4',
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
        // iconWrapper: 'display-block opacity-100 scale-100 delay-200',
      },
      false: {
        // iconWrapper: 'display-none opacity-0 scale-0 duration-0',
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
        // iconWrapper: 'display-block opacity-100 scale-100 delay-200',
      },
      false: {
        // iconWrapper: 'display-none opacity-0 scale-0 duration-0',
      },
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
      isSelected: true,
      isLoading: true,
      class: {
        iconWrapper: 'display-block opacity-100 scale-100 delay-200',
      },
    },
    {
      isSelected: false,
      isLoading: false,
      class: {
        iconWrapper: 'display-none opacity-0 scale-0 duration-0',
      },
    },
    {
      isLoading: true,
      isSelected: false,
      class: {
        radio: 'before:border-gray-500',
        spinner: 'opacity-20 text-black',
      },
    },
    {
      isSelected: true,
      color: 'default',
      class: {
        radio: 'before:border-gray-300',
        iDefault: 'bg-gray-300',
      },
    },
    {
      isSelected: true,
      color: 'primary',
      class: {
        radio: 'before:border-primary',
        iDefault: 'bg-primary',
      },
    },
    {
      isSelected: true,
      color: 'success',
      class: {
        radio: 'before:border-success',
        iDefault: 'bg-success',
      },
    },
    {
      isSelected: true,
      color: 'warning',
      class: {
        radio: 'before:border-warning',
        iDefault: 'bg-warning',
      },
    },
    {
      isSelected: true,
      color: 'danger',
      class: {
        radio: 'before:border-danger',
        iDefault: 'bg-danger',
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
