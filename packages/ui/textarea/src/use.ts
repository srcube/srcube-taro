import type { TextareaSlots, TextareaVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, TextareaProps as NativeTextareaProps, TextareaProps, ViewProps } from '@tarojs/components'
import { textarea } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback } from 'react'

type OmitNativeKeys = 'disabled' | 'onInput' | 'maxlength'

interface Props extends Omit<NativeProps<TextareaProps>, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Maximum number of characters allowed, -1 means no limit
   * @default 200
   */
  maxLength?: number
  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean
  /**
   * Whether the input is clearable
   */
  isClearable?: boolean
  /**
   * Clear button to display after the input
   */
  clearButton?: React.ReactNode
  /**
   * Class names to apply to slots
   */
  classNames?: SlotsToClasses<TextareaSlots>
  /**
   * Clear button click event
   */
  onClear?: () => void
  /**
   * Native `onInput` event
   */
  onChange?: NativeTextareaProps['onInput']
  /**
   * React aria onChange event
   */
  onValueChange?: (value?: string) => void
}

export type UseTextareaProps = MergeVariantProps<Props, TextareaVariantProps>

export function useTextarea(props: UseTextareaProps) {
  const {
    ref,
    className,
    classNames,
    size,
    color,
    cursor,
    clearButton,
    isDisabled,
    isClearable = !!clearButton,
    value,
    defaultValue = '',
    maxLength = 200,
    disableDefaultPadding = true,
    onChange,
    onValueChange = () => {},
    onClear,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const slots = textarea({ size, color, isDisabled, isClearable })
  const styles = {
    wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
    textarea: cn(slots.textarea({ class: classNames?.textarea })),
    clearButton: cn(slots.clearButton({ class: classNames?.clearButton })),
    iInputClear: cn(slots.iInputClear()),
  }

  const [textareaValue, setTextareaValue] = useControlledState<string | undefined>(value, defaultValue, onValueChange)

  const onTextareaInput = useCallback<NonNullable<NativeTextareaProps['onInput']>>((e) => {
    setTextareaValue(e.detail.value)
    onChange?.(e)
  }, [setTextareaValue, onChange])

  const onWrapperTap = useCallback((e: ITouchEvent) => {
    e.stopPropagation()
  }, [])

  const onTextareaTap = useCallback((e: ITouchEvent) => {
    e.stopPropagation()
  }, [])

  const onClearTap = useCallback((e: ITouchEvent) => {
    e.stopPropagation()

    if (isDisabled)
      return
    setTextareaValue('')
    onClear?.()
  }, [isDisabled, onClear, setTextareaValue])

  const getTextareaProps = useCallback((): NativeTextareaProps => {
    return {
      value: textareaValue,
      maxlength: maxLength,
      disabled: isDisabled,
      disableDefaultPadding,
      onInput: onTextareaInput,
      onClick: onTextareaTap,
      className: styles.textarea,
      ...rest,
    }
  }, [textareaValue, maxLength, isDisabled, disableDefaultPadding, onTextareaInput, onTextareaTap, styles.textarea, rest])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.wrapper,
    onClick: onWrapperTap,
  }), [styles.wrapper, onWrapperTap])

  const getClearButtonProps = useCallback((): ViewProps => ({
    onClick: onClearTap,
  }), [onClearTap])

  return {
    domRef,
    styles,
    clearButton,
    isClearable,
    getTextareaProps,
    getWrapperProps,
    getClearButtonProps,
  }
}

export type UseTextareaReturn = ReturnType<typeof useTextarea>
