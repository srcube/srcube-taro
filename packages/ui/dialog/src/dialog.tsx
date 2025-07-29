import type { ButtonProps } from '@srcube-taro/button'
import type { ReactNode } from 'react'
import type { DialogRef, UseDialogProps } from './use'
import { Button, ButtonGroup } from '@srcube-taro/button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { isFunction, isString, isVoid0 } from '@srcube-taro/utils-func'
import { Children, forwardRef, Fragment, isValidElement } from 'react'
import { DialogProvider } from './context'
import DialogBody from './dialog-body'
import DialogFooter from './dialog-footer'
import DialogHeader from './dialog-header'
import { useDialog } from './use'

export interface DialogProps extends UseDialogProps {}

const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const dialog = useDialog({ ...props, ref })

  const {
    t,
    styles,
    title,
    isConfirmOnly,
    cancelContent,
    confirmContent,
    children,
    getModalProps,
    getCancelProps,
    getConfirmProps,
  } = dialog

  const directChildren = (children && (children as any).type === Fragment)
    ? (children as any).props.children
    : children

  const childrens = Children.toArray(directChildren)

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
        <content.type {...props} {...content.props}>
          {content.props.children}
        </content.type>
      )
    }
    return content
  }

  const cancelAction = renderAction(cancelContent, t('dialog.action.cancel'), getCancelProps)
  const confirmAction = renderAction(confirmContent, t('dialog.action.confirm'), getConfirmProps)

  return (
    <DialogProvider value={dialog}>
      <Modal {...getModalProps()}>
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
            <ButtonGroup size="lg" isBlock className={styles.actionGroup}>
              {!isConfirmOnly && (
                cancelAction
              )}
              {confirmAction}
            </ButtonGroup>
          </ModalFooter>
        )}
      </Modal>
    </DialogProvider>
  )
})

Dialog.displayName = 'Srcube.Dialog'

export default Dialog
