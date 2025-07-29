import { Box, Stack } from '@srcube-taro/ui'
import { Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import Logo from '@/assets/imgs/srcube.png'
import { Page } from '@/components'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const app = [
    { title: 'SrcubeUI Provider', to: () => Taro.navigateTo({ url: '/pages/app/index' }) },
  ]

  const layouts = [
    { title: 'Box', to: () => Taro.navigateTo({ url: '/pages/layout-box/index' }) },
    { title: 'Stack', to: () => Taro.navigateTo({ url: '/pages/layout-stack/index' }) },
  ]

  const components = [
    { title: 'Buttons', to: () => Taro.navigateTo({ url: '/pages/buttons/index' }) },
    { title: 'Checkboxs', to: () => Taro.navigateTo({ url: '/pages/checkboxs/index' }) },
    { title: 'Dialogs', to: () => Taro.navigateTo({ url: '/pages/dialogs/index' }) },
    { title: 'Drawer', to: () => Taro.navigateTo({ url: '/pages/drawers/index' }) },
    { title: 'Inputs', to: () => Taro.navigateTo({ url: '/pages/inputs/index' }) },
    { title: 'Modals', to: () => Taro.navigateTo({ url: '/pages/modals/index' }) },
    { title: 'Spinner', to: () => Taro.navigateTo({ url: '/pages/spinner/index' }) },
  ]

  return (
    <Page className="space-y-4">
      <Box className="text-xl font-bold text-center">Srcube UI</Box>
      <Box className="text-xs font-bold uppercase">App</Box>
      <Stack direction="vertical">
        {app.map(link => (
          <Box
            className="flex justify-center py-2 rounded-lg bg-white font-medium"
            hoverClass="bg-gray-200"
            onTap={link.to}
            key={link.title}
          >
            {link.title}
          </Box>
        ))}
      </Stack>
      <Box className="text-xs font-bold uppercase">Layouts</Box>
      <Stack direction="vertical">
        {layouts.map(link => (
          <Box
            className="flex justify-center py-2 rounded-lg bg-white font-medium"
            hoverClass="bg-gray-200"
            onTap={link.to}
            key={link.title}
          >
            {link.title}
          </Box>
        ))}
      </Stack>
      <Box className="text-xs font-bold uppercase">Components</Box>
      <Stack direction="vertical">
        {components.map(link => (
          <Box
            className="flex justify-center py-2 rounded-lg bg-white font-medium"
            hoverClass="bg-gray-200"
            onTap={link.to}
            key={link.title}
          >
            {link.title}
          </Box>
        ))}
      </Stack>
      <Box className="fixed bottom-8 left-0 right-0 flex justify-center items-center">
        <Image src={Logo} className="size-8" />
      </Box>
    </Page>
  )
}
