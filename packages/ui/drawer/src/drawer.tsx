import type { DrawerRef, UseDrawerProps } from './use'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { Children, forwardRef, Fragment, isValidElement } from 'react'
import { DrawerProvider } from './context'
import DrawerBody from './drawer-body'
import DrawerFooter from './drawer-footer'
import DrawerHeader from './drawer-header'
import { useDrawer } from './use'

export interface DrawerProps extends UseDrawerProps {}

const Drawer = forwardRef<DrawerRef, DrawerProps>((props, ref) => {
  const drawer = useDrawer({ ...props, ref })

  const {
    title,
    children,
    getModalProps,
  } = drawer

  const directChildren = (children && (children as any).type === Fragment)
    ? (children as any).props.children
    : children

  const childrens = Children.toArray(directChildren)

  const content = childrens.filter(
    c => !(isValidElement(c) && [DrawerHeader, DrawerBody, DrawerFooter].includes(c.type as any)),
  )

  const customHeader = childrens.find(
    c => isValidElement(c) && (c.type as any) === DrawerHeader,
  )

  const customBody = childrens.find(
    c => isValidElement(c) && (c.type as any) === DrawerBody,
  )

  const customFooter = childrens.find(
    c => isValidElement(c) && (c.type as any) === DrawerFooter,
  )

  return (
    <DrawerProvider value={drawer}>
      <Modal {...getModalProps()}>
        {customHeader || (props.title && (
          <ModalHeader>
            {title}
          </ModalHeader>
        ))}
        {customBody || (
          <ModalBody>
            {content}
          </ModalBody>
        )}
        {customFooter || (props.placement !== 'top' && (
          <ModalFooter />
        ))}
      </Modal>
    </DrawerProvider>
  )
})

Drawer.displayName = 'Srcube.Drawer'

export default Drawer
