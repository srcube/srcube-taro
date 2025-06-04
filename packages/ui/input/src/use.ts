import type { InputSlots, InputVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { CommonEvent, InputProps as NativeInputProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { input } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useCallback, useMemo } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Ref to the wrapper DOM element
   */
  wrapperRef?: ReactRef
  /**
   * Content to render before the input
   */
  startContent?: ReactNode
  /**
   * Content to render after the input
   */
  endContent?: ReactNode
  /**
   * Content to render clear button
   */
  clearButton?: ReactNode
  /**
   * Whether the input is password
   */
  isPassword?: boolean
  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean
  /**
   * Whether the input is clearable
   */
  isClearable?: boolean
  /**
   * Class names to apply to the input
   */
  classNames?: SlotsToClasses<Exclude<InputSlots, 'iInputClear'>>
  /**
   * Callback fired when the value is cleared
   */
  onClear?: () => void
  /**
   * Native `onInput` event
   */
  onChange?: NativeInputProps['onInput']
  /**
   * React aria onChange event
   */
  onValueChange?: (value?: string) => void
}

type NativePropsOmitKeys = 'disabled' | 'password' | 'onInput'

type OmittedNativeInputProps = Omit<
  NativeProps<Omit<NativeInputProps, NativePropsOmitKeys>>,
  keyof InputVariantProps
>

export type UseInputProps = Props & OmittedNativeInputProps & InputVariantProps

export function useInput(props: UseInputProps) {
  const {
    ref,
    value,
    defaultValue = '',
    variant,
    color,
    size,
    children,
    startContent,
    endContent,
    clearButton,
    isPassword = false,
    isDisabled,
    isClearable = !!clearButton,
    className,
    classNames,
    onClear,
    onChange,
    onValueChange = () => {},
    ...rest
  } = props

  const Component = View

  const domRef = useDOMRef(ref)

  const slots = useMemo(
    () => input({ variant, color, size, isDisabled, className }),
    [variant, color, size, isDisabled, className],
  )

  const styles = useMemo(
    () => ({
      wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
      input: cn(slots.input({ class: classNames?.input })),
      clearButton: cn(slots.clearButton({ class: classNames?.clearButton })),
      startContent: cn(slots.startContent({ class: classNames?.startContent })),
      endContent: cn(slots.endContent({ class: classNames?.endContent })),
      iInputClear: cn(slots.iInputClear()),
    }),
    [className, classNames, slots],
  )

  const [inputValue, setInputValue] = useControlledState<string | undefined>(value, defaultValue, onValueChange)

  const handleWrapperTap = useCallback((e: CommonEvent) => {
    e.stopPropagation()

    if (isDisabled)
      return

    if (domRef.current) {
      domRef.current.focus = true
    }
  }, [domRef, isDisabled])

  const handleInput = useCallback((e: CommonEvent<NativeInputProps.inputEventDetail>) => {
    setInputValue(e.detail.value)
    onChange?.(e)
  }, [setInputValue, onChange])

  const handleClear = useCallback((e: CommonEvent) => {
    e.stopPropagation()

    if (isDisabled) {
      return
    }

    setInputValue('')
    onClear?.()

    if (domRef.current) {
      domRef.current.focus = true
    }
  }, [domRef, isDisabled, onClear, setInputValue])

  const getWrapperProps = useCallback(() => {
    return {
      onTap: handleWrapperTap,
    }
  }, [handleWrapperTap])

  const getInputProps = useCallback((): NativeInputProps => {
    return {
      value: inputValue,
      defaultValue,
      password: isPassword,
      disabled: isDisabled,
      onInput: handleInput,
      ...rest,
    }
  }, [inputValue, defaultValue, isPassword, isDisabled, handleInput, rest])

  const getClearButtonProps = useCallback(() => {
    return {
      onTap: handleClear,
    }
  }, [handleClear])

  return {
    Component,
    domRef,
    styles,
    children,
    startContent,
    endContent,
    clearButton,
    isClearable,
    getWrapperProps,
    getInputProps,
    getClearButtonProps,
  }
}

export type UseInputReturn = ReturnType<typeof useInput>
