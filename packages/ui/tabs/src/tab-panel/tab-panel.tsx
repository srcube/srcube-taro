import type { TaroElement } from '@tarojs/runtime'
import type { UseTabPanelProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useTabPanel } from './use'

export interface TabPanelProps<T extends object = object> extends UseTabPanelProps<T> {}

const TabPanel = forwardRef<TaroElement, TabPanelProps>((props, ref) => {
  const { domRef, isSelected, content, getPanelProps } = useTabPanel({ ...props, ref })

  if (!content || (!isSelected && props.destroyInactiveTabPanel))
    return null

  return (
    <View ref={domRef} {...getPanelProps()}>
      {content}
    </View>
  )
})

TabPanel.displayName = 'Srcube.TabPanel'

export default TabPanel
