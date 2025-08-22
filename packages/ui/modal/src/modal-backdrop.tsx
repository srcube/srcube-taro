import type { ModalRef } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useModalContext } from './context'

export interface ModalBackdropProps {
  className?: string
  children?: React.ReactNode
}

const ModalBackdrop = forwardRef<ModalRef, ModalBackdropProps>((props, _ref) => {
  const { className, children, ...otherProps } = props
  const modal = useModalContext()

  const {
    styles,
    hasBackdrop,
    getBackdropProps,
  } = modal

  if (!hasBackdrop) {
    return null
  }

  return (
    <View 
      className={className || styles.backdrop} 
      {...getBackdropProps()} 
      {...otherProps}
    >
      {children}
    </View>
  )
})

ModalBackdrop.displayName = 'Srcube.ModalBackdrop'

export default ModalBackdrop