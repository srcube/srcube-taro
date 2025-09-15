import type { DrawerRef } from './use'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { Children, forwardRef, isValidElement } from 'react'
import { useDrawerContext } from './context'
import DrawerBody from './drawer-body'
import DrawerFooter from './drawer-footer'
import DrawerHeader from './drawer-header'

export interface DrawerContentProps {
  className?: string
  children?: React.ReactNode
}

const DrawerContent = forwardRef<DrawerRef, DrawerContentProps>((props, ref) => {
  const { className, children, ...rest } = props

  const {
    styles,
    title,
    placement,
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
    <ModalContent ref={ref} className={className || styles.content} {...rest}>
      {customHeader || (title && (
        <ModalHeader className={styles.header}>
          {title}
        </ModalHeader>
      ))}
      {customBody || (
        <ModalBody className={styles.body}>
          {content}
        </ModalBody>
      )}
      {customFooter || (placement !== 'top' && (
        <ModalFooter className={styles.footer} />
      ))}
    </ModalContent>
  )
})

DrawerContent.displayName = 'Srcube.DrawerContent'

export default DrawerContent
