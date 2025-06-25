import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC } from 'react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalHeaderProps extends NativeProps<ViewProps> {}

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setHeaderMounted } = useModalContext()

  useEffect(() => {
    setHeaderMounted(true)

    return () => setHeaderMounted(false)
  }, [setHeaderMounted])

  return (
    <View
      className={slots.header({ class: cn([classNames, className]) })}
      {...rest}
    >
      {children}
    </View>
  )
}

ModalHeader.displayName = 'Srcube.ModalContent'

export default ModalHeader
