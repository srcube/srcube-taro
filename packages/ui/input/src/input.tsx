import type { TaroElement } from '@tarojs/runtime'
import type { UseInputProps } from './use'
import { Field } from '@srcube-taro/form'
import { Input as NativeInput } from '@tarojs/components'
import { forwardRef } from 'react'
import { useInput } from './use'

export interface InputProps extends UseInputProps { }

const Input = forwardRef<TaroElement, InputProps>((props, ref) => {
  const {
    domRef,
    getFieldProps,
    getInputProps,
  } = useInput({
    ...props,
    ref,
  })

  return (
    <Field {...getFieldProps()}>
      {({ id, inputClass }) => (
        <NativeInput ref={domRef} id={id} {...getInputProps({ className: inputClass })} />
      )}
    </Field>
  )
})

Input.displayName = 'Srcube.Input'

export default Input
