import type { TaroElement } from '@tarojs/runtime'
import type { UseTextareaProps } from './use'
import { Field } from '@srcube-taro/form'
import { Textarea as NativeTextarea } from '@tarojs/components'
import { forwardRef } from 'react'
import { useTextarea } from './use'

export interface TextareaProps extends UseTextareaProps {}

const Textarea = forwardRef<TaroElement, TextareaProps>((props, ref) => {
  const {
    domRef,
    getFieldProps,
    getTextareaProps,
    fieldRef,
  } = useTextarea({
    ...props,
    ref,
  })

  return (
    <Field ref={fieldRef as any} {...getFieldProps()}>
      {({ id, inputClass }) => (
        <NativeTextarea id={id} ref={domRef} {...getTextareaProps({ className: inputClass })} />
      )}
    </Field>
  )
})

Textarea.displayName = 'Srcube.Textarea'

export default Textarea
