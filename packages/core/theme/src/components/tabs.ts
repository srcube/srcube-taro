import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const tabs = tv({
  slots: {
    base: 'flex w-full',
    tabsWrapper: 'inline-flex relative p-1 w-fit max-w-full overflow-hidden bg-gray-100',
    tabs: 'flex flex-grow relative w-full h-fit box-border',
    skeleton: 'first:rounded-l-md last:rounded-r-md',
    tab: 'relative inline-flex z-0 px-3 py-1 w-full justify-center items-center box-border cursor-pointer transition-opacity tap-highlight-transparent outline-none',
    tabContent: 'relative w-full z-10 whitespace-nowrap transition-colors text-default-500',
    cursor: 'absolute z-0 bg-white ',
    panel: 'py-3 px-1',
    maskStart: 'pointer-events-none absolute z-10',
    maskEnd: 'pointer-events-none absolute z-10',
  },
  variants: {
    variant: {
      solid: {
        tabs: 'bg-default-100',
        cursor: 'inset-0',
      },
      underlined: {
        tabsWrapper: 'bg-transparent',
        tab: 'h-full',
        cursor: '',
      },
      light: {
        tabsWrapper: 'bg-transparent',
        cursor: 'invisible',
      },
    },
    placement: {
      top: {
        base: 'flex-col',
      },
      start: {
        tabs: 'flex-col',
        panel: 'py-0 px-3',
        base: '',
      },
      end: {
        tabs: 'flex-col',
        panel: 'py-0 px-3',
        base: 'flex-row-reverse',
      },
      bottom: {
        base: 'flex-col-reverse',
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      xs: {
        tab: 'h-6 text-xs',
      },
      sm: {
        tab: 'h-7 text-sm',
      },
      md: {
        tab: 'h-8 text-base',
      },
      lg: {
        tab: 'h-9 text-lg',
      },
    },
    radius: {
      none: {
        tabsWrapper: 'rounded-none',
        skeleton: 'rounded-none',
        tab: 'rounded-none',
        cursor: 'rounded-none',
      },
      sm: {
        tabsWrapper: 'rounded-lg',
        skeleton: 'first:rounded-lg last:rounded-lg',
        tab: 'rounded-md',
        cursor: 'rounded-md',
      },
      md: {
        tabsWrapper: 'rounded-xl',
        skeleton: 'first:rounded-lg last:rounded-lg',
        tab: 'rounded-lg',
        cursor: 'rounded-lg',
      },
      lg: {
        tabsWrapper: 'rounded-2xl',
        skeleton: 'first:rounded-xl last:rounded-xl',
        tab: 'rounded-xl',
        cursor: 'rounded-xl',
      },
      full: {
        tabsWrapper: 'rounded-full',
        skeleton: 'rounded-full',
        tab: 'rounded-full',
        cursor: 'rounded-full',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
        tabsWrapper: 'w-full',
        tabs: '',
        tab: 'flex-1',
      },
      false: {
        tabs: '',
        tab: '',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 pointer-events-none',
        tab: 'cursor-not-allowed opacity-30 pointer-events-none',
      },
    },
    isVertical: {
      true: {
        tabs: 'flex-col h-full',
        maskStart: 'top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent',
        maskEnd: 'bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent',
      },
      false: {
        tabs: 'flex-row items-center',
        maskStart: 'left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent',
        maskEnd: 'right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent',
      },
    },
    isSelected: {
      true: {
        tabContent: 'font-medium',
      },
      false: {
        tabContent: 'text-gray-500',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'solid',
    placement: 'top',
    size: 'md',
    radius: 'md',
    fullWidth: false,
    isDisabled: false,
    isSelected: false,
  },
  compoundVariants: [
    // solid cursor
    {
      variant: 'solid',
      class: {
        cursor: 'inset-0',
      },
    },
    // underline cursor
    {
      variant: 'underlined',
      isVertical: false,
      class: {
        cursor: 'w-full h-0.5 top-auto bottom-0',
      },
    },
    {
      variant: 'underlined',
      isVertical: true,
      class: {
        cursor: 'h-full w-0.5',
      },
    },
    // solid / light variants
    {
      variant: ['solid', 'light'],
      color: 'default',
      class: {
        cursor: 'bg-background',
      },
    },
    {
      variant: ['solid', 'light'],
      color: 'primary',
      class: {
        cursor: 'bg-primary',
      },
    },
    {
      variant: ['solid', 'light'],
      color: 'secondary',
      class: {
        cursor: 'bg-secondary',
      },
    },
    {
      variant: ['solid', 'light'],
      color: 'success',
      class: {
        cursor: 'bg-success',
      },
    },
    {
      variant: ['solid', 'light'],
      color: 'warning',
      class: {
        cursor: 'bg-warning',
      },
    },
    {
      variant: ['solid', 'light'],
      color: 'danger',
      class: {
        cursor: 'bg-danger',
      },
    },
    // underlined variant
    {
      variant: 'underlined',
      placement: 'top',
      class: {
        cursor: 'bottom-0',
      },
    },
    {
      variant: 'underlined',
      placement: 'bottom',
      class: {
        cursor: 'top-0',
      },
    },
    {
      variant: 'underlined',
      placement: 'start',
      class: {
        cursor: 'right-0 w-0.5 ',
      },
    },
    {
      variant: 'underlined',
      placement: 'end',
      class: {
        cursor: 'left-0 w-0.5 ',
      },
    },
    {
      variant: 'underlined',
      color: 'default',
      class: {
        cursor: 'bg-black',
      },
    },
    {
      variant: 'underlined',
      color: 'primary',
      class: {
        cursor: 'bg-primary',
      },
    },
    {
      variant: 'underlined',
      color: 'secondary',
      class: {
        cursor: 'bg-secondary',
      },
    },
    {
      variant: 'underlined',
      color: 'success',
      class: {
        cursor: 'bg-success',
      },
    },
    {
      variant: 'underlined',
      color: 'warning',
      class: {
        cursor: 'bg-warning',
      },
    },
    {
      variant: 'underlined',
      color: 'danger',
      class: {
        cursor: 'bg-danger',
      },
    },
    // selected text colors (solid/light) per color
    {
      variant: ['solid', 'light'],
      color: 'default',
      isSelected: true,
      class: {
        tabContent: 'text-black',
        tab: 'bg-white ',
      },
    },
    {
      variant: ['solid', 'light'],
      color: ['primary', 'secondary', 'success', 'warning', 'danger'],
      isSelected: true,
      class: {
        tabContent: 'text-white',
      },
    },
    // selected text colors (underlined)
    {
      variant: ['underlined', 'light'],
      color: 'default',
      isSelected: true,
      class: {
        tabContent: 'text-black',
      },
    },
    {
      variant: ['underlined', 'light'],
      color: 'primary',
      isSelected: true,
      class: {
        tabContent: 'text-primary',
      },
    },
    {
      variant: ['underlined', 'light'],
      color: 'secondary',
      isSelected: true,
      class: {
        tabContent: 'text-secondary',
      },
    },
    {
      variant: ['underlined', 'light'],
      color: 'success',
      isSelected: true,
      class: {
        tabContent: 'text-success',
      },
    },
    {
      variant: ['underlined', 'light'],
      color: 'warning',
      isSelected: true,
      class: {
        tabContent: 'text-warning',
      },
    },
    {
      variant: ['underlined', 'light'],
      color: 'danger',
      isSelected: true,
      class: {
        tabContent: 'text-danger',
      },
    },
  ],
})

export type TabsVariantProps = VariantProps<typeof tabs>
export type TabsSlots = keyof ReturnType<typeof tabs>
export type TabsReturnType = ReturnType<typeof tabs>
