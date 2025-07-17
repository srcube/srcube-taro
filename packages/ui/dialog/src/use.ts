import type { ButtonProps } from '@srcube-taro/button'
import type { ModalProps } from '@srcube-taro/modal'
import type { DialogSlots } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ITouchEvent, ViewProps } from '@tarojs/components'
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
   * Ref to the DOM element
   */
  ref?: ReactRef
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
   */
  onCancel?: ButtonProps['onTap']
  /**
   * Dialog confirm event
   */
  onConfirm?: ButtonProps['onTap']

}

export type UseDialogProps = Props &
  Omit<NativeProps<ViewProps>, ''>

export function useDialog(props: UseDialogProps) {
  const {
    ref,
    isOpen,
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
    onClose,
    onCancel,
    onConfirm,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const { t } = useTranslation(void 0, { lng: lang })

  const { isClosing } = useAnimatePresence({ isOpen })

  const [cancelLoading, setCancelLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const isAnyLoading = useMemo(() => {
    return cancelLoading || confirmLoading || isClosing
  }, [cancelLoading, confirmLoading, isClosing])

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen)
      if (!isOpen) {
        onClose?.()
      }
    },
  })

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
      state.close()
      return
    }

    await withLoading(onCancel, setCancelLoading, e)

    state.close()
  }, [state, onCancel, setCancelLoading])

  const handleConfirm = useCallback(async (e: ITouchEvent) => {
    if (!onConfirm) {
      state.close()
      return
    }

    await withLoading(onConfirm, setConfirmLoading, e)

    state.close()
  }, [state, onConfirm, setConfirmLoading])

  const getModalProps = useCallback((): ModalProps => {
    return {
      ref: domRef,
      isOpen,
      defaultOpen,
      isDismissable,
      onOpenChange,
      onClose,
      className: styles.wrapper,
      classNames: styles,
      ...rest,
    }
  }, [domRef, isOpen, defaultOpen, isDismissable, onOpenChange, onClose, styles, rest])

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
    title,
    isOpen: state.isOpen,
    isDismissable,
    isConfirmOnly,
    cancelLoading,
    confirmLoading,
    cancelContent,
    confirmContent,
    children,
    onClose: state.close,
    onConfirm,
    onCancel,
    getModalProps,
    getCancelProps,
    getConfirmProps,
  }
}

export type UseDialogReturn = ReturnType<typeof useDialog>
