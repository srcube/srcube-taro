import type { TaroElement } from '@tarojs/runtime'
import type { UseTextareaProps } from './use'
import { Textarea as NativeTextarea, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useTextarea } from './use'

export interface TextareaProps extends UseTextareaProps {}

const Textarea = forwardRef<TaroElement, TextareaProps>((props, ref) => {
  const {
    domRef,
    styles,
    clearButton,
    isClearable,
    getWrapperProps,
    getTextareaProps,
    getClearButtonProps,
  } = useTextarea({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      <NativeTextarea ref={domRef} {...getTextareaProps()} />
      {isClearable && (
        <View {...getClearButtonProps()} className={styles.clearButton}>
          {clearButton || <View className={styles.iInputClear} />}
        </View>
      )}
    </View>
  )
})

Textarea.displayName = 'Srcube.Textarea'

export default Textarea
