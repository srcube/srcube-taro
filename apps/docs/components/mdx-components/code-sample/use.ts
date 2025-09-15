import type { SandpackProps } from '@codesandbox/sandpack-react'
// import type { FileCode } from './types'
import { scope } from './react-live'
import { transformCode } from './utils'

export interface UseCodeSampleProps extends SandpackProps {
  code?: string
}

export function useCodeSample(props: UseCodeSampleProps) {
  const { code: inputCode, files: inputFiles } = props

  const files = (inputFiles || {})
  let code = inputCode?.trim()
  let noInline = false

  // const scopeKeys = Object.keys(scope)
  // const scopeValues = scopeKeys.map(key => ({ [key]: `${key}` }))

  // const imports = Object.assign({}, ...scopeValues)

  // if (Object.keys(files)?.length === 1) {
  //   const file = Object.values(files)[0] as string

  //   code = transformCode(file, imports)
  // }

  // noInline = code!.includes('render')

  return {
    files,
    code,
    noInline,
  }
}
