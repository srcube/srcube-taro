import { srcubeUI } from '@srcube-taro/theme'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../node_modules/@srcube-taro/theme/**/*.{html,js,mjs,jsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        warning: colors.amber,
        success: colors.emerald,
        danger: colors.rose,
      },
    },
  },
  plugins: [
    srcubeUI(),
  ],
  corePlugins: {
    preflight: false,
  },
}
