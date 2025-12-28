import type { ModalProps, ModalRef } from '@srcube-taro/ui'
import type { TaroElement } from '@tarojs/runtime'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function ModalPage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const modalRef = useRef<ModalRef>(null)
  const headerRef = useRef<TaroElement>(null)

  const { isLocked } = usePageScrollLock()

  const backdrops: ModalProps['backdrop'][] = ['transparent', 'opaque', 'blur']

  const [backdrop, setBackdrop] = useState<ModalProps['backdrop']>()
  const [isDismissable, setIsDismissable] = useState<boolean>()

  useLayoutEffect(() => {
    if (!headerRef.current)
      return

    console.log('Header Ref: ', headerRef.current)
  }, [isOpen])

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
      <Section title="Default" contentClass="grid grid-cols-2 gap-2">
        <Button color="primary" size="sm" onTap={onOpen}>
          Open
        </Button>
        <Button
          color="primary"
          size="sm"
          onTap={() =>
            modalRef.current?.open()}
        >
          Ref Open
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
      <Modal
        ref={modalRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={backdrop}
        isDismissable={isDismissable}
      >
        <ModalContent>
          <ModalHeader ref={headerRef} className="p-3">
            <View className="text-center text-lg font-semibold">Modal Title</View>
          </ModalHeader>
          <ModalBody className="px-4 py-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatum aspernatur. Eius, odio! Aliquid neque expedita libero ex sunt cupiditate repellendus esse, magni obcaecati officiis recusandae veritatis! Reprehenderit, totam ipsa.
          </ModalBody>
          <ModalFooter className="p-3">
            <Button color="primary" fullWidth onTap={handleClose}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  )
}
