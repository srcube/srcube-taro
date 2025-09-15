import type { ToastProps } from '@srcube-taro/ui'
import { addToast, Button, Toaster } from '@srcube-taro/ui'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

const colors: ToastProps['color'][] = ['light', 'dark', 'primary', 'success', 'warning', 'danger']

const capitalize = (str: string | undefined) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export default function Toasts() {
  const showToast = (color: ToastProps['color']) => {
    addToast({
      title: color?.toUpperCase(),
      content: 'A Toast Message',
      color,
    })
  }

  return (
    <Page>
      <Section title="Colors" contentClass="grid grid-cols-3 gap-2">
        {colors.map(color => (
          <Button
            key={color}
            color="primary"
            size="sm"
            onTap={() => showToast(color)}
          >
            {capitalize(color)}
          </Button>
        ))}
      </Section>
      <Toaster />
    </Page>
  )
}
