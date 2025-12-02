import type { CheckboxGroupState } from '@react-stately/checkbox'
import type { CheckboxGroupVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { CheckboxProps } from '../checkbox'
import { useCheckboxGroupState } from '@react-stately/checkbox'
import { checkboxGroup } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

type OmitNativeKeys = ''

type PickCheckboxProps = Pick<CheckboxProps, 'color' | 'size' | 'radius' | 'isDisabled' | 'isReadOnly' | 'isLineThrough'>

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys>, PickCheckboxProps {
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

export type ContextType = {
  groupState: CheckboxGroupState
} & PickCheckboxProps

export type UseCheckboxGroupProps = MergeVariantProps<Props, CheckboxGroupVariantProps>

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
    ref: domRef,
    role: 'group',
    className: styles,
    ...rest,
  }), [domRef, styles, rest])

  return {
    domRef,
    context,
    children,
    getGroupProps,
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
