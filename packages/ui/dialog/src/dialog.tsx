import type { ButtonProps } from '@srcube-taro/button'
import type { TaroElement } from '@tarojs/runtime'
import type { FC, ReactNode } from 'react'
import type { UseDialogProps } from './use'
import { Button, ButtonGroup } from '@srcube-taro/button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { isFunc, isString, isUndefined } from '@srcube-taro/utils-func'
import { Children, forwardRef, isValidElement } from 'react'
import DialogBody from './dialog-body'
import DialogFooter from './dialog-footer'
import DialogHeader from './dialog-header'
import { useDialog } from './use'

export interface DialogProps extends UseDialogProps {}

const Dialog = forwardRef<TaroElement, DialogProps>((props, ref) => {
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
  } = useDialog({
    ...props,
    ref,
  })

  const childrens = Children.toArray(children)

  const content = childrens.filter(
    c => !(isValidElement(c) && [DialogHeader, DialogBody, DialogFooter].includes(c.type as FC<any>)),
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

    if (isUndefined(content)) {
      return <Button {...props}>{defaultText}</Button>
    }
    if (isFunc(content)) {
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
  )
})

Dialog.displayName = 'Srcube.Dialog'

export default Dialog
