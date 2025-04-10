import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ['remark-frontmatter'],
    //   ['remark-mdx-frontmatter'],
    //   ['remark-gfm', { singleTilde: false, throwOnError: true }],
    ],
    rehypePlugins: [
      ['@stefanprobst/rehype-extract-toc'],
      ['rehype-slug'],
    ],
  },
})

export default withMDX(nextConfig)
