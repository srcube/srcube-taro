'use client'

import type { UseSandpackProps } from './use-sandpack'
import { SandpackLayout, SandpackProvider } from '@codesandbox/sandpack-react'
import { CodeViewer as SandpackCodeViewer } from './code-viewer'
import { useSandpack } from './use-sandpack'

interface SandpackProps extends UseSandpackProps {}

function Sandpack(props: SandpackProps) {
  const { files, customSetup, template } = useSandpack(props)

  return (
    <SandpackProvider customSetup={customSetup} theme="dark" files={files} template={template} options={{}}>
      <SandpackLayout
        className="!border-none !bg-transparent !rounded-xl overflow-hidden"
      >
        <SandpackCodeViewer />
      </SandpackLayout>
    </SandpackProvider>
  )
}

Sandpack.displayName = 'Sandpack'

export { Sandpack }
