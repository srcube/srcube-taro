import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { CheckboxProps } from '../checkbox'
import { checkboxGroup } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { CheckboxGroupState, useCheckboxGroupState } from '@srcube-taro/hooks'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<Omit<ViewProps, ''>> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Value of the checkbox group
   */
  value?: string[]
  /**
   * Default value of the checkbox group
   */
  defaultValue?: string[]
  /**
   * Orientation of the checkbox group
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Change handler
   */
  onValueChange?: (value: string[]) => void
}

type PickCheckboxProps = Pick<CheckboxProps, 'color' | 'size' | 'radius' | 'isDisabled' | 'isReadOnly' | 'isLineThrough'>

export type ContextType = {
  groupState: CheckboxGroupState
} & PickCheckboxProps

export type UseCheckboxGroupProps = Props & PickCheckboxProps

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const {
    ref,
    defaultValue = [],
    value,
    isDisabled = false,
    isReadOnly = false,
    isLineThrough = false,
    orientation = 'vertical',
    color = 'default',
    size = 'md',
    radius = size,
    children,
    className,
    onValueChange,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const groupState = useCheckboxGroupState({
    value,
    defaultValue,
    isDisabled,
    isReadOnly,
    onChange: onValueChange,
  })

  const context = useMemo<ContextType>(() => ({
    groupState,
    color,
    size,
    radius,
    isDisabled,
    isReadOnly,
    isLineThrough,
  }), [groupState, color, size, radius, isDisabled, isReadOnly, isLineThrough])

  const styles = useMemo(
    () => checkboxGroup({
      orientation,
      className,
    }),
    [className, orientation],
  )

  const getGroupProps = useCallback((): ViewProps => ({
    role: 'group',
    className: styles,
    ...rest,
  }), [styles, rest])

  return {
    ref: domRef,
    context,
    children,
    getGroupProps,
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
