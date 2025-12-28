import type { FieldProps } from '@srcube-taro/form'
import type { FieldVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, PropsWithoutChildren } from '@srcube-taro/utils-types'
import type { ITouchEvent, TextareaProps as NativeTextareaProps } from '@tarojs/components'
import { textarea } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

type OmitNativeKeys = 'disabled' | 'onInput' | 'maxlength'
type OmitFieldKeys = 'startContent' | 'endContent'

interface Props extends Omit<FieldProps & NativeTextareaProps, OmitNativeKeys & OmitFieldKeys> {
  /**
   * Ref to the native `<Textarea>` element for focus and value access.
   */
  ref?: ReactRef
  /**
   * Ref to the outer `<Field>` container for measurement or external control.
   */
  fieldRef?: ReactRef
  /**
   * Maximum number of characters allowed; `-1` means no limit. Default: `200`.
   */
  maxLength?: number
  /**
   * Native input event callback, equivalent to Taro `onInput`.
   */
  onChange?: NativeTextareaProps['onInput']
  /**
   * Controlled value change callback; receives the current string value only.
   */
  onValueChange?: (value?: string) => void
  /**
   * Whether to disable the default padding of the native `<Textarea>`.
   */
  disableDefaultPadding?: boolean
}

export type UseTextareaProps = MergeVariantProps<Props, FieldVariantProps>

export function useTextarea(originalProps: UseTextareaProps) {
  const {
    ref,
    fieldRef,
    className,
    classNames,
    variant,
    color,
    size,
    isDisabled,
    isReadonly,
    isInvalid,
    isRequired,
    isLoading,
    isClearable,
    clearButton,
    label,
    labelPlacement,
    description,
    errorMessage,
    value,
    defaultValue = '',
    maxLength = 200,
    disableDefaultPadding = true,
    onChange,
    onValueChange = () => {},
    onClear,
    ...rest
  } = originalProps

  const domRef = useDOMRef(ref)

  const [textareaValue, setTextareaValue] = useControlledState<string | undefined>(value, defaultValue, onValueChange)

  const onTextareaInput = useCallback<NonNullable<NativeTextareaProps['onInput']>>((e) => {
    setTextareaValue(e.detail.value)
    onChange?.(e)
  }, [setTextareaValue, onChange])

  const onTextareaTap = useCallback((e: ITouchEvent) => {
    e.stopPropagation()
  }, [])

  const handleClear = useCallback(() => {
    if (isDisabled)
      return
    setTextareaValue('')
    onClear?.()
    if (domRef.current)
      domRef.current.focus()
  }, [isDisabled, onClear, setTextareaValue, domRef])

  const slots = useMemo(
    () => textarea({
      variant,
      color,
      size,
      labelPlacement,
      isDisabled,
      isReadonly,
      isInvalid,
      isClearable,
      className,
    }),
    [variant, color, size, labelPlacement, isDisabled, isReadonly, isInvalid, isClearable, className],
  )

  const overrides = useMemo(() => ({
    outsideWrapper: slots.outsideWrapper(),
    controlWrapper: slots.controlWrapper(),
    control: slots.control(),
    input: slots.input(),
    helperWrapper: slots.helperWrapper(),
    label: slots.label(),
    description: slots.description(),
    errorMessage: slots.errorMessage(),
    startContent: slots.startContent(),
    endContent: slots.endContent(),
    clearButton: slots.clearButton(),
  }), [slots])

  const composedClassNames = useMemo(() => ({
    outsideWrapper: [overrides.outsideWrapper, classNames?.outsideWrapper],
    controlWrapper: [overrides.controlWrapper, classNames?.controlWrapper],
    control: [overrides.control, classNames?.control],
    input: [overrides.input, classNames?.input],
    helperWrapper: [overrides.helperWrapper, classNames?.helperWrapper],
    label: [overrides.label, classNames?.label],
    description: [overrides.description, classNames?.description],
    errorMessage: [overrides.errorMessage, classNames?.errorMessage],
    startContent: [overrides.startContent, classNames?.startContent],
    endContent: [overrides.endContent, classNames?.endContent],
    clearButton: [overrides.clearButton, classNames?.clearButton],
  }), [overrides, classNames])

  const getTextareaProps = useCallback((props?: NativeTextareaProps): NativeTextareaProps => {
    return {
      ...props,
      ...rest,
      value: textareaValue,
      maxlength: maxLength,
      disabled: isDisabled,
      disableDefaultPadding,
      onInput: onTextareaInput,
      onClick: onTextareaTap,
    }
  }, [textareaValue, maxLength, isDisabled, disableDefaultPadding, onTextareaInput, onTextareaTap, rest])

  const getFieldProps = useCallback((props?: PropsWithoutChildren<FieldProps>): PropsWithoutChildren<FieldProps> => {
    return {
      className,
      classNames: composedClassNames,
      variant,
      color,
      size,
      label,
      labelPlacement,
      description,
      errorMessage,
      isReadonly,
      isInvalid,
      isRequired,
      isLoading,
      isDisabled,
      isClearable,
      onClear: handleClear,
      clearButton,
      ...props,
    }
  }, [className, composedClassNames, variant, color, size, label, labelPlacement, description, errorMessage, isReadonly, isInvalid, isRequired, isLoading, isDisabled, isClearable, handleClear, clearButton])

  return {
    domRef,
    isClearable,
    isDisabled,
    getFieldProps,
    getTextareaProps,
    handleClear,
    fieldRef,
  }
}

export type UseTextareaReturn = ReturnType<typeof useTextarea>
