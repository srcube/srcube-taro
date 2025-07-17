'use client'

import type { SandpackProps } from '@codesandbox/sandpack-react'
import { Sandpack } from '@/components/sandpack'

interface CodeSampleProps extends SandpackProps { }

function CodeSample(props: CodeSampleProps) {
  const { files } = props

  return (
    <div className="not-prose">
      <Sandpack files={files} template="react-ts" />
    </div>
  )
}

CodeSample.displayName = 'CodeSample'

export { CodeSample }
