import { RootPortal, View } from '@tarojs/components'
import { closeToast } from './registry'
import { Toast } from './toast'
import { useToaster } from './use'

export interface ToasterProps {}

export function Toaster(props: ToasterProps) {
  const { styles, toasts } = useToaster(props)

  if (toasts.length === 0) {
    return null
  }

  return (
    <RootPortal>
      <View className={styles.wrapper}>
        {toasts.map(t => (
          <Toast
            key={t.id}
            title={t.title}
            content={t.content}
            color={t.color}
            icon={t.icon}
            endContent={t.endContent}
            duration={t.duration}
            autoDismiss={t.autoDismiss}
            onClose={() => closeToast(t.id)}
          />
        ))}
      </View>
    </RootPortal>
  )
}

Toaster.displayName = 'SrucbeUI.Toaster'

export default Toaster
