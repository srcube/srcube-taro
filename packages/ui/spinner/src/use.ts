import type { SpinnerSlots, SpinnerVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { spinner } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useMemo } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<ViewProps>
  /**
   * Label to display next to the spinner
   */
  label?: ReactNode
  /**
   * Class names for slots
   */
  classNames?: SlotsToClasses<SpinnerSlots>
}

export type UseSpinnerProps = Props &
  Omit<NativeProps<ViewProps>, keyof SpinnerVariantProps> &
  SpinnerVariantProps

export function useSpinner(props: UseSpinnerProps) {
  const { ref, size, color, label, className, classNames, ...rest } = props

  const Component = View

  const slots = useMemo(() => spinner({ size, color, className }), [size, color, className])

  const styles = useMemo(
    () => ({
      wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
      icon: slots.icon({ class: classNames?.icon }),
      label: slots.label({ class: classNames?.label }),
    }),
    [className, classNames, slots],
  )

  const getSpinnerProps = () => ({
    ...rest,
  })

  return {
    Component,
    domRef: ref,
    slots,
    styles,
    label,
    getSpinnerProps,
  }
}

export type UseSpinnerReturn = ReturnType<typeof useSpinner>
