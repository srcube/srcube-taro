import { CodeBlock } from '@/components/mdx-components/code'
import { SandpackStack, useActiveCode } from '@codesandbox/sandpack-react'

// interface CodeViewerProps {
//   code?: string
// }

function CodeViewer() {
  // const { sandpack } = useSandpack()
  const { code } = useActiveCode()

  return (
    <SandpackStack className="!h-full !bg-codeblock">
      <div className="sp-code-viewer max-h-[600px] h-full overflow-y-scroll">
        <CodeBlock lang="tsx">{code}</CodeBlock>
      </div>
    </SandpackStack>
  )
}

CodeViewer.displayName = 'CodeViewer'

export { CodeViewer }
