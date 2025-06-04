'use client'

import type { JSX, Key } from 'react'
import { Snippet, Tab, Tabs } from '@heroui/react'
import { useState } from 'react'
import { CodeBlock } from '../code'

type PackageManagerName = 'npm' | 'yarn' | 'pnpm'

const packageManagers: Array<{ name: PackageManagerName, icon: JSX.Element }> = [
  { name: 'npm', icon: <i className="i-[devicon--npm]" /> },
  { name: 'yarn', icon: <i className="i-[devicon--yarn]" /> },
  { name: 'pnpm', icon: <i className="i-[devicon--pnpm]" /> },
]

export interface PackageInstallProps {
  commands: Record<PackageManagerName, string>
}

export function PackageInstall(props: PackageInstallProps) {
  const { commands } = props

  const [current, setCurrent] = useState<PackageManagerName>('npm')

  const handleSelectionChange = (tabKey: Key | null) => {
    setCurrent(tabKey as PackageManagerName)
  }

  return (
    <>
      <Tabs
        selectedKey={current}
        aria-label="SrcubeUI installation commands"
        classNames={{
          base: 'group mt-4 min-w-[300px] w-full overflow-x-auto',
          tabList: 'h-10',
        }}
        variant="underlined"
        onSelectionChange={handleSelectionChange}
      >
        {packageManagers.map(({ name, icon }) => (
          <Tab
            key={name}
            title={(
              <div className="flex items-center space-x-2">
                {icon}
                <span>{name}</span>
              </div>
            )}
          >
            <Snippet
              fullWidth
              classNames={{
                base: 'dark not-prose bg-code-block',
                pre: 'px-2 font-light',
                copyButton: 'text-lg text-default-400',
              }}
            >
              <CodeBlock lang="bash">{commands[name]}</CodeBlock>
            </Snippet>
          </Tab>
        ))}
      </Tabs>
    </>
  )
}
