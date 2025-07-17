'use client'

import type { Key } from 'react'

import { Snippet, Tab, Tabs } from '@heroui/react'
import { useState } from 'react'
import { CodeBlock } from '../code'

type TabKey = 'subpackage' | 'ui'
type TabName = 'Subpackage' | 'UI'

const tabs: Record<TabKey, TabName> = {
  subpackage: 'Subpackage',
  ui: 'UI',
}

export interface ImportComponentProps {
  commands: Record<TabKey, string>
}

export function ImportComponent(props: ImportComponentProps) {
  const { commands } = props

  const [current, setCurrent] = useState<TabKey>('subpackage')

  const handleSelectionChange = (tabKey: Key | null) => {
    setCurrent(tabKey as TabKey)
  }

  return (
    <Tabs
      selectedKey={current}
      classNames={{
        base: 'group mt-4',
        tabList: 'relative h-10',
      }}
      variant="underlined"
      aria-label="SrcubeUI import commands"
      onSelectionChange={handleSelectionChange}
    >
      {(Object.entries(tabs) as [TabKey, TabName][]).map(([key, _]) => {
        if (!commands[key])
          return null

        return (
          <Tab key={key} title={tabs[key]}>
            <Snippet
              fullWidth
              hideSymbol
              classNames={{
                base: 'dark not-prose bg-codeblock',
                pre: 'px-2 font-light',
                copyButton: 'text-lg text-default-400',
              }}
            >
              <CodeBlock lang="jsx">{commands[key as TabKey]}</CodeBlock>
            </Snippet>
          </Tab>
        )
      })}
    </Tabs>
  )
}
