export default defineAppConfig({
  pages: [
    'pages/_index/index',
    'pages/app/index',
    'pages/layout-box/index',
    'pages/layout-stack/index',
    'pages/buttons/index',
    'pages/checkboxs/index',
    'pages/dialogs/index',
    'pages/drawers/index',
    'pages/inputs/index',
    'pages/modals/index',
    'pages/spinners/index',
    'pages/toasters/index',
  ],
  subpackages: [
    {
      root: 'packages/drawers',
      pages: ['pages/auto-safe-area/index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Srcube UI',
    navigationBarTextStyle: 'black',
  },
})
