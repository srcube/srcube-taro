import type { TaroElement } from '@tarojs/runtime'
import type { UseModalProps } from './use'
import { RootPortal, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { ModalProvider } from './context'
import { useModal } from './use'

export interface ModalProps extends UseModalProps {}

const Modal = forwardRef<TaroElement, ModalProps>((props, ref) => {
  const modal = useModal({
    ...props,
    ref,
  })

  const {
    styles,
    children,
    isVisible,
    getModalProps,
    getBackdropProps,
  } = modal

  return (
    <ModalProvider value={modal}>
      {isVisible && (
        <RootPortal className={styles.wrapper} {...getModalProps()}>
          <View className={styles.backdrop} {...getBackdropProps()} />
          {children}
        </RootPortal>
      )}
    </ModalProvider>
  )
})

Modal.displayName = 'Srcube.Modal'

export default Modal
