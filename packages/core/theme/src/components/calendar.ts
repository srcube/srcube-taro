import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const calendar = tv({
  slots: {
    wrapper: 'flex flex-col w-full bg-white',
    header: 'flex items-center justify-between p-4 gap-4',
    content: 'relative flex-grow flex flex-col bg-gray-50 overflow-hidden',
    jumpTrigger: '',
    pickerTrigger: 'flex-1',
    pickerWrapper: ['absolute inset-0 flex py-4 z-20 bg-white overflow-hidden'],
    pickerContent: 'absolute flex h-56 w-full bg-white z-10 overflow-hidden',
    pickerIndicator: 'absolute top-1/2 -translate-y-1/2 w-full h-12 rounded-xl bg-gray-100 overflow-hidden',
    pickerMaskTop: 'pointer-events-none absolute top-0 left-0 right-0 h-1/2 z-40 bg-gradient-to-b from-white to-white/0',
    pickerMaskBottom: 'pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 z-40 bg-gradient-to-t from-white to-white/0',
    pickerYears: 'items-end h-full z-30',
    pickerMonths: 'items-start h-full z-30',
    pickerYearItem: 'justify-center',
    pickerMonthItem: 'justify-start',
    monthContent: 'overflow-hidden',
    weekdays: 'grid grid-cols-7 px-4 pb-2 border-b border-gray-100 bg-white',
    weekday: 'flex items-center justify-center h-8 text-xs font-semibold text-gray-500',
    months: 'relative flex-grow h-full shadow-inner',
    monthHeader: 'sticky top-0 z-10 flex justify-between py-1 px-4 bg-gray-200 text-base text-gray-900',
    weeks: 'z-0 pt-1',
    days: 'grid grid-cols-7',
    cell: 'py-0.5',
    day: [
      'relative flex items-center justify-center h-10 text-sm rounded-lg cursor-pointer transition-all duration-200',
      'hover:bg-gray-100 active:scale-95',
    ],
    iChevronDown: 'icon-chevron-down transition-transform',
    iPrevAction: 'icon-chevron-left',
    iNextAction: 'icon-chevron-right',
  },
  variants: {
    size: {
      xs: {
        wrapper: 'text-xs',
        header: 'p-2',
        content: '',
        weekdays: 'px-2 pb-0.5',
        months: '',
        monthHeader: 'text-xs py-0 px-2',
        weeks: 'px-2 pb-2',
        day: 'h-6 text-xs',
        weekday: 'h-5 text-xs',
        // MM-YYYY picker sizes
        pickerContent: 'h-32',
        pickerIndicator: 'h-7 rounded-sm',
        pickerYearItem: 'h-7 leading-[28px] text-sm',
        pickerMonthItem: 'h-7 leading-[28px] text-sm',
      },
      sm: {
        wrapper: 'text-sm',
        header: 'p-3',
        content: '',
        weekdays: 'px-3 pb-1',
        monthHeader: 'text-sm py-0.5 px-3',
        weeks: 'px-3 pb-3',
        day: 'h-8 text-xs',
        weekday: 'h-6 text-xs',
        // MM-YYYY picker sizes
        pickerContent: 'h-44',
        pickerIndicator: 'h-8 rounded-lg',
        pickerYearItem: 'h-8 leading-[32px] text-base',
        pickerMonthItem: 'h-8 leading-[32px] text-base',
      },
      md: {
        wrapper: 'text-base',
        header: 'p-4',
        content: '',
        weekdays: 'px-4 pb-2',
        monthHeader: 'text-base py-1 px-4',
        weeks: 'px-4 pb-4',
        day: 'h-10 text-sm',
        weekday: 'h-8 text-xs',
        // MM-YYYY picker sizes
        pickerContent: 'h-56',
        pickerIndicator: 'h-10 rounded-xl',
        pickerYearItem: 'h-10 leading-[40px] text-lg',
        pickerMonthItem: 'h-10 leading-[40px] text-lg',
      },
      lg: {
        wrapper: 'text-lg',
        header: 'p-5',
        content: '',
        weekdays: 'px-5 pb-3',
        monthHeader: 'text-lg py-2 px-5',
        weeks: 'px-5 pb-5',
        day: 'h-12 text-base',
        weekday: 'h-10 text-sm',
        // MM-YYYY picker sizes
        pickerContent: 'h-72',
        pickerIndicator: 'h-12 rounded-2xl',
        pickerYearItem: 'h-12 leading-[48px] text-xl',
        pickerMonthItem: 'h-12 leading-[48px] text-xl',
      },
    },
    color: {
      default: {
        day: 'text-gray-900',
      },
      primary: {
        day: 'text-gray-900',
      },
      success: {
        day: 'text-gray-900',
      },
      warning: {
        day: 'text-gray-900',
      },
      danger: {
        day: 'text-gray-900',
      },
    },
    isRange: {
      true: {},
      false: {},
    },
    // Cell styles
    isToday: {
      true: {
        day: 'font-semibold',
      },
      false: {},
    },
    isSelected: {
      true: {
        day: 'font-semibold',
      },
      false: {},
    },
    isOutsideMonth: {
      true: {
        day: 'text-gray-300 cursor-not-allowed',
      },
      false: {},
    },
    isDisabled: {
      true: {
        day: 'text-gray-300 cursor-not-allowed opacity-50',
      },
      false: {},
    },
    isReadOnly: {
      true: {
        day: 'cursor-default',
      },
      false: {},
    },
    isSelectable: {
      true: {},
      false: {
        day: 'cursor-default active:scale-100',
      },
    },
    isSelectionStart: {
      true: {},
      false: {},
    },
    isSelectionEnd: {
      true: {},
      false: {},
    },
    isRangeSelection: {
      true: {},
      false: {},
    },
    isYMPickerExpanded: {
      true: {
        pickerContent: 'visible',
        monthContent: 'invisible',
        months: 'shadow-none',
        iChevronDown: '-rotate-180',
        jumpTrigger: 'invisible',
      },
      false: {
        pickerContent: 'invisible',
        monthContent: 'visible',
      },
    },
    isYMPickerCurrentItem: {
      true: {
      },
      false: {},
    },
  },
  compoundVariants: [
    // Selected states with colors
    {
      isSelected: true,
      color: 'default',
      class: {
        day: 'bg-gray-900 text-white hover:bg-gray-800',
      },
    },
    {
      isRange: false,
      isSelected: true,
      color: 'primary',
      class: {
        day: 'bg-primary text-white hover:bg-primary-600',
      },
    },
    {
      isSelected: true,
      color: 'success',
      class: {
        day: 'bg-success text-white hover:bg-success-600',
      },
    },
    {
      isSelected: true,
      color: 'warning',
      class: {
        day: 'bg-warning text-white hover:bg-warning-600',
      },
    },
    {
      isSelected: true,
      color: 'danger',
      class: {
        day: 'bg-danger text-white hover:bg-danger-600',
      },
    },
    // Today states with colors (when not selected)
    {
      isToday: true,
      isSelected: false,
      color: 'default',
      class: {
        day: 'bg-gray-200 text-black',
      },
    },
    {
      isToday: true,
      isSelected: false,
      color: 'primary',
      class: {
        day: 'bg-primary-100 text-primary-500',
      },
    },
    {
      isToday: true,
      isSelected: false,
      color: 'success',
      class: {
        day: 'bg-success-100 text-success-500',
      },
    },
    {
      isToday: true,
      isSelected: false,
      color: 'warning',
      class: {
        day: 'bg-warning-100 text-warning-500',
      },
    },
    {
      isToday: true,
      isSelected: false,
      color: 'danger',
      class: {
        day: 'bg-danger-100 text-danger-500',
      },
    },
    // Today radius
    {
      isToday: true,
      isSelected: false,
      class: {
        day: 'rounded-full',
      },
    },
    // Disabled states override other states
    {
      isDisabled: true,
      class: {
        day: 'bg-transparent text-gray-300 cursor-not-allowed hover:bg-transparent',
      },
    },
    {
      isOutsideMonth: true,
      class: {
        day: 'bg-transparent text-gray-300 cursor-not-allowed hover:bg-transparent',
      },
    },
    {
      isRange: true,
      isOutsideMonth: true,
      class: {
        day: '',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'default',
      class: {
        day: 'rounded-none bg-gray-50 text-black',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'primary',
      class: {
        day: 'rounded-none bg-primary-50 text-primary-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'success',
      class: {
        day: 'rounded-none bg-success-50 text-success-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'warning',
      class: {
        day: 'rounded-none bg-warning-50 text-warning-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'danger',
      class: {
        day: 'rounded-none bg-danger-50 text-danger-500',
      },
    },
    // Y/M picker expanded with size
    {
      size: 'xs',
      isYMPickerExpanded: true,
      class: {
        monthContent: 'h-32',
      },
    },
    {
      size: 'sm',
      isYMPickerExpanded: true,
      class: {
        monthContent: 'h-44',
      },
    },
    {
      size: 'md',
      isYMPickerExpanded: true,
      class: {
        monthContent: 'h-56',
      },
    },
    {
      size: 'lg',
      isYMPickerExpanded: true,
      class: {
        monthContent: 'h-72',
      },
    },
  ],
  compoundSlots: [
    {
      slots: ['pickerYears', 'pickerMonths'],
      class: [
        'flex flex-col px-6 h-full',
      ],
    },
    {
      slots: ['pickerYearItem', 'pickerMonthItem'],
      class: [
        'flex items-center',
      ],
    },
    {
      slots: ['pickerYearItem', 'pickerMonthItem'],
      isYMPickerCurrentItem: true,
      class: [
        'font-medium',
      ],
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    isSelected: false,
    isToday: false,
    isOutsideMonth: false,
    isDisabled: false,
    isSelectable: true,
  },
})

export type CalendarVariantProps = VariantProps<typeof calendar>
export type CalendarReturnType = ReturnType<typeof calendar>
export type CalendarSlots = keyof ReturnType<typeof calendar>
