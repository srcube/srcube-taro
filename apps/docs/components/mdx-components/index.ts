import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import NextImage from 'next/image'

import { APITable } from './api-table'
// import { Anchor } from './anchor'
import { Blockquote } from './blockquote'
import { Code } from './code'
import { CodeSample } from './code-sample'
import { ComponentLinks } from './component-links'
// import { H1, H2, H3, H4 } from './headings'
import { ImportComponent } from './import-component'
import { PackageInstall } from './package-install'
import { Steps } from './steps'
// import { Strong } from './text'

const MDXComponents: MDXComponentsType = {
  /**
   * Next.js components
   */
  Image: NextImage,
  /**
   * Docs components
   */
  ComponentLinks,
  PackageInstall,
  ImportComponent,
  CodeSample,
  Steps,
  Blockquote,
  /**
   * Markdown components
   */
  // ...Icons,
  // a: Anchor,
  // h1: H1,
  // h2: H2,
  // h3: H3,
  // h4: H4,
  code: Code,
  // strong: Strong,
  // table: Table,
  // thead: THead,
  // tr: TRow,
  // td: TCell,
  APITable,
}

export default MDXComponents
