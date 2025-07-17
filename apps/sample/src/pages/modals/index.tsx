import type { ModalProps } from '@srcube-taro/ui'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useCallback, useState } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function Modals() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const { isLocked } = usePageScrollLock()

  const backdrops: ModalProps['backdrop'][] = ['transparent', 'opaque', 'blur']

  const [backdrop, setBackdrop] = useState<ModalProps['backdrop']>()
  const [isDismissable, setIsDismissable] = useState<boolean>()

  const handleOpenWithBackdrop = useCallback((type: ModalProps['backdrop']) => {
    setBackdrop(type)
    onOpen()
  }, [onOpen])

  const handleOpenWithNonDismissable = useCallback(() => {
    setIsDismissable(false)
    onOpen()
  }, [onOpen])

  const reset = useCallback(() => {
    setBackdrop(void 0)
    setIsDismissable(void 0)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      reset()
    }, 500)
  }, [onClose, reset])

  return (
    <Page>
      <PageMeta
        pageStyle={isLocked ? 'overflow: hidden' : ''}
      />
      <Section title="Default" contentClass="">
        <Button color="primary" size="sm" onTap={onOpen}>
          Open Default
        </Button>
      </Section>
      <Section title="Backdrops" contentClass="flex gap-2">
        {backdrops.map(b => (
          <Button
            key={b}
            color="primary"
            size="sm"
            onTap={() => handleOpenWithBackdrop(b)}
          >
            {capitalize(b)}
          </Button>
        ))}
      </Section>
      <Section title="States" contentClass="">
        <Button color="primary" size="sm" onTap={handleOpenWithNonDismissable}>
          Non-dismissible
        </Button>
      </Section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={backdrop} isDismissable={isDismissable}>
        <ModalHeader className="p-3">
          <View className="text-center text-lg font-semibold">Modal Title</View>
        </ModalHeader>
        <ModalBody className="px-4 py-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatum aspernatur. Eius, odio! Aliquid neque expedita libero ex sunt cupiditate repellendus esse, magni obcaecati officiis recusandae veritatis! Reprehenderit, totam ipsa.
        </ModalBody>
        <ModalFooter className="p-3">
          <Button color="primary" isBlock onTap={handleClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Page>
  )
}
