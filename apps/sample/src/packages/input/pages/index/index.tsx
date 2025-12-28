import type { InputProps } from '@srcube-taro/ui'
import { ButtonGroup } from '@srcube-taro/button'
import { Box, Button, Input } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useMutative } from 'use-mutative'
import { Page, Section, StateAction, StateDemo } from '@/components'

export default function InputPage() {
  const colors: Array<InputProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const variants: Array<InputProps['variant']> = ['default', 'outline', 'twotone', 'underline']
  const sizes: Array<InputProps['size']> = ['xs', 'sm', 'md', 'lg']

  const [state, setState] = useMutative<InputProps>({
    color: 'default',
    variant: 'default',
    size: 'md',
    isDisabled: false,
    isReadonly: false,
    isClearable: false,
    isPassword: false,
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
          <Input {...state} defaultValue="Input" />
        </StateDemo>
        <StateAction title="Colors" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
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
          <ButtonGroup size="sm">
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
        <StateAction title="Variants" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
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
        <StateAction title="Sizes" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
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
        <StateAction title="State" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
            <Button
              color={state.isReadonly ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isReadonly', !state.isReadonly)}
            >
              Read Only
            </Button>
            <Button
              color={state.isDisabled ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isDisabled', !state.isDisabled)}
            >
              Disabled
            </Button>
            <Button
              color={state.isClearable ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isClearable', !state.isClearable)}
            >
              Clearable
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm">
            <Button
              color={state.isPassword ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isPassword', !state.isPassword)}
            >
              Password
            </Button>
          </ButtonGroup>
        </StateAction>
      </Section>
      <Section title="Layouts" contentClass="flex flex-col gap-2">
        <Input
          defaultValue="Start & End content"
          startContent={<Box className="i-[bxs--quote-left]" />}
          endContent={<Box className="i-[bxs--quote-right]" />}
        />
        <Input
          defaultValue="Clearable"
          isClearable
        />
        <Input
          defaultValue="Custom clear button"
          clearButton={<Box className="i-[tdesign--clear-formatting-1-filled]" />}
        />
      </Section>
      <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
        <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
        <View className="text-sm text-gray-800">The `Input` component inherits the presentational layer `Field` component.</View>
      </View>
    </Page>
  )
}
