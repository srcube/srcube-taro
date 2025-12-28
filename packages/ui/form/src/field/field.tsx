import type { StandardProps, ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import type { Ref } from 'react'
import type { UseFieldProps } from './use'
import { Label, View } from '@tarojs/components'
import { forwardRef, useMemo } from 'react'
import { useField } from './use'

export interface FieldProps<T extends StandardProps = StandardProps<ViewProps>> extends UseFieldProps<T> {}

const Field = forwardRef((props: FieldProps, ref: Ref<TaroElement>) => {
  const {
    domRef,
    styles,
    children,
    description,
    errorMessage,
    startContent,
    endContent,
    clearButton,
    isClearable,
    controlId,
    getBaseProps,
    getOutsideWrapperProps,
    getControlWrapperProps,
    getControlProps,
    getHelperWrapperProps,
    getLabelProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
    shouldLabelBeOutside,
    hasHelper,
  } = useField({ ...props, ref })

  const labelContent = useMemo(() => {
    return props.label ? <Label {...getLabelProps()}>{props.label}</Label> : null
  }, [props.label, getLabelProps])

  const clearContent = useMemo(() => {
    if (!isClearable)
      return null
    return (
      <View {...getClearButtonProps()} className={styles.clearButton}>
        {clearButton ?? <View className={styles.iClear} />}
      </View>
    )
  }, [isClearable, getClearButtonProps, styles.clearButton, styles.iClear, clearButton])

  const helperContent = useMemo(() => {
    if (!hasHelper)
      return null

    const content = errorMessage
      ? <View {...getErrorMessageProps()}>{errorMessage}</View>
      : (description ? <View {...getDescriptionProps()}>{description}</View> : null)
    return <View {...getHelperWrapperProps()}>{content}</View>
  }, [hasHelper, errorMessage, description, getHelperWrapperProps, getErrorMessageProps, getDescriptionProps])

  const controlContent = useMemo(() => (
    <View {...getControlProps()}>
      {startContent && <View className={styles.startContent}>{startContent}</View>}
      {children
        ? children({ id: controlId, inputClass: styles.input })
        : (
            <View id={controlId} className={styles.input}>
              {props?.value ?? props?.placeholder}
            </View>
          )}
      {clearContent}
      {endContent && <View className={styles.endContent}>{endContent}</View>}
    </View>
  ), [children, props?.value, props?.placeholder, styles.input, controlId, clearContent, endContent, getControlProps, startContent, styles.startContent, styles.endContent])

  const outsideWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <View {...getOutsideWrapperProps()}>
          <View {...getControlWrapperProps()}>
            {controlContent}
          </View>
          {helperContent}
        </View>
      )
    }

    return (
      <>
        <View {...getControlWrapperProps()}>
          {labelContent}
          {controlContent}
        </View>
        {helperContent}
      </>
    )
  }, [shouldLabelBeOutside, labelContent, controlContent, helperContent, getOutsideWrapperProps, getControlWrapperProps])

  return (
    <View ref={domRef} {...getBaseProps()}>
      {shouldLabelBeOutside && labelContent}
      {outsideWrapper}
    </View>
  )
})

Field.displayName = 'Srcube.Form.Field'

export default Field
