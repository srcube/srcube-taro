import type { RadioGroupState } from '@react-stately/radio'
import type { RadioGroupVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { RadioProps } from '../radio'
import { useRadioGroupState } from '@react-stately/radio'
import { radioGroup } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

type OmitNativeKey = ''

type PickRadioProps = Pick<RadioProps, 'color' | 'size' | 'orientation' | 'isDisabled' | 'isReadOnly'>

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKey>, PickRadioProps {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Value of the radio group
   */
  value?: string
  /**
   * Default value of the radio group
   */
  defaultValue?: string
  /**
   * Orientation of the radio group
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Change handler
   */
  onValueChange?: (value: string) => void
}

export type ContextType = {
  groupState: RadioGroupState
} & PickRadioProps

export type UseRadioGroupProps = MergeVariantProps<Props, RadioGroupVariantProps>

export function useRadioGroup(props: UseRadioGroupProps) {
  const {
    ref,
    defaultValue = '',
    value,
    isDisabled = false,
    isReadOnly = false,
    orientation = 'vertical',
    color = 'default',
    size = 'md',
    children,
    className,
    onValueChange,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const groupState = useRadioGroupState({
    defaultValue,
    value,
    isDisabled,
    isReadOnly,
    onChange: onValueChange,
  })

  const context = useMemo<ContextType>(() => ({
    groupState,
    color,
    size,
    orientation,
    isDisabled,
    isReadOnly,
  }), [groupState, color, size, orientation, isDisabled, isReadOnly])

  const styles = useMemo(
    () => radioGroup({
      orientation,
      isDisabled,
      isReadOnly,
      className,
    }),
    [className, orientation, isDisabled, isReadOnly],
  )

  const getGroupProps = useCallback((): ViewProps => ({
    ref: domRef,
    role: 'radiogroup',
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

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>
