import type { ModalRef, UseModalProps } from './use'
import { RootPortal } from '@tarojs/components'
import { Children, forwardRef, isValidElement } from 'react'
import { ModalProvider } from './context'
import ModalBackdrop from './modal-backdrop'
import { useModal } from './use'

export interface ModalProps extends UseModalProps {}

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const modal = useModal({ ...props, ref })

  const {
    styles,
    children,
    isVisible,
    getRootPortalProps,
  } = modal

  const hasCustomBackdrop = Children.toArray(children).some(child =>
    isValidElement(child) && child.type === ModalBackdrop,
  )

  return (
    <ModalProvider value={modal}>
      {isVisible && (
        <RootPortal className={styles.wrapper} {...getRootPortalProps()}>
          {!hasCustomBackdrop && <ModalBackdrop />}
          {children}
        </RootPortal>
      )}
    </ModalProvider>
  )
})

Modal.displayName = 'Srcube.Modal'

export default Modal
