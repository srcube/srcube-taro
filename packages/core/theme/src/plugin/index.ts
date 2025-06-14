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
          // !!! Native style resets
          'wx-button[disabled]': {
            color: 'initial',
          },
          'taro-button-core+taro-button-core': {
            'margin-top': 'unset !important',
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
            keyframes: {
              'modal-in': {
                '0%': { opacity: '0', transform: 'scale3d(1.05, 1.05, 1.05)' },
                '100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' },
              },
              'modal-out': {
                '0%': { opacity: '1', transform: 'scale3d(1, 1, 1)' },
                '100%': { opacity: '0', transform: 'scale3d(1.05, 1.05, 1.05)' },
              },
              'fade-in': {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              'fade-out': {
                '0%': { opacity: '1' },
                '100%': { opacity: '0' },
              },
            },
            animation: {
              'modal-in': 'modal-in var(--default-animation-duration, 0.5s) var(--default-animation-timing-function, ease) var(--default-animation-dely, 0s) both',
              'modal-out': 'modal-out var(--default-animation-duration, 0.5s) var(--default-animation-timing-function, ease) var(--default-animation-dely, 0s) both',
              'fade-in': 'fade-in var(--default-animation-duration, 0.5s) var(--default-animation-timing-function, ease) var(--default-animation-dely, 0s) both',
              'fade-out': 'fade-out var(--default-animation-duration, 0.5s) var(--default-animation-timing-function, ease) var(--default-animation-dely, 0s) both',
            },
          },
        },
      }
    },
  )
}
