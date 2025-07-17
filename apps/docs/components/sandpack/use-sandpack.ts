import type { SandpackFiles, SandpackPredefinedTemplate, SandpackSetup } from '@codesandbox/sandpack-react'
import postcssConfigRaw from './files/postcss.config.raw.js?raw'
import styleRaw from './files/style.raw.css?raw'
import tailwindConfigRaw from './files/tailwind.config.raw.js?raw'

export interface UseSandpackProps {
  files?: SandpackFiles
  template?: SandpackPredefinedTemplate
}

// eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
export function useSandpack(props: UseSandpackProps) {
  const { files = {}, template = 'vite-react' } = props

  const customSetup: SandpackSetup = {
    dependencies: {
      '@tarojs/components-react': 'latest',
      '@srcube-taro/ui': 'latest',
    },
    devDependencies: {
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^3',
    },
  }

  return {
    customSetup,
    template,
    files: {
      'tailwind.config.js': {
        code: tailwindConfigRaw,
        // hidden: true,
      },
      'postcss.config.mjs': {
        code: postcssConfigRaw,
        // hidden: true,
      },
      'style.css': {
        code: styleRaw,
        // hidden: true,
      },
      ...files,
    },
  }
}
