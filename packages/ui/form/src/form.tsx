import type { TaroElement } from '@tarojs/runtime'
import type { UseFormProps } from './use'
import { Form as NativeForm } from '@tarojs/components'
import { forwardRef } from 'react'
import { useForm } from './use'

export interface FormProps extends UseFormProps {}

const Form = forwardRef<TaroElement, FormProps>((props, ref) => {
  const {
    domRef,
    children,
    getFormProps,
  } = useForm({
    ...props,
    ref,
  })

  return (
    <NativeForm ref={domRef} {...getFormProps()}>
      {children}
    </NativeForm>
  )
})

Form.displayName = 'Srcube.Form'

export default Form
