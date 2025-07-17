import { dynamicIconsPlugin } from '@egoist/tailwindcss-icons'
import { heroui } from '@heroui/react'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './content/**/*.mdx',
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@srcube-taro/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        codeblock: {
          DEFAULT: '#151515',
          100: '#2d2d2d',
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
    typography(),
    dynamicIconsPlugin(),
  ],
}
