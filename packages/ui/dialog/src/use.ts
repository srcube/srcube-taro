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
import { useCallback, useMemo, useState } from 'react'
import i18n from './i18n'

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
  locale?: 'en' | 'zh-CN' | 'zh-TW'
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
    locale = 'en',
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

  const t = i18n[locale]

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

    try {
      const autoClose = await withLoading(onConfirm, setConfirmLoading, e)

      if (autoClose !== false)
        close()
    }
    catch (error) {
      // @ts-expect-error ignore process type error
      if (process.env.NODE_ENV === 'development') {
        console.error('[Dialog] Confirm action failed:', error)
      }
    }
    finally {
      setConfirmLoading(false)
    }
  }, [close, onConfirm, setConfirmLoading])

  const getModalProps = useCallback((): ModalProps => {
    return {
      ref: domRef,
      isOpen,
      defaultOpen,
      isDismissable,
      onOpenChange,
      onClose: close,
      classNames: {
        'root-portal': slots['root-portal']({ className: classNames?.['root-portal'] }),
        'backdrop': slots.backdrop({ className: classNames?.backdrop }),
        'content': slots.content({ className: [classNames?.content, className] }),
        'header': slots.header({ className: classNames?.header }),
        'body': slots.body({ className: classNames?.body }),
        'footer': slots.footer({ className: classNames?.footer }),
      },
      ...rest,
    }
  }, [domRef, isOpen, defaultOpen, isDismissable, onOpenChange, close, slots, classNames, className, rest])

  const getCancelProps = useCallback((): ButtonProps => {
    return {
      color: 'default',
      variant: 'flat',
      isDisabled: isAnyLoading,
      isLoading: cancelLoading,
      className: slots.actionButton({ className: classNames?.actionButton }),
      onTap: handleCancel,
    }
  }, [isAnyLoading, cancelLoading, slots, classNames, handleCancel])

  const getConfirmProps = useCallback((): ButtonProps => {
    return {
      color,
      variant: 'flat',
      isDisabled: isAnyLoading,
      isLoading: confirmLoading,
      className: slots.actionButton({ className: classNames?.actionButton }),
      onTap: handleConfirm,
    }
  }, [color, isAnyLoading, confirmLoading, slots, classNames, handleConfirm])

  return {
    domRef,
    slots,
    classNames,
    t,
    title,
    locale,
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
