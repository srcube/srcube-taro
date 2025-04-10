import type { Toc } from '@stefanprobst/rehype-extract-toc'
import fs from 'node:fs/promises'
import { compile } from '@mdx-js/mdx'
import withToc from '@stefanprobst/rehype-extract-toc'
import withSlugs from 'rehype-slug'
import withExtractFrontmatter from 'remark-extract-frontmatter'
import withFrontmatter from 'remark-frontmatter'
import yaml from 'yaml'

export async function compileMdx(filePath: string) {
  const doc = await fs.readFile(filePath, 'utf-8')

  const mdx = await compile(doc, {
    format: 'mdx',
    rehypePlugins: [withSlugs, withToc],
    remarkPlugins: [withFrontmatter, [withExtractFrontmatter, { yaml: yaml.parse }]],
  })

  return mdx
}

type Heading = Omit<Toc[number], 'children'>

export function flattenToc(toc?: Toc) {
  if (!toc)
    return []

  return toc.reduce((acc, item) => {
    const { children, ...rest } = item

    acc.push(rest)

    if (children) {
      acc.push(...flattenToc(children))
    }
    return acc
  }, [] as Heading[])
}
