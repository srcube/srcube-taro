import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ModalRef } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useModalContext } from './context'

export interface ModalBackdropProps extends NativeProps<ViewProps> {
  className?: string
  children?: React.ReactNode
}

const ModalBackdrop = forwardRef<ModalRef, ModalBackdropProps>((props, ref) => {
  const { className, children, ...rest } = props

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
      ref={ref}
      className={className || styles.backdrop}
      {...getBackdropProps(rest)}
    >
      {children}
    </View>
  )
})

ModalBackdrop.displayName = 'Srcube.ModalBackdrop'

export default ModalBackdrop
