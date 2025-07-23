import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  terser: {
    enable: true,
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'webpack5'>
