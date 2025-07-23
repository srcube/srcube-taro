import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const checkbox = tv({
  slots: {
    wrapper: 'relative inline-flex items-center cursor-pointer select-none',
    checkbox: [
      'relative flex-shrink-0 flex items-center justify-center mr-2 size-6 bg-transparent',
      'before:absolute before:inset-0 before:border-4 before:border-gray-300',
      'after:absolute after:inset-0 after:z-0 after:size-full after:transition after:duration-300',
    ],
    spinner: 'z-10',
    iconWrapper: 'flex items-center justify-center z-10 transition duration-300',
    iconDefault: 'icon-check w-[inherit] h-[inherit]',
    iconIndeterminate: 'icon-indeterminate w-[inherit] h-[inherit]',
    content: 'relative',
    nCheckbox: 'absolute invisible w-full',
  },
  variants: {
    color: {
      default: {
        checkbox: 'after:bg-gray-300',
      },
      primary: {
        checkbox: 'after:bg-primary',
      },
      success: {
        checkbox: 'after:bg-success',
      },
      warning: {
        checkbox: 'after:bg-warning',
      },
      danger: {
        checkbox: 'after:bg-danger',
      },
    },
    size: {
      xs: {
        checkbox: 'size-4',
        iconWrapper: 'size-2.5',
        content: 'text-xs',
      },
      sm: {
        checkbox: 'size-5',
        iconWrapper: 'size-3',
        content: 'text-sm',
      },
      md: {
        checkbox: 'size-6',
        iconWrapper: 'size-4',
        content: 'text-base',
      },
      lg: {
        checkbox: 'size-7',
        iconWrapper: 'size-5',
        content: 'text-lg',
      },
    },
    radius: {
      none: {
        checkbox: 'before:rounded-none after:rounded-none',
      },
      xs: {
        checkbox: 'before:rounded-[0.35rem] after:rounded-[0.35rem]',
      },
      sm: {
        checkbox: 'before:rounded-[0.5rem] after:rounded-[0.5rem]',
      },
      md: {
        checkbox: 'before:rounded-[0.6rem] after:rounded-[0.6rem]',
      },
      lg: {
        checkbox: 'before:rounded-[0.65rem] after:rounded-[0.65rem]',
      },
      full: {
        checkbox: 'before:rounded-full after:rounded-full',
      },
    },
    isSelected: {
      true: {
        wrapper: '',
        iconWrapper: 'display-block opacity-100 delay-200',
        checkbox: ['', 'after:opacity-1 after:scale-100'],
      },
      false: {
        wrapper: '',
        iconWrapper: 'display-none opacity-0 duration-0',
        checkbox: ['', 'after:opacity-0 after:scale-50'],
      },
    },
    isIndeterminate: {
      true: {
        wrapper: '',
        iconWrapper: 'display-block opacity-100 delay-200',
        checkbox: ['', 'after:opacity-1 after:scale-100'],
      },
      false: {
      },
    },
    isReadOnly: {
      true: {},
      false: {},
    },
    isDisabled: {
      true: {
        wrapper: 'opacity-50 cursor-not-allowed',
      },
    },
    isLoading: {
      auto: {},
      true: {},
      false: {},
    },
    isLineThrough: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      color: ['primary', 'success', 'warning', 'danger'],
      class: {
        spinner: 'text-white',
        iconWrapper: 'text-white',
      },
    },
    {
      isLoading: true,
      isSelected: false,
      class: {
        checkbox: 'before:border-gray-500',
        spinner: 'opacity-20 text-black',
        iconWrapper: 'display-none opacity-20 text-black',
      },
    },
    // Indeterminate
    {
      isIndeterminate: true,
      isDisabled: true,
      class: {
      },
    },
    // Line through
    {
      isLineThrough: true,
      isSelected: true,
      class: {
        content: [
          'before:absolute before:top-1/2 before:h-0.5 before:w-full before:bg-current before:transition before:duration-300',
          'text-black/75',
        ],
      },
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
    radius: 'md',
    isSelected: false,
    isIndeterminate: false,
    isDisabled: false,
    isLineThrough: false,
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkbox>
export type CheckboxSlots = keyof ReturnType<typeof checkbox>
