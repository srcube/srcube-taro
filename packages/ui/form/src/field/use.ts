import type { FieldSlots, FieldVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, StandardProps, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { field } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo, useRef } from 'react'

type OmitNativeKeys = 'id' | 'children' | 'className'

interface Props<T extends StandardProps> extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  /**
   * Root DOM ref for the Field container (focus/measure).
   */
  ref?: ReactRef
  /**
   * Unique identifier for the field (used for label `for` attribute).
   */
  id?: string
  /**
   * Label content; supports inside/outside placements.
   */
  label?: ReactNode
  /**
   * Label placement: outside (top), outside-left (left), or inside (within control).
   */
  labelPlacement?: 'outside' | 'outside-left' | 'inside'
  /**
   * Field value
   */
  value?: string
  /**
   * Placeholder text for the control (e.g., input fields).
   */
  placeholder?: string
  /**
   * Helper description text (shown when not invalid).
   */
  description?: ReactNode
  /**
   * Error message text (takes precedence over description).
   */
  errorMessage?: ReactNode
  /**
   * Start slot of the control row (e.g., icon/prefix).
   */
  startContent?: ReactNode
  /**
   * End slot of the control row (e.g., icon/suffix).
   */
  endContent?: ReactNode
  /**
   * Clear button content; rendered when `isClearable` is true.
   */
  clearButton?: ReactNode
  /**
   * Disable the control.
   */
  isDisabled?: boolean
  /**
   * Invalid state (affects styles and a11y markers).
   */
  isInvalid?: boolean
  /**
   * Required state (a11y marker only).
   */
  isRequired?: boolean
  /**
   * Loading state (reserved for future component behavior).
   */
  isLoading?: boolean
  /**
   * Enable clear button when true.
   */
  isClearable?: boolean
  /**
   * Custom class name for the Field container.
   */
  className?: string
  /**
   * Slot classes to override theme styles per slot.
   */
  classNames?: SlotsToClasses<Exclude<FieldSlots, 'iClear'>>
  /**
   * Control props to pass down to the control element.
   */
  controlProps?: NativeProps<T>
  /**
   * Clear action callback (fires when `isClearable`).
   */
  onClear?: () => void
  /**
   * Control renderer or node; function receives `{ id, inputClass }`.
   *
   * @param args.id - The unique control id used by Label `for`.
   * @param args.inputClass - The class name for the input element.
   */
  children?: ((args: { id: string, inputClass?: string }) => ReactNode)
}

export type UseFieldProps<T extends NativeProps = NativeProps<ViewProps>> = MergeVariantProps<Props<T>, FieldVariantProps>

export function useField<T extends NativeProps = NativeProps<ViewProps>>(originalProps: UseFieldProps<T>) {
  const {
    ref,
    children,
    label,
    labelPlacement = 'outside',
    description,
    errorMessage,
    startContent,
    endContent,
    clearButton,
    isDisabled,
    isReadonly,
    isFocused,
    isInvalid,
    isRequired,
    isLoading,
    isClearable = !!clearButton,
    className,
    classNames,
    onClear,
    variant,
    color,
    size,
    onTap,
    ...rest
  } = originalProps

  const domRef = useDOMRef(ref)

  const controlIdRef = useRef<string>(originalProps.id ?? `field-${Math.random().toString(36).slice(2, 10)}`)
  const controlId = controlIdRef.current

  const slots = useMemo(
    () => field({ variant, color, size, isLoading, isDisabled, isReadonly, isFocused, isInvalid, className, labelPlacement }),
    [variant, color, size, isLoading, isDisabled, isReadonly, isFocused, isInvalid, className, labelPlacement],
  )

  const styles = useMemo(
    () => ({
      base: slots.base({ class: [classNames?.base, className] }),
      outsideWrapper: slots.outsideWrapper({ class: classNames?.outsideWrapper }),
      controlWrapper: slots.controlWrapper({ class: classNames?.controlWrapper }),
      control: slots.control({ class: classNames?.control }),
      input: slots.input({ class: classNames?.input }),
      helperWrapper: slots.helperWrapper({ class: classNames?.helperWrapper }),
      label: slots.label({ class: classNames?.label }),
      description: slots.description({ class: classNames?.description }),
      errorMessage: slots.errorMessage({ class: classNames?.errorMessage }),
      startContent: slots.startContent({ class: classNames?.startContent }),
      endContent: slots.endContent({ class: classNames?.endContent }),
      clearButton: slots.clearButton({ class: classNames?.clearButton }),
      iClear: slots.iClear(),
    }),
    [className, classNames, slots],
  )

  const shouldLabelBeOutside = labelPlacement === 'outside' || labelPlacement === 'outside-left'
  const shouldLabelBeInside = labelPlacement === 'inside'
  const isOutsideLeft = labelPlacement === 'outside-left'
  const hasHelper = !!(description || errorMessage)

  const handleClear = useCallback(() => {
    if (isDisabled)
      return
    onClear?.()
  }, [isDisabled, onClear])

  const handleBaseTap = useCallback((e: ITouchEvent) => {
    if (isDisabled || isReadonly) {
      e.stopPropagation()
    }
    onTap?.(e)
  }, [isDisabled, isReadonly, onTap])

  const getBaseProps = useCallback((): ViewProps => ({
    className: slots.base({ className: [classNames?.base, className] }),
    onClick: handleBaseTap,
    ...rest,
  }), [slots, classNames?.base, className, handleBaseTap, rest])

  const getOutsideWrapperProps = useCallback(() => ({
    className: slots.outsideWrapper({ className: classNames?.outsideWrapper }),
  }), [slots, classNames?.outsideWrapper])

  const getLabelProps = useCallback(() => ({
    className: slots.label({ className: classNames?.label }),
    for: controlId,
  }), [slots, classNames?.label, controlId])

  const getControlWrapperProps = useCallback(() => ({
    className: slots.controlWrapper({ className: classNames?.controlWrapper }),
  }), [slots, classNames?.controlWrapper])

  const getControlProps = useCallback(() => ({
    className: slots.control({ className: classNames?.control }),
  }), [slots, classNames?.control])

  const getHelperWrapperProps = useCallback(() => ({
    className: slots.helperWrapper({ className: classNames?.helperWrapper }),
  }), [slots, classNames?.helperWrapper])

  const getDescriptionProps = useCallback(() => ({
    className: slots.description({ className: classNames?.description }),
  }), [slots, classNames?.description])

  const getErrorMessageProps = useCallback(() => ({
    className: slots.errorMessage({ className: classNames?.errorMessage }),
  }), [slots, classNames?.errorMessage])

  const getClearButtonProps = useCallback(() => ({
    className: slots.clearButton({ className: classNames?.clearButton }),
    onTap: handleClear,
  }), [slots, classNames?.clearButton, handleClear])

  return {
    domRef,
    styles,
    children,
    label,
    labelPlacement,
    description,
    errorMessage,
    startContent,
    endContent,
    clearButton,
    isClearable,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    isOutsideLeft,
    hasHelper,
    controlId,
    getBaseProps,
    getOutsideWrapperProps,
    getLabelProps,
    getControlWrapperProps,
    getControlProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  }
}

export type UseFieldReturn = ReturnType<typeof useField>
