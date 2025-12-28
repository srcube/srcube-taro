import type { ButtonProps } from '@srcube-taro/ui'
import { Box, Button, ButtonGroup } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useMutative } from 'use-mutative'
import { Page, Section, StateAction, StateDemo } from '@/components'

export default function ButtonPage() {
  const colors: Array<ButtonProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const variants: Array<ButtonProps['variant']> = ['solid', 'outline', 'flat', 'text']
  const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg']
  const radius: Array<ButtonProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

  const [state, setState] = useMutative<ButtonProps>({
    color: 'default',
    variant: 'solid',
    radius: 'md',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    fullWidth: false,
  })

  const handleStateActionTap = (key: keyof typeof state, value: (typeof state)[keyof typeof state]) => {
    setState((draft) => {
      draft[key] = value
    })
  }

  return (
    <Page>
      <Section title="Usage" contentClass="">
        <StateDemo className="h-20">
          <Button {...state}>
            Button
          </Button>
        </StateDemo>

        {/* color */}
        <StateAction title="Colors" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
            {colors.slice(0, 3).map(c => (
              <Button
                key={c}
                color={c === state.color ? 'primary' : void 0}
                className="flex-1"
                onTap={() => handleStateActionTap('color', c)}
              >
                {capitalize(c)}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup size="sm" fullWidth>
            {colors.slice(3, 6).map(c => (
              <Button
                key={c}
                color={c === state.color ? 'primary' : void 0}
                className="flex-1"
                onTap={() => handleStateActionTap('color', c)}
              >
                {capitalize(c)}
              </Button>
            ))}
          </ButtonGroup>
        </StateAction>
        {/* variant */}
        <StateAction title="Variants" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
            {variants.map(v => (
              <Button
                key={v}
                color={v === state.variant ? 'primary' : void 0}
                className="flex-1"
                onTap={() => handleStateActionTap('variant', v)}
              >
                {capitalize(v)}
              </Button>
            ))}
          </ButtonGroup>
        </StateAction>
        {/* radius */}
        <StateAction title="Radius" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
            {radius.map(r => (
              <Button
                key={r}
                color={r === state.radius ? 'primary' : void 0}
                className="flex-1"
                onTap={() => handleStateActionTap('radius', r)}
              >
                {r?.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </StateAction>
        {/* size */}
        <StateAction title="Sizes" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
            {sizes.map(s => (
              <Button
                key={s}
                color={s === state.size ? 'primary' : void 0}
                className="flex-1"
                onTap={() => handleStateActionTap('size', s)}
              >
                {s?.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </StateAction>
        {/* isLoading, isDisabled */}
        <StateAction title="State" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
            <Button
              color={state.isLoading ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isLoading', !state.isLoading)}
            >
              Loading
            </Button>
            <Button
              color={state.isDisabled ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isDisabled', !state.isDisabled)}
            >
              Disabled
            </Button>
          </ButtonGroup>
          <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
            <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
            <View className="text-sm text-gray-800">Button will be auto loading when `onTap` is async function.</View>
          </View>
        </StateAction>
      </Section>
      <Section title="Icon Button" contentClass="flex gap-2">
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
        <Button fullWidth>
          Full Width
        </Button>
      </Section>
      <Section title="Button Group" contentClass="flex flex-col gap-2">
        <ButtonGroup color="default" fullWidth>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button isIcon>
            <View className="i-[teenyicons--button-solid]" />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="default" radius="full" fullWidth>
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
