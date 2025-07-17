import type { ButtonProps } from '@srcube-taro/ui'
import { Box, Button, ButtonGroup } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { Page, Section } from '@/components'

export default function Buttons() {
  const colors: Array<ButtonProps['color']> = ['default', 'primary', 'success', 'warning', 'danger']
  const variants: Array<ButtonProps['variant']> = ['solid', 'outline', 'flat', 'text']
  const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

  const handleTap = async (e) => {
    await new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, 3000)
    })
  }

  return (
    <Page>
      <Section title="Colors" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Button key={c} color={c}>{capitalize(c)}</Button>)}
      </Section>
      <Section title="Sizes" contentClass="grid grid-cols-4 gap-2">
        {sizes.map(s => <Button key={s} size={s}>{s?.toUpperCase()}</Button>)}
      </Section>
      <Section title="Variants" contentClass="grid grid-cols-4 gap-2">
        {colors.map(c => variants.map(v => (
          <Button key={v} variant={v} color={c} size="sm">
            {capitalize(v)}
          </Button>
        )))}
      </Section>
      <Section title="Loadings" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Button key={c} color={c} isLoading>{capitalize(c)}</Button>)}
        <Button color="primary" onTap={handleTap}>Auto</Button>
      </Section>
      <Section title="Disabled" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Button key={c} color={c} isDisabled>{capitalize(c)}</Button>)}
      </Section>
      <Section title="Icon Button">
        <Box className="flex gap-2">
          <Button isIcon>
            <View className="i-[ion--home]" />
          </Button>
          <Button color="primary" isIcon>
            <View className="i-[ion--camera]" />
          </Button>
          <Button color="success" isIcon>
            <View className="i-[icon-park-solid--pay-code-one]" />
          </Button>
          <Button color="warning" isIcon>
            <View className="i-[fluent--alert-32-filled]" />
          </Button>
          <Button color="danger" isIcon>
            <View className="i-[ion--heart]" />
          </Button>
        </Box>
      </Section>
      <Section title="Layouts" contentClass="flex flex-col gap-2">
        <Box className="grid grid-cols-2 gap-2">
          <Button startContent={<View className="i-[teenyicons--button-solid]" />}>
            Start Content
          </Button>
          <Button endContent={<View className="i-[teenyicons--button-solid]" />}>
            End Content
          </Button>
        </Box>
        <Button isBlock>
          Block
        </Button>
      </Section>
      <Section title="Button Group">
        <ButtonGroup color="default" isBlock>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button isIcon>
            <View className="i-[teenyicons--button-solid]" />
          </Button>
        </ButtonGroup>
      </Section>
    </Page>
  )
}
