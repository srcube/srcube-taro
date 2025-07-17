import { SandpackStack, useActiveCode } from '@codesandbox/sandpack-react'
import { CodeBlock } from '@/components/mdx-components/code'

// interface CodeViewerProps {
//   code?: string
// }

function CodeViewer() {
  // const { sandpack } = useSandpack()
  const { code } = useActiveCode()

  return (
    <SandpackStack className="!h-full !bg-codeblock">
      <div className="sp-code-viewer p-4 max-h-[600px] h-full overflow-y-scroll">
        <CodeBlock lang="tsx">{code}</CodeBlock>
      </div>
    </SandpackStack>
  )
}

CodeViewer.displayName = 'CodeViewer'

export { CodeViewer }
