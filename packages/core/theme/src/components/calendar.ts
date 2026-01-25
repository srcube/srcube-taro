import type { ExcludePrivateSlotKeys, VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const calendar = tv({
  slots: {
    wrapper: 'relative flex flex-col w-full bg-white',
    header: 'relative flex items-center justify-between p-4 gap-4',
    action: 'flex-shrink-0 flex items-center justify-between',
    content: 'relative flex-grow flex flex-col bg-gray-50 overflow-hidden',
    monthContent: 'flex-grow',
    pickerTrigger: 'flex-1 mx-auto max-w-[75%]',
    pickerPanel: 'absolute inset-x-0 bottom-0 flex z-10 w-full bg-white',
    pickerIndicator: 'absolute top-1/2 -translate-y-1/2 w-full h-12 rounded-xl overflow-hidden',
    pickerMaskTop: 'pointer-events-none absolute top-0 left-0 right-0 h-1/2 z-40 bg-gradient-to-b from-white to-white/0',
    pickerMaskBottom: 'pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 z-40 bg-gradient-to-t from-white to-white/0',
    pickerYears: 'items-end h-full z-30',
    pickerMonths: 'items-start h-full z-30',
    pickerYearItem: 'justify-center',
    pickerMonthItem: 'justify-start',
    weekdays: 'grid grid-cols-7 px-4 pb-2 border-b border-gray-100 bg-white',
    weekday: 'flex items-center justify-center h-8 text-xs font-semibold text-gray-500',
    months: 'relative flex-grow min-h-0 shadow-inner',
    monthYear: 'sticky top-0 z-10 flex justify-between py-1 px-4 bg-gray-200 text-base text-black font-medium',
    monthHeader: 'sticky top-0 z-10 flex justify-between py-1 px-4 text-base text-black font-medium',
    weeks: 'relative z-0',
    days: 'grid grid-cols-7',
    week: 'grid grid-cols-7',
    cell: 'py-0.5',
    day: [
      'relative flex items-center justify-center h-10 text-sm rounded-xl cursor-pointer transition-all duration-200',
      'hover:bg-gray-100 active:scale-95',
    ],
    _iChevronDown: 'icon-chevron-down transition-transform',
    _iPrevAction: 'icon-chevron-left',
    _iNextAction: 'icon-chevron-right',
  },
  variants: {
    size: {
      xs: {
        wrapper: 'text-xs',
        action: 'h-12',
        pickerPanel: 'top-12',
        content: '',
        weekdays: 'px-2 pb-0.5',
        months: '',
        monthHeader: 'text-xs py-0 px-2',
        weeks: 'p-2',
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
        action: 'h-14',
        pickerPanel: 'top-14',
        content: '',
        weekdays: 'px-3 pb-1',
        monthHeader: 'text-sm py-0.5 px-3',
        weeks: 'p-3',
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
        action: 'h-16',
        pickerPanel: 'top-16',
        content: '',
        weekdays: 'px-4 pb-2',
        monthHeader: 'text-base py-1 px-4',
        weeks: 'p-4',
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
        action: 'h-20',
        pickerPanel: 'top-20',
        content: '',
        weekdays: 'px-5 pb-3',
        monthHeader: 'text-lg py-2 px-5',
        weeks: 'p-5',
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
        monthHeader: 'text-black bg-gray-200',
        pickerIndicator: 'bg-gray-200',
      },
      primary: {
        day: 'text-gray-900',
        monthHeader: 'text-primary-500 bg-primary-100',
        pickerIndicator: 'bg-primary-100',
      },
      secondary: {
        day: 'text-gray-900',
        monthHeader: 'text-secondary-500 bg-secondary-100',
        pickerIndicator: 'bg-secondary-100',
      },
      success: {
        day: 'text-gray-900',
        monthHeader: 'text-success-500 bg-success-100',
        pickerIndicator: 'bg-success-100',
      },
      warning: {
        day: 'text-gray-900',
        monthHeader: 'text-warning-500 bg-warning-100',
        pickerIndicator: 'bg-warning-100',
      },
      danger: {
        day: 'text-gray-900',
        monthHeader: 'text-danger-500 bg-danger-100',
        pickerIndicator: 'bg-danger-100',
      },
    },
    isRange: {
      true: {},
      false: {},
    },
    // Cell styles
    isToday: {
      true: {
        day: 'bg-gray-100 font-semibold',
      },
    },
    isSelected: {
      true: {
        day: 'bg-primary text-white font-medium hover:bg-primary/90',
      },
    },
    isRangeSelection: {
      true: {
        day: 'bg-primary/10 text-primary rounded-none',
        cell: 'bg-primary/10',
      },
    },
    isSelectionStart: {
      true: {
        day: 'bg-primary text-white rounded-l-xl',
      },
    },
    isSelectionEnd: {
      true: {
        day: 'bg-primary text-white rounded-r-xl',
      },
    },
    isDisabled: {
      true: {
        day: 'opacity-30 cursor-not-allowed hover:bg-transparent active:scale-100',
      },
    },
    isUnavailable: {
      true: {
        day: 'opacity-30 cursor-not-allowed decoration-slice line-through hover:bg-transparent active:scale-100',
      },
    },
    isYMPickerOpen: {
      true: {
        pickerContent: 'visible',
        monthContent: 'invisible',
        months: 'shadow-none',
        _iChevronDown: '-rotate-180',
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
    // Y/M Picker current item colors
    {
      isYMPickerCurrentItem: true,
      color: 'default',
      class: {
        pickerYearItem: 'text-black',
        pickerMonthItem: 'text-black',
      },
    },
    {
      isYMPickerCurrentItem: true,
      color: 'primary',
      class: {
        pickerYearItem: 'text-primary-600',
        pickerMonthItem: 'text-primary-600',
      },
    },
    {
      isYMPickerCurrentItem: true,
      color: 'secondary',
      class: {
        pickerYearItem: 'text-secondary-600',
        pickerMonthItem: 'text-secondary-600',
      },
    },
    {
      isYMPickerCurrentItem: true,
      color: 'success',
      class: {
        pickerYearItem: 'text-success-600',
        pickerMonthItem: 'text-success-600',
      },
    },
    {
      isYMPickerCurrentItem: true,
      color: 'warning',
      class: {
        pickerYearItem: 'text-warning-600',
        pickerMonthItem: 'text-warning-600',
      },
    },
    {
      isYMPickerCurrentItem: true,
      color: 'danger',
      class: {
        pickerYearItem: 'text-danger-600',
        pickerMonthItem: 'text-danger-600',
      },
    },
    // Selected states with colors
    {
      isSelected: true,
      color: 'default',
      class: {
        day: 'bg-gray-900 text-white hover:bg-gray-800',
      },
    },
    {
      isSelected: true,
      color: 'primary',
      class: {
        day: 'bg-primary text-white hover:bg-primary-600',
      },
    },
    {
      isSelected: true,
      color: 'secondary',
      class: {
        day: 'bg-secondary text-white hover:bg-secondary-600',
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
      color: 'secondary',
      class: {
        day: 'bg-secondary-100 text-secondary-500',
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
    // {
    //   isOutsideMonth: true,
    //   class: {
    //     day: 'bg-transparent text-gray-300 cursor-not-allowed hover:bg-transparent',
    //   },
    // },
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
        day: 'rounded-none bg-gray-200 text-black',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'primary',
      class: {
        day: 'rounded-none bg-primary-100 text-primary-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'secondary',
      class: {
        day: 'rounded-none bg-secondary-100 text-secondary-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'success',
      class: {
        day: 'rounded-none bg-success-100 text-success-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'warning',
      class: {
        day: 'rounded-none bg-warning-100 text-warning-500',
      },
    },
    {
      isRange: true,
      isRangeSelection: true,
      isSelectionStart: false,
      isSelectionEnd: false,
      color: 'danger',
      class: {
        day: 'rounded-none bg-danger-100 text-danger-500',
      },
    },
    // Selection start/end
    {
      isRange: true,
      isSelectionStart: true,
      isSelectionEnd: false,
      class: {
        day: 'rounded-r-none',
        cell: 'bg-gradient-to-r from-transparent to-primary/10',
      },
    },
    {
      isRange: true,
      isSelectionStart: false,
      isSelectionEnd: true,
      class: {
        day: 'rounded-l-none',
        cell: 'bg-gradient-to-l from-transparent to-primary/10',
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
        'flex-1 flex flex-col px-6 h-full',
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
export type CalendarSlots = ExcludePrivateSlotKeys<keyof CalendarReturnType>
