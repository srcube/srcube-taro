import type { ModalRef } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useModalContext } from './context'

export interface ModalContentProps {
  className?: string
  children?: React.ReactNode
}

const ModalContent = forwardRef<ModalRef, ModalContentProps>((props, ref) => {
  const { className, children, ...rest } = props

  const { styles } = useModalContext()

  return (
    <View
      ref={ref}
      className={className || styles.content}
      {...rest}
    >
      {children}
    </View>
  )
})

ModalContent.displayName = 'Srcube.ModalContent'

export default ModalContent
