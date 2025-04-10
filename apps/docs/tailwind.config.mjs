import { heroui } from '@heroui/react'
import colors from 'tailwindcss/colors'

export default {
  content: [
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@srcube-taro/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {}
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {}
        },
        dark: {
          layout: {},
          colors: {}
        },
      }
    }),
  ],
}
