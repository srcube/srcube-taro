import type { DrawerRef, UseDrawerProps } from './use'
import { Modal } from '@srcube-taro/modal'
import { forwardRef, isValidElement } from 'react'
import { DrawerProvider } from './context'
import DrawerContent from './drawer-content'
import { useDrawer } from './use'

export interface DrawerProps extends UseDrawerProps {}

const Drawer = forwardRef<DrawerRef, DrawerProps>((props, ref) => {
  const drawer = useDrawer({ ...props, ref })

  const {
    children,
    getModalProps,
  } = drawer

  // Check if children contains DrawerContent
  if (!isValidElement(children) || children.type !== DrawerContent) {
    throw new Error('Drawer children must be DrawerContent')
  }

  return (
    <DrawerProvider value={drawer}>
      <Modal {...getModalProps()}>
        {children}
      </Modal>
    </DrawerProvider>
  )
})

Drawer.displayName = 'Srcube.Drawer'

export default Drawer
