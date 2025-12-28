import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { View } from '@tarojs/components'
import { forwardRef, useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalFooterProps extends NativeProps<ViewProps> {}

const ModalFooter = forwardRef<TaroElement, ModalFooterProps>((props, ref) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setFooterMounted } = useModalContext()

  useEffect(() => {
    setFooterMounted(true)

    return () => {
      setFooterMounted(false)
    }
  }, [setFooterMounted])

  return (
    <View
      ref={ref}
      className={slots.footer({ class: [classNames?.footer, className] })}
      {...rest}
    >
      { children}
    </View>
  )
})

ModalFooter.displayName = 'Srcube.ModalFooter'

export default ModalFooter
