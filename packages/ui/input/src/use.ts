import type { InputSlots, InputVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { CommonEvent, InputProps, InputProps as NativeInputProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { input } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo } from 'react'

type OmitNativeKeys = 'disabled' | 'password' | 'onInput'

interface Props extends Omit<NativeProps<InputProps>, OmitNativeKeys> {
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

export type UseInputProps = MergeVariantProps<Props, InputVariantProps>

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

    // if (isDisabled)
    //   return

    // if (domRef.current) {
    //   domRef.current.focus()
    // }
  }, [])

  const handleInput = useCallback((e: CommonEvent) => {
    setInputValue(e.detail.value)
    onChange?.(e)
  }, [setInputValue, onChange])

  const handleInputTap = useCallback((e: CommonEvent) => {
    e.stopPropagation()
  }, [])

  const handleClear = useCallback((e: CommonEvent) => {
    e.stopPropagation()

    if (isDisabled) {
      return
    }

    setInputValue('')
    onClear?.()

    if (domRef.current) {
      domRef.current.focus()
    }
  }, [domRef, isDisabled, onClear, setInputValue])

  const getWrapperProps = useCallback(() => {
    return {
      className: styles.wrapper,
      onTap: handleWrapperTap,
    }
  }, [styles.wrapper, handleWrapperTap])

  const getInputProps = useCallback((): NativeInputProps => {
    return {
      value: inputValue,
      defaultValue,
      password: isPassword,
      disabled: isDisabled,
      onInput: handleInput,
      onClick: handleInputTap,
      ...rest,
    }
  }, [inputValue, defaultValue, isPassword, isDisabled, handleInputTap, handleInput, rest])

  const getClearButtonProps = useCallback(() => {
    return {
      onTap: handleClear,
    }
  }, [handleClear])

  return {
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
