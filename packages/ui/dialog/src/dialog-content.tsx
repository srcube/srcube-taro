import type { ButtonProps } from '@srcube-taro/button'
import type { ModalContentProps } from '@srcube-taro/modal'
import type { TaroElement } from '@tarojs/runtime'
import type { ReactNode } from 'react'
import { Button, ButtonGroup } from '@srcube-taro/button'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@srcube-taro/modal'
import { isFunction, isString, isVoid0 } from '@srcube-taro/utils-func'
import { Children, forwardRef, isValidElement } from 'react'
import { useDialogContext } from './context'
import DialogBody from './dialog-body'
import DialogFooter from './dialog-footer'
import DialogHeader from './dialog-header'

export interface DialogContentProps extends ModalContentProps {}

const DialogContent = forwardRef<TaroElement, DialogContentProps>((props, ref) => {
  const { children, ...rest } = props

  const {
    t,
    slots,
    classNames,
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
    key: string,
    content: ((props: ButtonProps) => ReactNode) | ReactNode | string | undefined,
    defaultText: ReactNode,
    getProps: () => ButtonProps,
  ): ReactNode => {
    const props = getProps()

    if (isVoid0(content)) {
      return <Button {...props} key={key}>{defaultText}</Button>
    }
    if (isFunction(content)) {
      return content(props)
    }
    if (isString(content)) {
      return <Button {...props} key={key}>{content}</Button>
    }
    if (isValidElement(content)) {
      return (
        <content.type {...props} {...(content.props as any)} key={key}>
          {(content.props as any).children}
        </content.type>
      )
    }
    return content
  }

  const cancelAction = renderAction('dialog-cancel', cancelContent, t.cancel, getCancelProps)
  const confirmAction = renderAction('dialog-confirm', confirmContent, t.confirm, getConfirmProps)

  return (
    <ModalContent ref={ref} {...rest}>
      {customHeader || (
        <ModalHeader>
          {title}
        </ModalHeader>
      )}
      {customBody || (
        <ModalBody>
          {content}
        </ModalBody>
      )}
      {customFooter || (
        <ModalFooter>
          <ButtonGroup size="lg" fullWidth className={slots.actionGroup({ className: classNames?.actionGroup })}>
            {[!isConfirmOnly && cancelAction, confirmAction].filter(Boolean) as React.ReactElement<ButtonProps>[]}
          </ButtonGroup>
        </ModalFooter>
      )}
    </ModalContent>
  )
})

DialogContent.displayName = 'Srcube.DialogContent'

export default DialogContent
