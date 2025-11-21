import type { DrawerProps } from '@srcube-taro/ui'
import { Box, Button, Drawer, DrawerContent, useDisclosure, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Page, Section } from '@/components'

export default function Drawers() {
  const { isLocked } = usePageScrollLock()

  const DRAWER = useDisclosure()

  const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom')

  const handlePlacementOpen = (p: DrawerProps['placement']) => {
    setPlacement(p)

    DRAWER.onOpen()
  }

  return (
    <Page className="pt-safe-8">
      <PageMeta pageStyle={isLocked ? 'overflow: hidden' : ''} />
      <Section title="Top Placement" contentClass="grid grid-cols-2 gap-2">
        <Button color="primary" size="sm" onTap={() => handlePlacementOpen('top')}>
          Open Top
        </Button>
        <Button color="primary" size="sm" onTap={() => handlePlacementOpen('bottom')}>
          Open Bottom
        </Button>
        <Drawer
          isOpen={DRAWER.isOpen}
          onOpenChange={DRAWER.onOpenChange}
          placement={placement}
          title="Top Drawer"
        >
          <DrawerContent>
            This drawer slides down from the top/bottom of the screen.
          </DrawerContent>
        </Drawer>
      </Section>

      <Box className="mb-4">This page set custom navigation style to display top drawer with top/bottom safe area.</Box>

      <Button color="danger" isBlock onTap={() => { Taro.navigateBack() }}>Back</Button>
    </Page>
  )
}
