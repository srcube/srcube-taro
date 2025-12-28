import type { FieldProps } from '@srcube-taro/form'
import type { InputVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, PropsWithoutChildren } from '@srcube-taro/utils-types'
import type { CommonEvent, ITouchEvent, InputProps as NativeInputProps } from '@tarojs/components'
import { input } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useState } from 'react'

type OmitNativeKeys = 'value' | 'defaultValue' | 'children' | 'disabled' | 'password' | 'onInput'

interface Props extends FieldProps<Omit<NativeInputProps, OmitNativeKeys>> {
  /**
   * Ref for the input control element (e.g., input, select).
   */
  ref?: ReactRef
  /**
   * Ref for the field control element (e.g., input, select).
   */
  fieldRef?: ReactRef
  /**
   * Field value
   */
  value?: string
  /**
   * Default value for uncontrolled usage.
   */
  defaultValue?: string
  /**
   * Whether the input is a password field; maps to native `password`.
   */
  isPassword?: boolean
  /**
   * Native input event callback, equivalent to Taro `onInput`.
   */
  onChange?: NativeInputProps['onInput']
  /**
   * Controlled value change callback; receives the current string value only.
   */
  onValueChange?: (value?: string) => void
}

export type UseInputProps = MergeVariantProps<Props, InputVariantProps>

export function useInput(originalProps: UseInputProps) {
  const {
    ref,
    fieldRef,
    value,
    defaultValue = '',
    isPassword = false,
    isDisabled,
    className,
    onClear,
    onChange,
    onValueChange = () => {},
    controlProps,
    ...rest
  } = originalProps

  const domRef = useDOMRef(ref)

  const [inputValue, setInputValue] = useControlledState<string | undefined>(value, defaultValue, onValueChange)
  const [isFocused, setIsFocused] = useState<boolean>(controlProps?.focus ?? false)

  const handleInput = useCallback((e: CommonEvent) => {
    setInputValue(e.detail.value)
    onChange?.(e)
  }, [setInputValue, onChange])

  const handleInputTap = useCallback((e: ITouchEvent) => {
    e.stopPropagation()

    controlProps?.onTap?.(e)
  }, [controlProps])

  const handleClear = useCallback(() => {
    if (isDisabled) {
      return
    }
    setInputValue('')
    onClear?.()
    if (domRef.current) {
      domRef.current.focus()
    }
  }, [domRef, isDisabled, onClear, setInputValue])

  const getFieldProps = useCallback((props?: PropsWithoutChildren<FieldProps>): PropsWithoutChildren<FieldProps> => {
    return {
      ref: fieldRef,
      onClear: handleClear,
      controlProps,
      isDisabled,
      isFocused,
      ...props,
      ...rest,
    }
  }, [fieldRef, rest, isDisabled, isFocused, controlProps, handleClear])

  const getInputProps = useCallback((props: NativeInputProps): NativeInputProps => {
    return {
      value: inputValue,
      defaultValue,
      password: isPassword,
      disabled: isDisabled,
      className: input({ className: controlProps?.className }),
      onInput: handleInput,
      onClick: handleInputTap,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      ...props,
      ...controlProps,
    }
  }, [inputValue, defaultValue, isPassword, isDisabled, controlProps, handleInputTap, handleInput])

  return {
    domRef,
    isDisabled,
    getFieldProps,
    getInputProps,
    handleClear,
  }
}

export type UseInputReturn = ReturnType<typeof useInput>
