import type { InputOtpSlots, InputOtpVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { CommonEvent, InputProps as NativeInputProps } from '@tarojs/components'
import { inputOtp } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo, useState } from 'react'

type OmitNativeKeys = 'onInput' | 'password' | 'type'

interface Props extends Omit<NativeProps<NativeInputProps>, OmitNativeKeys> {
  /**
   * Ref to the input element
   */
  ref?: ReactRef
  /**
   * Number of input boxes
   * @default 4
   */
  length?: number
  /**
   * Input character type
   * @default 'number'
   */
  keyboardType?: NativeInputProps['type']
  /**
   * Whether the input is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the input is read-only
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Whether the input is password type
   * @default false
   */
  isPassword?: boolean
  /**
   * Custom class names for slots
   */
  classNames?: SlotsToClasses<InputOtpSlots>
  /**
   * Callback when input value changes
   */
  onChange?: NativeInputProps['onInput']
  /**
   * Callback when input value changes
   */
  onValueChange?: (value?: string) => void
  /**
   * Callback when input value is complete
   */
  onComplete?: (value: string) => void
}

export type UseInputOtpProps = MergeVariantProps<Props, InputOtpVariantProps>

export function useInputOtp(props: UseInputOtpProps) {
  const {
    ref,
    value,
    defaultValue = '',
    length = 4,
    keyboardType = 'number',
    color,
    size,
    round,
    isDisabled,
    isReadOnly,
    isPassword,
    className,
    classNames,
    onChange,
    onValueChange = () => {},
    onComplete,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const slots = useMemo(() => inputOtp({ color, size, round, isDisabled, isReadOnly, isPassword }), [color, size, round, isDisabled, isReadOnly, isPassword])

  const styles = useMemo(
    () => ({
      wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
      hiddenInput: cn(slots.hiddenInput()),
      box: cn(slots.box({ class: classNames?.box })),
      cursor: cn(slots.cursor()),
      dot: cn(slots.dot()),
    }),
    [className, classNames, slots],
  )

  const [inputValue, setInputValue] = useControlledState<string | undefined>(value, defaultValue, onValueChange)
  const [isFocused, setIsFocused] = useState(false)

  const handleWrapperTap = useCallback((e: CommonEvent) => {
    e.stopPropagation()
    if (isDisabled || isReadOnly)
      return
    if (domRef.current)
      domRef.current.focus()
  }, [domRef, isDisabled, isReadOnly])

  const handleInput = useCallback((e: CommonEvent) => {
    const raw = e.detail.value || ''
    const next = raw.slice(0, length)
    setInputValue(next)
    onChange?.(e)
    if (next.length === length && (inputValue || '').length < length) {
      onComplete?.(next)
    }
  }, [length, setInputValue, onChange, inputValue, onComplete])

  const getWrapperProps = useCallback(() => {
    return {
      className: styles.wrapper,
      onTap: handleWrapperTap,
    }
  }, [styles.wrapper, handleWrapperTap])

  const getHiddenInputProps = useCallback((): NativeInputProps => {
    return {
      value: inputValue,
      maxlength: length,
      disabled: isDisabled,
      password: isPassword,
      type: keyboardType,
      onInput: handleInput,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      ...rest,
    } as unknown as NativeInputProps
  }, [inputValue, length, isDisabled, handleInput, keyboardType, rest])

  const activeIndex = Math.min((inputValue || '').length, Math.max(length - 1, 0))
  const chars = (inputValue || '').split('').slice(0, length)
  const boxes = Array.from({ length }, (_, i) => ({
    char: chars[i] || '',
    className: cn(styles.box, i === activeIndex ? 'bg-black/10' : ''),
    showCursor: isFocused && i === activeIndex && !chars[i],
  }))

  return {
    domRef,
    styles,
    boxes,
    getWrapperProps,
    getHiddenInputProps,
  }
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>
