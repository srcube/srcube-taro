import type { ModalProps } from '@srcube-taro/ui'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useCallback, useState } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function Buttons() {
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

  return (
    <Page className="flex flex-col gap-4 py-4">
      <PageMeta
        pageStyle={isLocked ? 'overflow: hidden' : ''}
      />
      <Section title="Default" contentClass="">
        <Button color="primary" onTap={onOpen}>
          Open Default
        </Button>
      </Section>
      <Section title="Backdrops" contentClass="flex gap-2">
        {backdrops.map(b => (
          <Button
            key={b}
            color="primary"
            onTap={() => handleOpenWithBackdrop(b)}
          >
            {capitalize(b)}
          </Button>
        ))}
      </Section>
      <Section title="States" contentClass="">
        <Button color="primary" onTap={handleOpenWithNonDismissable}>
          Non-dismissible
        </Button>
      </Section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={backdrop} isDismissable={isDismissable}>
        <ModalContent>
          <ModalHeader>
            <View className="text-center text-lg font-semibold">Modal Title</View>
          </ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, voluptatum aspernatur. Eius, odio! Aliquid neque expedita libero ex sunt cupiditate repellendus esse, magni obcaecati officiis recusandae veritatis! Reprehenderit, totam ipsa.
          </ModalBody>
          <ModalFooter className="">
            <Button color="primary" isBlock onTap={onClose}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  )
}
