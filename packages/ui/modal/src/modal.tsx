import type { ModalRef, UseModalProps } from './use'
import { RootPortal } from '@tarojs/components'
import { forwardRef } from 'react'
import { ModalProvider } from './context'
import { useModal } from './use'

export interface ModalProps extends UseModalProps {}

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const modal = useModal({ ...props, ref })

  const {
    styles,
    children,
    isVisible,
  } = modal

  return (
    <ModalProvider value={modal}>
      {isVisible && (
        <RootPortal className={styles.wrapper}>
          {children}
        </RootPortal>
      )}
    </ModalProvider>
  )
})

Modal.displayName = 'Srcube.Modal'

export default Modal
