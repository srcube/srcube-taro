import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
import icons from '../icons'

type ColorKeys = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | 'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'>

export function withDefaultColor<T extends ColorKeys>(color: T) {
  return {
    DEFAULT: colors[color][500],
    ...(colors[color] as Record<string, string>),
  }
}

export function srcubeUI() {
  return plugin.withOptions(
    (_) => {
      return ({ addBase, addComponents }) => {
        addBase({
          'wx-button[disabled]': {
            color: 'initial',
          },
        })
        // Add icons
        addComponents({
          ...icons,
        })
        // TODO: variants, utilities, components
      }
    },
    (_) => {
      return {
        theme: {
          extend: {
            colors: {
              primary: withDefaultColor('cyan'),
              secondary: withDefaultColor('indigo'),
              success: withDefaultColor('emerald'),
              warning: withDefaultColor('amber'),
              danger: withDefaultColor('rose'),
            },
          },
        },
      }
    },
  )
}
