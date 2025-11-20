import type { ButtonProps, DialogProps, DialogRef } from '@srcube-taro/ui'
import { Button, Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useCallback, useRef, useState } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

const LANG_MAP: Record<NonNullable<DialogProps['lang']>, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
}

export default function Dialogs() {
  const DEFAULT = useDisclosure()
  const COLORS = useDisclosure()
  const ASYNC_ACTION = useDisclosure()
  const CONFIRM_ONLY = useDisclosure()
  const I18N = useDisclosure()
  const CUSTOM_CONTENT = useDisclosure()
  const CUSTOM_ACTION_STRING = useDisclosure()
  const CUSTOM_ACTION_FUNC = useDisclosure()

  const dialogRef = useRef<DialogRef>(null)

  const { isLocked } = usePageScrollLock()

  const [color, setColor] = useState<ButtonProps['color']>('primary')
  const [lang, setLang] = useState<DialogProps['lang']>('en')

  const handleOpenColors = useCallback((c: ButtonProps['color']) => {
    setColor(c)
    COLORS.onOpen()
  }, [COLORS])

  const handleOpenLangs = useCallback((l: DialogProps['lang']) => {
    setLang(l)
    I18N.onOpen()
  }, [I18N])

  const handleAsyncAction = useCallback(async () => {
    await new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, 3000)
    })
  }, [])

  return (
    <Page>
      <PageMeta
        pageStyle={isLocked ? 'overflow: hidden' : ''}
      />
      {/* Default */}
      <Section title="Default" contentClass="grid grid-cols-2 gap-2">
        <Button color="primary" size="sm" onTap={DEFAULT.onOpen}>
          Open
        </Button>
        <Button
          color="primary"
          size="sm"
          onTap={() =>
            dialogRef.current?.open()}
        >
          Ref Open
        </Button>
        <Dialog
          ref={dialogRef}
          isOpen={DEFAULT.isOpen}
          onOpenChange={DEFAULT.onOpenChange}
          title="Dialog Title"
        >
          {/* <ModalBackdrop onTap={() => { console.log('HELLO WORLD') }} /> */}
          <DialogContent>
            This is a dialog with default preset.
          </DialogContent>
        </Dialog>
      </Section>
      {/* Colors */}
      <Section title="Colors" contentClass="grid grid-cols-4 gap-2">
        {(['primary', 'success', 'warning', 'danger'] as ButtonProps['color'][]).map(c => (
          <Button
            key={c}
            color={c}
            size="sm"
            onTap={() => handleOpenColors(c)}
          >
            {capitalize(c)}
          </Button>
        ),
        )}
        <Dialog
          isOpen={COLORS.isOpen}
          onOpenChange={COLORS.onOpenChange}
          title="Color Dialog"
          color={color}
        >
          <DialogContent>
            This dialog is assigned the `color` prop with `{color}` preset.
          </DialogContent>
        </Dialog>
      </Section>
      {/* Async Action */}
      <Section title="Async Action" contentClass="">
        <Button color="primary" size="sm" onTap={ASYNC_ACTION.onOpen}>
          Open
        </Button>
        <Dialog
          isOpen={ASYNC_ACTION.isOpen}
          onOpenChange={ASYNC_ACTION.onOpenChange}
          title="Async Action"
          onCancel={handleAsyncAction}
          onConfirm={handleAsyncAction}
        >
          <DialogContent>
            This dialog is assigned the `onCancel` and `onConfirm` props with async function.
          </DialogContent>
        </Dialog>
      </Section>
      {/* Confirm Only */}
      <Section title="Confirm Only" contentClass="">
        <Button color="primary" size="sm" onTap={CONFIRM_ONLY.onOpen}>
          Open
        </Button>
        <Dialog
          isOpen={CONFIRM_ONLY.isOpen}
          onOpenChange={CONFIRM_ONLY.onOpenChange}
          title="Confirm Only"
          isConfirmOnly
        >
          <DialogContent>
            This dialog is assigned the `isConfirmOnly` props with `true` to control display confirm action only.
          </DialogContent>
        </Dialog>
      </Section>
      <Section title="Custom Action" contentClass="grid grid-cols-3 gap-2">
        <Button color="primary" size="sm" onTap={CUSTOM_ACTION_STRING.onOpen}>
          String
        </Button>
        <Button color="primary" size="sm" onTap={CUSTOM_ACTION_FUNC.onOpen}>
          Func/Node
        </Button>
        <Dialog
          isOpen={CUSTOM_ACTION_STRING.isOpen}
          onOpenChange={CUSTOM_ACTION_STRING.onOpenChange}
          title="Custom Actin"
          cancelContent="Close"
          confirmContent="Ok"
        >
          <DialogContent>
            This dialog is assigned the `cancelContent` and `confirmContent` props with strings.
          </DialogContent>
        </Dialog>
        <Dialog
          isOpen={CUSTOM_ACTION_FUNC.isOpen}
          onOpenChange={CUSTOM_ACTION_FUNC.onOpenChange}
          title="Custom Action"
          cancelContent={props => <Button {...props} variant="solid" color="warning">No</Button>}
          confirmContent={props => <Button {...props} color="success">Sure</Button>}
        >
          <DialogContent>
            This dialog is assigned the `cancelContent` and `confirmContent` props with functions that have preset button props or plain React components.
          </DialogContent>
        </Dialog>
      </Section>
      {/* i18n */}
      <Section title="i18n" contentClass="grid grid-cols-3 gap-2">
        {(['en', 'zh-CN', 'zh-TW'] as DialogProps['lang'][])
          .map((l: NonNullable<DialogProps['lang']>) => (
            <Button key={l} color="primary" size="sm" onTap={() => handleOpenLangs(l)}>
              {`${LANG_MAP[l]}`}
            </Button>
          ))}
        <Dialog
          isOpen={I18N.isOpen}
          onOpenChange={I18N.onOpenChange}
          title="i18n"
          lang={lang}
        >
          <DialogContent>
            This dialog is assigned the `lang` prop with `{lang}`.
          </DialogContent>
        </Dialog>
      </Section>
      {/* Custom Header/Body/Footer */}
      <Section title="Custom Header/Body/Footer" contentClass="">
        <Button color="primary" size="sm" onTap={CUSTOM_CONTENT.onOpen}>
          Open
        </Button>
        <Dialog
          isOpen={CUSTOM_CONTENT.isOpen}
          onOpenChange={CUSTOM_CONTENT.onOpenChange}
        >
          <DialogContent>
            <DialogHeader className="text-base text-primary font-medium">
              Hola
            </DialogHeader>
            <DialogBody className="text-xs text-zinc-500 font-medium">
              This dialog with `DialogHeader`, `DialogBody` and `DialogFooter` slots to display user custom contents.
            </DialogBody>
            <DialogFooter className="flex justify-end">
              <Button color="primary" onTap={CUSTOM_CONTENT.onClose}>I'm sure</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>
    </Page>
  )
}
