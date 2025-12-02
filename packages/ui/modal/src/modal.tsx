import type { ModalRef, UseModalProps } from './use'
import { RootPortal, View } from '@tarojs/components'
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
        // RootPortal need to be absolute position to avoid effect layout display
        <RootPortal style={{ position: 'absolute' }} {...getRootPortalProps()}>
          <View className={styles.base}>
            {!hasCustomBackdrop && <ModalBackdrop />}
            {children}
          </View>
        </RootPortal>
      )}
    </ModalProvider>
  )
})

Modal.displayName = 'Srcube.Modal'

export default Modal
