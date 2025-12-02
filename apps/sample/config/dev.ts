import type { UserConfigExport } from '@tarojs/cli'

export default {
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
