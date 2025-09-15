import type { Config } from 'tailwindcss'
import { dynamicIconsPlugin } from '@egoist/tailwindcss-icons'
import { srcubeUI } from '@srcube-taro/theme'
import animated from 'tailwindcss-animated'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../node_modules/@srcube-taro/theme/dist/**/*.{js,jsx,ts,tsx}',
    '../../packages/core/theme/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    srcubeUI(),
    dynamicIconsPlugin(),
    animated,
  ],
} satisfies Config
