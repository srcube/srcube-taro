import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const toggle = tv({
  slots: {
    wrapper: 'relative inline-flex items-center cursor-pointer select-none',
    track: [
      'relative flex-shrink-0 flex items-center p-1 rounded-full transition-colors duration-200 ease-in-out',
      'bg-gray-200 border-2 border-transparent',
    ],
    thumb: [
      'absolute bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out',
      'transform translate-x-0 flex items-center justify-center',
    ],
    spinner: 'opacity-50',
    startContent: 'z-0 absolute left-1.5 text-tiny text-default-600 transition-opacity duration-200 ease-in-out',
    endContent: 'z-0 absolute right-1.5 text-tiny text-default-600 transition-opacity duration-200 ease-in-out',
    content: 'relative ml-2',
    nSwitch: 'absolute invisible w-full',
  },
  variants: {
    color: {
      default: {},
      primary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      xs: {
        track: 'w-8 h-5',
        thumb: 'w-3 h-3',
        content: 'text-xs',
      },
      sm: {
        track: 'w-10 h-6',
        thumb: 'w-4 h-4',
        content: 'text-sm',
      },
      md: {
        track: 'w-12 h-7',
        thumb: 'w-5 h-5',
        content: 'text-base',
      },
      lg: {
        track: 'w-14 h-8',
        thumb: 'w-6 h-6',
        content: 'text-lg',
      },
    },
    radius: {
      none: {
        track: 'rounded-none',
        thumb: 'rounded-none',
      },
      xs: {
        track: 'rounded-[0.25rem]',
        thumb: 'rounded-[0.15rem]',
      },
      sm: {
        track: 'rounded-[0.35rem]',
        thumb: 'rounded-[0.25rem]',
      },
      md: {
        track: 'rounded-[0.45rem]',
        thumb: 'rounded-[0.35rem]',
      },
      lg: {
        track: 'rounded-[0.6rem]',
        thumb: 'rounded-[0.5rem]',
      },
      full: {
        track: 'rounded-full',
        thumb: 'rounded-full',
      },
    },
    isSelected: {
      true: {
        thumb: 'translate-x-3',
      },
      false: {
        thumb: 'translate-x-0',
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
      },
      false: {},
    },
    isLoading: {
      true: {
        wrapper: 'opacity-50 cursor-wait',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      isSelected: true,
      class: {
        thumb: 'translate-x-3',
      },
    },
    {
      size: 'sm',
      isSelected: true,
      class: {
        thumb: 'translate-x-4',
      },
    },
    {
      size: 'md',
      isSelected: true,
      class: {
        thumb: 'translate-x-5',
      },
    },
    {
      size: 'lg',
      isSelected: true,
      class: {
        thumb: 'translate-x-6',
      },
    },
    {
      isDisabled: true,
      isSelected: true,
      class: {
        track: 'opacity-50',
      },
    },
    {
      isSelected: true,
      class: {
        startContent: 'opacity-100',
        endContent: 'opacity-0',
      },
    },
    {
      isSelected: false,
      class: {
        startContent: 'opacity-0',
        endContent: 'opacity-100',
      },
    },
    {
      color: 'default',
      isSelected: true,
      class: {
        track: 'bg-gray-300',
      },
    },
    {
      color: 'primary',
      isSelected: true,
      class: {
        track: 'bg-primary',
      },
    },
    {
      color: 'success',
      isSelected: true,
      class: {
        track: 'bg-success',
      },
    },
    {
      color: 'warning',
      isSelected: true,
      class: {
        track: 'bg-warning',
      },
    },
    {
      color: 'danger',
      isSelected: true,
      class: {
        track: 'bg-danger',
      },
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
    radius: 'full',
    isSelected: false,
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
  },
})

export type SwitchVariantProps = VariantProps<typeof toggle>
export type SwitchSlots = keyof ReturnType<typeof toggle>
