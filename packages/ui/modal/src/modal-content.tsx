import type { ModalRef } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useModalContext } from './context'

export interface ModalContentProps {
  className?: string
  children?: React.ReactNode
}

const ModalContent = forwardRef<ModalRef, ModalContentProps>((props, _ref) => {
  const { className, children, ...otherProps } = props
  const modal = useModalContext()

  const {
    styles,
    getModalProps,
  } = modal

  return (
    <View 
      className={className || styles.content} 
      {...getModalProps()} 
      {...otherProps}
    >
      {children}
    </View>
  )
})

ModalContent.displayName = 'Srcube.ModalContent'

export default ModalContent