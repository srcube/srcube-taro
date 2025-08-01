import type { ButtonProps } from '@srcube-taro/button'
import type { ModalProps, ModalRef } from '@srcube-taro/modal'
import type { DialogSlots, DialogVariantProps } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps } from '@srcube-taro/utils-types'
import type { ITouchEvent } from '@tarojs/components'
import type { ReactNode } from 'react'
import { useAnimatePresence, useOverlayTriggerState } from '@srcube-taro/hooks'
import { dialog } from '@srcube-taro/theme'
import { withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'

interface Props extends ModalProps {
  /**
   * Dialog type color
   * @default primary
   */
  color?: ButtonProps['color']
  /**
   * Dialog title
   */
  title?: ReactNode
  /**
   * i18n
   * @default en
   */
  lang?: 'en' | 'zh-CN' | 'zh-TW'
  /**
   * Only display confirm action
   */
  isConfirmOnly?: boolean
  /**
   * Cancel content
   */
  cancelContent?: ((props: ButtonProps) => ReactNode) | ReactNode | string
  /**
   * Confirm content
   */
  confirmContent?: ((props: ButtonProps) => ReactNode) | ReactNode | string
  /**
   * Classnames to apply to the dialog
   */
  classNames?: SlotsToClasses<Exclude<DialogSlots, ''>>
  /**
   * Dialog cancel event
   * @param e Touch event
   * @returns void | boolean | Promise<void | boolean>
   */
  onCancel?: (e: ITouchEvent) => (void | boolean) | Promise<void | boolean>
  /**
   * Dialog confirm event
   * @param e Touch event
   * @returns void | boolean | Promise<void | boolean>
   */
  onConfirm?: (e: ITouchEvent) => (void | boolean) | Promise<void | boolean>
}

export interface DialogRef extends ModalRef {}

export type UseDialogProps = MergeVariantProps<Props, DialogVariantProps>

export function useDialog(props: UseDialogProps) {
  const {
    ref,
    isOpen: isOpenProp,
    defaultOpen,
    isDismissable = false,
    isConfirmOnly = false,
    title,
    color = 'primary',
    lang = 'en',
    cancelContent,
    confirmContent,
    children,
    className,
    classNames,
    onOpenChange,
    onCancel,
    onConfirm,
    onClose,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const { t } = useTranslation(void 0, { lng: lang })

  const { isOpen, open, close } = useOverlayTriggerState({
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen)
      if (!isOpen) {
        onClose?.()
      }
    },
  })

  const { isClosing } = useAnimatePresence({ isOpen })

  const [cancelLoading, setCancelLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const isAnyLoading = useMemo(() => {
    return cancelLoading || confirmLoading || isClosing
  }, [cancelLoading, confirmLoading, isClosing])

  const slots = useMemo(() => dialog({ isOpen, isConfirmOnly }), [isOpen, isConfirmOnly])

  const styles = useMemo(
    () => ({
      wrapper: slots.wrapper({ class: cn([classNames?.wrapper, className]) }),
      backdrop: slots.backdrop({ class: classNames?.backdrop }),
      content: slots.content({ class: classNames?.content }),
      header: slots.header({ class: classNames?.header }),
      body: slots.body({ class: classNames?.body }),
      footer: slots.footer({ class: classNames?.footer }),
      actionGroup: slots.actionGroup({ class: classNames?.actionGroup }),
      actionButton: slots.actionButton({}),
    }),
    [slots, className, classNames],
  )

  const handleCancel = useCallback(async (e: ITouchEvent) => {
    if (!onCancel) {
      close()
      return
    }

    const autoClose = await withLoading(onCancel, setCancelLoading, e)

    if (autoClose !== false)
      close()
  }, [close, onCancel, setCancelLoading])

  const handleConfirm = useCallback(async (e: ITouchEvent) => {
    if (!onConfirm) {
      close()
      return
    }

    const autoClose = await withLoading(onConfirm, setConfirmLoading, e)

    if (autoClose !== false)
      close()
  }, [close, onConfirm, setConfirmLoading])

  const getModalProps = useCallback((): ModalProps => {
    return {
      ref: domRef,
      isOpen,
      defaultOpen,
      isDismissable,
      onOpenChange,
      onClose: close,
      classNames: styles,
      ...rest,
    }
  }, [domRef, isOpen, defaultOpen, isDismissable, onOpenChange, close, styles, rest])

  const getCancelProps = useCallback((): ButtonProps => {
    return {
      color: 'default',
      variant: 'flat',
      isDisabled: isAnyLoading,
      isLoading: cancelLoading,
      className: styles.actionButton,
      onTap: handleCancel,
    }
  }, [isAnyLoading, cancelLoading, styles, handleCancel])

  const getConfirmProps = useCallback((): ButtonProps => {
    return {
      color,
      isDisabled: isAnyLoading,
      isLoading: confirmLoading,
      className: styles.actionButton,
      onTap: handleConfirm,
    }
  }, [color, isAnyLoading, confirmLoading, styles, handleConfirm])

  return {
    domRef,
    t,
    slots,
    styles,
    classNames,
    title,
    isOpen,
    isDismissable,
    isConfirmOnly,
    cancelLoading,
    confirmLoading,
    cancelContent,
    confirmContent,
    children,
    open,
    close,
    onConfirm,
    onCancel,
    getModalProps,
    getCancelProps,
    getConfirmProps,
  }
}

export type UseDialogReturn = ReturnType<typeof useDialog>
