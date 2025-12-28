import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { View } from '@tarojs/components'
import { forwardRef, useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalHeaderProps extends NativeProps<ViewProps> {}

const ModalHeader = forwardRef<TaroElement, ModalHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setHeaderMounted } = useModalContext()

  useEffect(() => {
    setHeaderMounted(true)

    return () => {
      setHeaderMounted(false)
    }
  }, [setHeaderMounted])

  return (
    <View
      ref={ref}
      className={slots.header({ class: [classNames?.header, className] })}
      {...rest}
    >
      {children}
    </View>
  )
})

ModalHeader.displayName = 'Srcube.ModalContent'

export default ModalHeader
