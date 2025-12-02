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
    { title: 'SrcubeUI Provider', to: () => Taro.navigateTo({ url: '/packages/app/pages/index/index' }) },
  ]

  const layouts = [
    { title: 'Box', to: () => Taro.navigateTo({ url: '/packages/layouts/pages/box/index' }) },
    { title: 'Stack', to: () => Taro.navigateTo({ url: '/packages/layouts/pages/stack/index' }) },
  ]

  const components = [
    { title: 'Button', to: () => Taro.navigateTo({ url: '/packages/button/pages/index/index' }) },
    { title: 'Checkbox', to: () => Taro.navigateTo({ url: '/packages/checkbox/pages/index/index' }) },
    { title: 'Date Calendar', to: () => Taro.navigateTo({ url: '/packages/date-calendar/pages/index/index' }) },
    { title: 'Dialog', to: () => Taro.navigateTo({ url: '/packages/dialog/pages/index/index' }) },
    { title: 'Drawer', to: () => Taro.navigateTo({ url: '/packages/drawer/pages/index/index' }) },
    { title: 'Input OTP', to: () => Taro.navigateTo({ url: '/packages/input-otp/pages/index/index' }) },
    { title: 'Input', to: () => Taro.navigateTo({ url: '/packages/input/pages/index/index' }) },
    { title: 'Modal', to: () => Taro.navigateTo({ url: '/packages/modal/pages/index/index' }) },
    { title: 'Radio', to: () => Taro.navigateTo({ url: '/packages/radio/pages/index/index' }) },
    { title: 'Range Calendar', to: () => Taro.navigateTo({ url: '/packages/range-calendar/pages/index/index' }) },
    { title: 'Skeleton', to: () => Taro.navigateTo({ url: '/packages/skeleton/pages/index/index' }) },
    { title: 'Spinner', to: () => Taro.navigateTo({ url: '/packages/spinner/pages/index/index' }) },
    { title: 'Switch', to: () => Taro.navigateTo({ url: '/packages/switch/pages/index/index' }) },
    { title: 'Tabs', to: () => Taro.navigateTo({ url: '/packages/tabs/pages/index/index' }) },
    { title: 'Textarea', to: () => Taro.navigateTo({ url: '/packages/textarea/pages/index/index' }) },
    { title: 'Toast', to: () => Taro.navigateTo({ url: '/packages/toast/pages/index/index' }) },
  ]

  return (
    <Page className="space-y-4 pb-20">
      <Box className="sticky top-0 py-4 text-xl font-bold text-center bg-slate-100">Srcube UI</Box>
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
      <Box className="grid grid-cols-2 gap-4">
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
      </Box>
      <Box className="text-xs font-bold uppercase">Components</Box>
      <Box className="grid grid-cols-2 gap-4">
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
      </Box>
      <Box className="fixed bottom-8 left-0 right-0 flex justify-center items-center">
        <Image src={Logo} className="size-8" />
      </Box>
    </Page>
  )
}
