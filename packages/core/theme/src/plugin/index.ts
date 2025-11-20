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

function createAnimation(
  keyframe: string,
  duration: string = '0.3s',
  timingFunction: string = 'cubic-bezier(0.4,0,0.2,1)',
  delay: string = '0s',
) {
  return `${keyframe} var(--default-animation-duration, ${duration}) var(--default-animation-timing-function, ${timingFunction}) var(--default-animation-dely, ${delay}) both`
}

export function srcubeUI() {
  return plugin.withOptions(
    (_) => {
      return ({ theme, addBase, addComponents, addUtilities, matchUtilities }) => {
        addBase({
          // !!! Native style resets
          'wx-button[disabled]': {
            color: 'initial',
          },
          // Alipay
          // TODO
          // H5
          'taro-button-core+taro-button-core': {
            'margin-top': 'unset !important',
          },
        })
        // Add icons
        addComponents({
          ...icons,
        })
        // TODO: variants, utilities, components
        addUtilities({
          '.pb-safe': {
            paddingBottom: 'env(safe-area-inset-bottom)',
          },
          '.pt-safe': {
            paddingTop: 'env(safe-area-inset-top)',
          },
          '.scrollbar-none': {
            scrollbarWidth: 'none',
          },
          '.scrollbar-none::-webkit-scrollbar': {
            display: 'none',
          },
        })
        matchUtilities(
          {
            'pb-safe': value => ({
              paddingBottom: `calc(env(safe-area-inset-bottom) + ${value})`,
            }),
            'pt-safe': value => ({
              paddingTop: `calc(env(safe-area-inset-top) + ${value})`,
            }),
          },
          { values: theme('spacing') },
        )
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
              'blink-caret': {
                '0%,50%': { opacity: '1' },
                '50.01%,100%': { opacity: '0' },
              },
              // Drawer from right
              'drawer-from-right-in': {
                '0%': { opacity: '0', transform: 'translateX(100%)' },
                '100%': { opacity: '1', transform: 'translateX(0)' },
              },
              'drawer-from-right-out': {
                '0%': { opacity: '1', transform: 'translateX(0)' },
                '100%': { opacity: '0', transform: 'translateX(100%)' },
              },
              // Drawer from left
              'drawer-from-left-in': {
                '0%': { opacity: '0', transform: 'translateX(-100%)' },
                '100%': { opacity: '1', transform: 'translateX(0)' },
              },
              'drawer-from-left-out': {
                '0%': { opacity: '1', transform: 'translateX(0)' },
                '100%': { opacity: '0', transform: 'translateX(-100%)' },
              },
              // Drawer from top
              'drawer-from-top-in': {
                '0%': { opacity: '0', transform: 'translateY(-100%)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
              'drawer-from-top-out': {
                '0%': { opacity: '1', transform: 'translateY(0)' },
                '100%': { opacity: '0', transform: 'translateY(-100%)' },
              },
              // Drawer from bottom
              'drawer-from-bottom-in': {
                '0%': { opacity: '0', transform: 'translateY(100%)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
              'drawer-from-bottom-out': {
                '0%': { opacity: '1', transform: 'translateY(0)' },
                '100%': { opacity: '0', transform: 'translateY(100%)' },
              },
              'dialog-in': {
                '0%': { opacity: '0', transform: 'scale3d(1.05, 1.05, 1.05)' },
                '100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' },
              },
              'dialog-out': {
                '0%': { opacity: '1', transform: 'scale3d(1, 1, 1)' },
                '100%': { opacity: '0', transform: 'scale3d(1.05, 1.05, 1.05)' },
              },
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
              // Toast animations
              'toast-from-top-in': {
                '0%': { opacity: '0', transform: 'scale(0.85) translateY(-100%)' },
                '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
              },
              'toast-from-top-out': {
                '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                '100%': { opacity: '0', transform: 'scale(0.85) translateY(-100%)' },
              },
              'toast-from-bottom-in': {
                '0%': { opacity: '0', transform: 'scale(0.85) translateY(100%)' },
                '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
              },
              'toast-from-bottom-out': {
                '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                '100%': { opacity: '0', transform: 'scale(0.85) translateY(100%)' },
              },
              'toast-from-center-in': {
                '0%': { opacity: '0', transform: 'scale(0.85)' },
                '100%': { opacity: '1', transform: 'scale(1)' },
              },
              'toast-from-center-out': {
                '0%': { opacity: '1', transform: 'scale(1)' },
                '100%': { opacity: '0', transform: 'scale(0.85)' },
              },
              'slide-in-from-top': {
                '0%': { opacity: '0', transform: 'scale(0.85) translateY(-100%)' },
                '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
              },
              'slide-out-to-top': {
                '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                '100%': { opacity: '0', transform: 'scale(0.85) translateY(-100%)' },
              },
              'slide-in-from-bottom': {
                '0%': { opacity: '0', transform: 'scale(0.85) translateY(100%)' },
                '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
              },
              'slide-out-to-bottom': {
                '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                '100%': { opacity: '0', transform: 'scale(0.85) translateY(100%)' },
              },
            },
            animation: {
              'blink-caret': 'blink-caret var(--default-animation-duration, 1s) var(--default-animation-timing-function, steps(1,start)) var(--default-animation-dely, 0s) infinite both',
              'drawer-from-right-in': createAnimation('drawer-from-right-in'),
              'drawer-from-right-out': createAnimation('drawer-from-right-out'),
              'drawer-from-left-in': createAnimation('drawer-from-left-in'),
              'drawer-from-left-out': createAnimation('drawer-from-left-out'),
              'drawer-from-top-in': createAnimation('drawer-from-top-in'),
              'drawer-from-top-out': createAnimation('drawer-from-top-out'),
              'drawer-from-bottom-in': createAnimation('drawer-from-bottom-in'),
              'drawer-from-bottom-out': createAnimation('drawer-from-bottom-out'),
              'dialog-in': createAnimation('dialog-in', '0.5s', 'ease'),
              'dialog-out': createAnimation('dialog-out', '0.5s', 'ease'),
              'modal-in': createAnimation('modal-in', '0.5s', 'ease'),
              'modal-out': createAnimation('modal-out', '0.5s', 'ease'),
              'fade-in': createAnimation('fade-in', '0.5s', 'ease'),
              'fade-out': createAnimation('fade-out', '0.5s', 'ease'),
              'toast-from-top-in': createAnimation('toast-from-top-in', '0.3s', 'ease-out'),
              'toast-from-top-out': createAnimation('toast-from-top-out', '0.3s', 'ease-in'),
              'toast-from-bottom-in': createAnimation('toast-from-bottom-in', '0.3s', 'ease-out'),
              'toast-from-bottom-out': createAnimation('toast-from-bottom-out', '0.3s', 'ease-in'),
              'toast-from-center-in': createAnimation('toast-from-center-in', '0.3s', 'ease-out'),
              'toast-from-center-out': createAnimation('toast-from-center-out', '0.3s', 'ease-in'),
              'slide-in-from-top': createAnimation('slide-in-from-top', '0.3s', 'ease-out'),
              'slide-out-to-top': createAnimation('slide-out-to-top', '0.3s', 'ease-in'),
              'slide-in-from-bottom': createAnimation('slide-in-from-bottom', '0.3s', 'ease-out'),
              'slide-out-to-bottom': createAnimation('slide-out-to-bottom', '0.3s', 'ease-in'),
            },
          },
        },
      }
    },
  )
}
