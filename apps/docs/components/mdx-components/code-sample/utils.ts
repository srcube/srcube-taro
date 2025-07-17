import type { FileCode } from './types'

// const importRegex = /^(import\s+(?!type\s+\{)[\s\S]*?;?)/gm
const importRegex = /^import\s+[^;\n]+(?:;|\n|\r\n)?/gm

const exportDefaultRegex = /export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{/

export function transformCode(code: string, imports: { [key: string]: any } = {}, compName = 'App') {
  let cleanedCode = code
    .replace(importRegex, (match) => {
      // get component name from the match ex. "import { Button } from '@srcube/ui'"
      const componentName = match.match(/\w+/g)?.[1] || ''
      const matchingImport = imports[componentName]

      if (matchingImport) {
        // remove the matching import
        return ''
      }

      // if match includes './' or '../' then remove it
      if (match.includes('./') || match.includes('../')) {
        return ''
      }

      return match
    })
    .replace(exportDefaultRegex, () => {
      // replace match with const Name = () => (
      return `const ${compName} = () => {`
    })
    .replace(/export/g, '')

  // add render(<App/>) to cleanedCode if has const App = () => {
  if (cleanedCode.includes(`const App = () => {`)) {
    cleanedCode = `${cleanedCode}\nrender(<${compName}/>);`
  }
  // delete comments from the code
  cleanedCode = cleanedCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')

  return cleanedCode
}

export function joinCode(filesCode: FileCode[]) {
  // join all the code
  const code = filesCode.reduce((acc, { code }) => {
    return `${acc}${code}`
  }, '')

  return code
}

export function getFileName(filePath: string) {
  return filePath?.split('.')?.[0]?.replace(/\W/g, '')
}
