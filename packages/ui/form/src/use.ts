import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { FormProps as NativeFormProps } from '@tarojs/components'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
}

export type UseFormProps = Props & Omit<NativeProps<NativeFormProps>, ''>

export function useForm(props: UseFormProps) {
  const { ref, children, className, ...rest } = props

  const domRef = useDOMRef(ref)

  const getFormProps = useCallback(() => {
    return {
      ...rest,
    }
  }, [rest])

  return {
    domRef,
    children,
    getFormProps,
  }
}

export type UseFormReturn = ReturnType<typeof useForm>
