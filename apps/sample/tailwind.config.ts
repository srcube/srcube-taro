import { dynamicIconsPlugin } from '@egoist/tailwindcss-icons'
import { srcubeUI } from '@srcube-taro/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../node_modules/@srcube-taro/theme/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: { },
    },
  },
  plugins: [
    srcubeUI(),
    dynamicIconsPlugin(),
  ],
}
