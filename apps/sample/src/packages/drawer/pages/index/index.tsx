import type { DrawerProps } from '@srcube-taro/ui'
import { Button, Drawer, DrawerContent, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { capitalize } from 'lodash-es'
import { useState } from 'react'
import { Page, Section } from '@/components'

export default function Drawers() {
  const PLACEMENT = useDisclosure()

  const placements: DrawerProps['placement'][] = ['top', 'bottom', 'left', 'right']

  const { isLocked } = usePageScrollLock()

  const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom')

  const handlePlacementOpen = (p: DrawerProps['placement']) => {
    setPlacement(p)

    PLACEMENT.onOpen()
  }

  return (
    <Page>
      <PageMeta pageStyle={isLocked ? 'overflow: hidden' : ''} />
      {/* Placements */}
      <Section title="Placements" contentClass="grid grid-cols-4 gap-2">
        {placements.map(p => (
          <Button key={p} color="primary" size="sm" onTap={() => handlePlacementOpen(p)}>
            {capitalize(p)}
          </Button>
        ))}

        <Drawer
          isOpen={PLACEMENT.isOpen}
          onOpenChange={PLACEMENT.onOpenChange}
          placement={placement}
          title={`${capitalize(placement)} Drawer`}
        >
          <DrawerContent>
            This drawer slides up from the {placement} of the screen.
          </DrawerContent>
        </Drawer>
      </Section>

      {/* Auto Safe Area */}
      <Section title="Auto Sare Area" contentClass="">
        <Button
          color="primary"
          size="sm"
          onTap={() => {
            Taro.navigateTo({ url: '/packages/drawer/pages/auto-safe-area/index' })
          }}
        >
          To Page
        </Button>
      </Section>
    </Page>
  )
}
