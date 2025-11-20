import type { TaroElement } from '@tarojs/runtime'
import type { UseInputOtpProps } from './use'
import { Input as NativeInput, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useInputOtp } from './use'

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<TaroElement, InputOtpProps>((props, ref) => {
  const {
    domRef,
    styles,
    boxes,
    getWrapperProps,
    getHiddenInputProps,
  } = useInputOtp({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      <NativeInput ref={domRef} className={styles.hiddenInput} hidden {...getHiddenInputProps()} />
      {boxes.map((box, i) => (
        <View key={i} className={box.className}>
          {box.char
            ? (props.isPassword ? <View className={styles.dot} /> : box.char)
            : (box.showCursor ? <View className={styles.cursor} /> : null)}
        </View>
      ))}
    </View>
  )
})

InputOtp.displayName = 'Srcube.InputOtp'

export default InputOtp
