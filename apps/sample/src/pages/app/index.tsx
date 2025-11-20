import {
  Button,
  DialogBody,
  DialogContent,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  openDialog,
  openDrawer,
  openModal,
  SrcubeUI,
  usePageScrollLock,
} from '@srcube-taro/ui'
import { PageMeta } from '@tarojs/components'
import { useCallback } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function App() {
  const { isLocked } = usePageScrollLock()

  const handleOpenModal = useCallback(() => {
    const modal = openModal({
      content: (
        <ModalContent>
          <ModalHeader className="flex items-center justify-center p-4 text-lg font-medium">
            Modal
          </ModalHeader>
          <ModalBody className="px-4 py-3">
            This is an `openModal` call. Can be closed by calling the `close` field of the returned object.
          </ModalBody>
          <ModalFooter className="p-4">
            <Button color="primary" isBlock onTap={() => modal.close()}>
              Close Call
            </Button>
          </ModalFooter>
        </ModalContent>
      ),
    })
  }, [])

  const handleOpenDialog = useCallback(() => {
    const dialog = openDialog({
      title: 'Dialog Title',
      content: (
        <DialogContent>
          <DialogBody className="flex flex-col items-center justify-center gap-4">
            This is an `openDialog` call. Can be closed by calling the `close` field of the returned object.
            <Button color="danger" isBlock onTap={() => dialog.close()}>
              Close Call
            </Button>
          </DialogBody>
        </DialogContent>
      ),
    })
  }, [])

  const handleOpenDrawer = useCallback(() => {
    const drawer = openDrawer({
      title: 'Drawer Title',
      content: (
        <DrawerContent>
          <DrawerBody className="flex flex-col items-center justify-center gap-4">
            This is an `openDrawer` call. Can be closed by calling the `close` field of the returned object.
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" isBlock onTap={() => drawer.close()}>
              Close Call
            </Button>
          </DrawerFooter>
        </DrawerContent>
      ),
    })
  }, [])

  const handleOpenComposed = useCallback(() => {
    const dialog = openDialog({
      title: 'Dialog Title',
      onConfirm: () => {
        const drawer = openDrawer({
          title: 'Drawer Title',
          placement: 'bottom',
          content: (
            <DrawerContent>
              <DrawerBody>This is an `openDrawer` call with dialog confirm.</DrawerBody>
              <DrawerFooter>
                <Button
                  color="danger"
                  isBlock
                  onTap={() => {
                    dialog.close()
                    drawer.close()
                  }}
                >
                  Close Both
                </Button>
              </DrawerFooter>
            </DrawerContent>
          ),
        })
        return false
      },
      content: (
        <DialogContent>
          This is an `openDialog` call. Confirm need to return `false` to prevent default close.
        </DialogContent>
      ),
    })
  }, [])

  // const colors: ToastProps['color'][] = ['primary', 'success', 'warning', 'danger']

  // const handleOpenToast = useCallback(({ color }: { color: ToastProps['color'] }) => {
  //   toast({
  //     content: `This is a toast message!${new Date().getTime()}`,
  //     duration: 300000,
  //     color,
  //   })
  // }, [])

  // const handleOpenToastWithAction = useCallback(() => {
  //   const toastInstance = toast({
  //     content: 'Toast with action button',
  //     duration: 5000,
  //     color: 'warning',
  //     endContent: (
  //       <Button
  //         size="sm"
  //         color="primary"
  //         onTap={() => {
  //           toast({ content: 'Action clicked!', duration: 2000, color: 'primary' })
  //           toastInstance.close()
  //         }}
  //       >
  //         Action
  //       </Button>
  //     ),
  //   })
  // }, [])

  return (
    <SrcubeUI>
      <Page>
        <PageMeta pageStyle={isLocked ? 'overflow: hidden' : ''} />
        <Section title="Overlays" contentClass="grid grid-cols-3 gap-2">
          <Button color="primary" size="sm" onTap={handleOpenModal}>
            openModal
          </Button>
          <Button color="primary" size="sm" onTap={handleOpenDialog}>
            openDialog
          </Button>
          <Button color="primary" size="sm" onTap={handleOpenDrawer}>
            openDrawer
          </Button>
          <Button color="primary" size="sm" onTap={handleOpenComposed}>
            Composed
          </Button>

        </Section>
        {/* <Section title="Toasts" contentClass="grid grid-cols-3 gap-2">
          {colors.map(color => (
            <Button key={color} color={color as ToastProps['color']} size="sm" onTap={() => handleOpenToast({ color })}>
              {color}
            </Button>
          ))}
          <Button color="warning" size="sm" onTap={handleOpenToastWithAction}>
            Toast Action
          </Button>
        </Section> */}
      </Page>
    </SrcubeUI>
  )
}
