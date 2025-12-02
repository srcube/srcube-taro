import type { ButtonProps } from '@srcube-taro/button'
import type { ReactNode } from 'react'
import type { DialogRef } from './use'
import { Button, ButtonGroup } from '@srcube-taro/button'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { isFunction, isString, isVoid0 } from '@srcube-taro/utils-func'
import { Children, forwardRef, isValidElement } from 'react'
import { useDialogContext } from './context'
import DialogBody from './dialog-body'
import DialogFooter from './dialog-footer'
import DialogHeader from './dialog-header'

export interface DialogContentProps {
  className?: string
  children?: React.ReactNode
}

const DialogContent = forwardRef<DialogRef, DialogContentProps>((props, ref) => {
  const { className, children, ...rest } = props

  const {
    t,
    styles,
    title,
    isConfirmOnly,
    cancelContent,
    confirmContent,
    getCancelProps,
    getConfirmProps,
  } = useDialogContext()

  const childrens = Children.toArray(children)

  const content = childrens.filter(
    c => !(isValidElement(c) && [DialogHeader, DialogBody, DialogFooter].includes(c.type as any)),
  )

  const customHeader = childrens.find(
    c => isValidElement(c) && c.type === DialogHeader,
  )

  const customBody = childrens.find(
    c => isValidElement(c) && c.type === DialogBody,
  )

  const customFooter = childrens.find(
    c => isValidElement(c) && c.type === DialogFooter,
  )

  const renderAction = (
    content: ((props: ButtonProps) => ReactNode) | ReactNode | string | undefined,
    defaultText: ReactNode,
    getProps: () => ButtonProps,
  ): ReactNode => {
    const props = getProps()

    if (isVoid0(content)) {
      return <Button {...props}>{defaultText}</Button>
    }
    if (isFunction(content)) {
      return content(props)
    }
    if (isString(content)) {
      return <Button {...props}>{content}</Button>
    }
    if (isValidElement(content)) {
      return (
        <content.type {...props} {...(content.props as any)}>
          {(content.props as any).children}
        </content.type>
      )
    }
    return content
  }

  const cancelAction = renderAction(cancelContent, t.cancel, getCancelProps)
  const confirmAction = renderAction(confirmContent, t.confirm, getConfirmProps)

  return (
    <ModalContent ref={ref} className={className || styles.content} {...rest}>
      {customHeader || (
        <ModalHeader className={styles.header}>
          {title}
        </ModalHeader>
      )}
      {customBody || (
        <ModalBody className={styles.body}>
          {content}
        </ModalBody>
      )}
      {customFooter || (
        <ModalFooter className={styles.footer}>
          <ButtonGroup size="lg" fullWidth className={styles.actionGroup}>
            {[!isConfirmOnly && cancelAction, confirmAction].filter(Boolean) as React.ReactElement<ButtonProps>[]}
          </ButtonGroup>
        </ModalFooter>
      )}
    </ModalContent>
  )
})

DialogContent.displayName = 'Srcube.DialogContent'

export default DialogContent
