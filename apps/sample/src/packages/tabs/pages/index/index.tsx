import { Button, Drawer, DrawerContent, DrawerFooter, Tab, Tabs } from '@srcube-taro/ui'
import { useState } from 'react'
import { Page, Section } from '@/components'

export interface TabItem {
  key: string
  value: string
}

const tabs = ['Photos', 'Music', 'Videos', 'Files', 'Settings', 'Profile', 'About', 'Contact', 'Privacy']

const dynamicTabs: TabItem[] = tabs.map(row => ({ key: row, value: row }))

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const radius = ['none', 'sm', 'md', 'lg', 'full'] as const
const variants = ['solid', 'underlined', 'light'] as const

export default function TabsPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Page>
      <Button onTap={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer isOpen={isOpen} title="State Sets" onClose={() => setIsOpen(false)}>
        <DrawerContent>
          CONTENT
          <DrawerFooter>
            <Button color="danger" variant="text" fullWidth onTap={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Section title="Usage">
        <Tabs aria-label="Tabs usage">
          {tabs.slice(0, 4).map(tab => (
            <Tab key={tab} title={tab}>
              {tab} panel content
            </Tab>
          ))}
        </Tabs>
      </Section>

      <Section title="Colors" contentClass="flex flex-col gap-2">
        {colors.map(color => (
          <Tabs key={color} aria-label="Tabs colors" color={color}>
            {tabs.map(tab => (
              <Tab key={tab} title={tab} />
            ))}
          </Tabs>
        ))}
      </Section>

      <Section title="Sizes" contentClass="flex flex-col gap-4">
        {sizes.map(size => (
          <Tabs key={size} size={size} aria-label="Tabs sizes">
            <Tab key="photos" title="Photos" />
            <Tab key="music" title="Music" />
            <Tab key="videos" title="Videos" />
          </Tabs>
        ))}
      </Section>

      <Section title="Radius" contentClass="flex flex-col gap-4">
        {radius.map(radius => (
          <Tabs key={radius} radius={radius} aria-label="Tabs radius">
            <Tab key="photos" title="Photos" />
            <Tab key="music" title="Music" />
            <Tab key="videos" title="Videos" />
          </Tabs>
        ))}
      </Section>

      <Section title="Variants" contentClass="flex flex-col gap-4">
        {variants.map(variant => (
          <Tabs key={`${variant}`} variant={variant} aria-label="Tabs variants">
            <Tab key="photos" title="Photos" />
            <Tab key="music" title="Music" />
            <Tab key="videos" title="Videos" />
          </Tabs>
        ))}
      </Section>

      <Section title="Dynamic" contentClass="flex flex-col gap-2">
        <Tabs items={dynamicTabs} aria-label="Tabs dynamic">
          {item => (
            <Tab key={item.value} title={item.value}>
              {item.value} panel content
            </Tab>
          )}
        </Tabs>
      </Section>

      <Section title="Full width">
        <Tabs aria-label="Tabs full width" fullWidth>
          {tabs.map(tab => (
            <Tab key={tab} title={tab}>
              {tab} panel content
            </Tab>
          ))}
        </Tabs>
      </Section>

      <Section title="Vertical" contentClass="flex flex-col gap-4">
        {variants.map(variant => (
          <Tabs
            key={`${variant}`}
            variant={variant}
            isVertical
            className="h-[300px]"
          >
            {tabs.map(tab => (
              <Tab key={tab} title={tab} />
            ))}
          </Tabs>
        ))}
      </Section>

      <Section title="Placement" contentClass="flex flex-col gap-4">
        {(['top', 'bottom'] as const).map(p => (
          <Tabs key={`placement-${p}`} variant="underlined" placement={p} aria-label={`Tabs placement ${p}`}>
            {tabs.slice(0, 3).map(tab => (
              <Tab key={tab} title={tab}>
                {tab} panel content
              </Tab>
            ))}
          </Tabs>
        ))}

        {(['start', 'end'] as const).map(p => (
          <Tabs
            key={`placement-${p}`}
            isVertical
            variant="underlined"
            placement={p}
            className="h-[300px]"
            aria-label={`Tabs placement ${p}`}
          >
            {tabs.map(tab => (
              <Tab key={tab} title={tab}>
                {tab} panel content
              </Tab>
            ))}
          </Tabs>
        ))}
      </Section>
    </Page>
  )
}
