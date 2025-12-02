import type { SpinnerSlots, SpinnerVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { spinner } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<ViewProps> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Label to display next to the spinner
   */
  label?: ReactNode
  /**
   * Class names for slots
   */
  classNames?: SlotsToClasses<Exclude<SpinnerSlots, 'iSpinner'>>
}

export type UseSpinnerProps = Omit<Props, keyof SpinnerVariantProps> &
  SpinnerVariantProps

export function useSpinner(props: UseSpinnerProps) {
  const { ref, size, color, label, className, classNames, ...rest } = props

  const domRef = useDOMRef(ref)

  const slots = useMemo(() => spinner({ size, color, className }), [size, color, className])

  const styles = useMemo(
    () => ({
      base: slots.base({ class: [classNames?.base, className] }),
      label: slots.label({ class: classNames?.label }),
      iSpinner: slots.iSpinner(),
    }),
    [className, classNames, slots],
  )

  const getSpinnerProps = useCallback((): ViewProps => ({
    ref: domRef,
    className: styles.base,
    ...rest,
  }), [domRef, styles, rest])

  return {
    domRef,
    slots,
    styles,
    label,
    getSpinnerProps,
  }
}

export type UseSpinnerReturn = ReturnType<typeof useSpinner>
