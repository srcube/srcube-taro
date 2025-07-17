import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

import rehypeExtractToc from '@stefanprobst/rehype-extract-toc'
// import remarkGfm from 'remark-gfm'
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      '@tarojs/components/lib/react': '@tarojs/components-react/dist',
      '@tarojs/components': '@tarojs/components-react/dist',
    },
    rules: {
      '*.raw.js': {
        loaders: ['raw-loader'],
      },
      '*.raw.jsx': {
        loaders: ['raw-loader'],
      },
      '*.raw.ts': {
        loaders: ['raw-loader'],
      },
      '*.raw.tsx': {
        loaders: ['raw-loader'],
      },
      '*.raw.css': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // @ts-expect-error internal type error
      ['remark-frontmatter'],
      //   ['remark-mdx-frontmatter'],
      //   ['remark-gfm', { singleTilde: false, throwOnError: true }],
    ],
    rehypePlugins: [
      // @ts-expect-error internal type error
      ['@stefanprobst/rehype-extract-toc'],
      // @ts-expect-error internal type error
      ['rehype-slug'],
    ],
  },
})

export default withMDX(nextConfig)
