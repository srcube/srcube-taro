import type { InputProps as NativeInputProps } from '@tarojs/components'
import type { UseInputProps } from './use'
import { Input as NativeInput, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useInput } from './use'

export interface InputProps extends UseInputProps { }

const Input = forwardRef<NativeInputProps, InputProps>((props, ref) => {
  const {
    Component,
    domRef,
    styles,
    startContent,
    endContent,
    clearButton,
    isClearable,
    getWrapperProps,
    getInputProps,
    getClearButtonProps,
  } = useInput({
    ...props,
    ref,
  })

  return (
    <Component className={styles.wrapper} {...getWrapperProps()}>
      {startContent && <View className={styles.startContent}>{startContent}</View>}
      <NativeInput ref={domRef} className={styles.input} {...getInputProps()} />
      {isClearable && (
        <View {...getClearButtonProps()} className={styles.clearButton}>
          {clearButton || <View className={styles.iInputClear} />}
        </View>
      )}
      {endContent && <View className={styles.endContent}>{endContent}</View>}
    </Component>
  )
})

Input.displayName = 'Srcube.Input'

export default Input
