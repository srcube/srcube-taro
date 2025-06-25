import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC } from 'react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalFooterProps extends NativeProps<ViewProps> {}

const ModalFooter: FC<ModalFooterProps> = (props) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setFooterMounted } = useModalContext()

  useEffect(() => {
    setFooterMounted(true)

    return () => setFooterMounted(false)
  }, [setFooterMounted])

  return (
    <View
      className={slots.footer({ class: cn([classNames, className]) })}
      {...rest}
    >
      { children}
    </View>
  )
}

ModalFooter.displayName = 'Srcube.ModalFooter'

export default ModalFooter
