import type { UserConfigExport } from '@tarojs/cli'

export default {
  plugins: ['@tarojs/plugin-react-devtools'],
  logger: {
    quiet: false,
    stats: true,
  },
  terser: {
    enable: false,
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'webpack5'>
