import { Button } from '@srcube-taro/button'
import { type ReactRef } from '@srcube-taro/utils-react'
import { type NativeProps } from '@srcube-taro/utils-taro'
import { type SlotsToClasses } from '@srcube-taro/utils-tv'
import {
  Input as NativeInput,
  type InputProps as NativeInputProps,
} from '@tarojs/components'
import cn from 'classnames'
import { ReactNode, useCallback, useMemo } from 'react'
import { input, type InputSlots, type InputVariantProps } from './style'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<NativeInputProps>
  /**
   * Content to render before the input
   */
  startContent?: ReactNode
  /**
   * Content to render after the input
   */
  endContent?: ReactNode
  /**
   * Class names to apply to the input
   */
  classNames?: SlotsToClasses<InputSlots>
}

export type UseInputProps = Props &
  Omit<NativeProps<NativeInputProps>, keyof InputVariantProps> &
  InputVariantProps

export function useInput(props: UseInputProps) {
  const {
    ref,
    variant,
    size,
    status,
    disabled,
    className,
    classNames,
    startContent,
    endContent,
    placeholder = 'Please input content',
    ...rest
  } = props

  const Component = NativeInput
  const ClearButton = Button

  const slots = useMemo(
    () => input({ variant, size, status, disabled, className }),
    [variant, size, status, disabled, className],
  )

  const styles = useMemo(
    () => ({
      wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
      input: cn(slots.input({ class: classNames?.input })),
      startContent: cn(slots.startContent({ class: classNames?.startContent })),
      endContent: cn(slots.endContent({ class: classNames?.endContent })),
    }),
    [variant, size, status, disabled, className, classNames],
  )

  const getInputProps = useCallback(() => {
    return {
      disabled,
      placeholder,
      ...rest,
    }
  }, [disabled, rest])

  const getClearButtonProps = useCallback(() => {
    return {
      // className: 'i-[flowbite--close-circle-solid] opacity-20',
    }
  }, [])

  return {
    Component,
    ClearButton,
    domRef: ref,
    styles,
    startContent,
    endContent,
    getInputProps,
    getClearButtonProps,
  }
}

export type UseInputReturn = ReturnType<typeof useInput>
