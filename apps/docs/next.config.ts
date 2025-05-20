import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

import remarkFrontmatter from 'remark-frontmatter'
// import remarkGfm from 'remark-gfm'
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc'

const nextConfig: NextConfig = {
  /* config options here */
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // @ts-expect-error
      ['remark-frontmatter'],
    //   ['remark-mdx-frontmatter'],
    //   ['remark-gfm', { singleTilde: false, throwOnError: true }],
    ],
    rehypePlugins: [
      // @ts-expect-error
      ['@stefanprobst/rehype-extract-toc'],
      // @ts-expect-error
      ['rehype-slug'],
    ],
  },
})

export default withMDX(nextConfig)
