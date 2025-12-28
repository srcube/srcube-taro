import type { ModalContentProps } from '@srcube-taro/modal'
import type { TaroElement } from '@tarojs/runtime'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { Children, forwardRef, isValidElement } from 'react'
import { useDrawerContext } from './context'
import DrawerBody from './drawer-body'
import DrawerFooter from './drawer-footer'
import DrawerHeader from './drawer-header'

export interface DrawerContentProps extends ModalContentProps {}

const DrawerContent = forwardRef<TaroElement, DrawerContentProps>((props, ref) => {
  const { children, ...rest } = props

  const {
    title,
    // placement,
  } = useDrawerContext()

  const childrens = Children.toArray(children)

  const content = childrens.filter(
    c => !(isValidElement(c) && [DrawerHeader, DrawerBody, DrawerFooter].includes(c.type as any)),
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
    <ModalContent ref={ref} {...rest}>
      {customHeader || (title && (
        <ModalHeader>
          {title}
        </ModalHeader>
      ))}
      {customBody || (
        <ModalBody>
          {content}
        </ModalBody>
      )}
      {customFooter || (
        <ModalFooter />
      )}
    </ModalContent>
  )
})

DrawerContent.displayName = 'Srcube.DrawerContent'

export default DrawerContent
