import type { DialogRef, UseDialogProps } from './use'
import { Modal } from '@srcube-taro/modal'
import { forwardRef, isValidElement } from 'react'
import { DialogProvider } from './context'
import DialogContent from './dialog-content'
import { useDialog } from './use'

export type { DialogRef }

export interface DialogProps extends UseDialogProps {}

const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const dialog = useDialog({ ...props, ref })

  const { children, getModalProps } = dialog

  // Check if children contains DialogContent
  if (!isValidElement(children) || children.type !== DialogContent) {
    throw new Error('Dialog children must be DialogContent')
  }

  return (
    <DialogProvider value={dialog}>
      <Modal {...getModalProps()}>
        {children}
      </Modal>
    </DialogProvider>
  )
})

Dialog.displayName = 'Srcube.Dialog'

export default Dialog
