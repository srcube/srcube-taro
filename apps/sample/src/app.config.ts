export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  subpackages: [
    {
      root: 'packages/app',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/button',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/checkbox',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/date-calendar',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/dialog',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/drawer',
      pages: ['pages/index/index', 'pages/auto-safe-area/index'],
    },
    {
      root: 'packages/input-otp',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/input',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/layout-box',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/layout-stack',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/modal',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/radio',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/range-calendar',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/spinner',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/switch',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/textarea',
      pages: ['pages/index/index'],
    },
    {
      root: 'packages/toast',
      pages: ['pages/index/index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Srcube UI',
    navigationBarTextStyle: 'black',
  },
})

