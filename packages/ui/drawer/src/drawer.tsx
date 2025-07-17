import type { TaroElement } from '@tarojs/runtime'
import type { FC } from 'react'
import type { UseDrawerProps } from './use'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { Children, forwardRef, isValidElement } from 'react'
import DrawerBody from './drawer-body'
import DrawerFooter from './drawer-footer'
import DrawerHeader from './drawer-header'
import { useDrawer } from './use'

export interface DrawerProps extends UseDrawerProps {}

const Drawer = forwardRef<TaroElement, DrawerProps>((props, ref) => {
  const {
    title,
    children,
    getModalProps,
  } = useDrawer({
    ...props,
    ref,
  })

  const childrens = Children.toArray(children)

  const content = childrens.filter(
    c => !(isValidElement(c) && [DrawerHeader, DrawerBody, DrawerFooter].includes(c.type as FC<any>)),
  )

  const customHeader = childrens.find(
    c => isValidElement(c) && c.type === DrawerHeader,
  )

  const customBody = childrens.find(
    c => isValidElement(c) && c.type === DrawerBody,
  )

  const customFooter = childrens.find(
    c => isValidElement(c) && c.type === DrawerFooter,
  )

  return (
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
      {customFooter || props.placement === 'top' || (
        <ModalFooter />
      )}
    </Modal>
  )
})

Drawer.displayName = 'Srcube.Drawer'

export default Drawer
