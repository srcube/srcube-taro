import type { CheckboxProps } from '@srcube-taro/ui'
import { ButtonGroup } from '@srcube-taro/button'
import { Box, Button, Checkbox, CheckboxGroup } from '@srcube-taro/ui'
import { capitalize } from 'lodash-es'
import { useMutative } from 'use-mutative'
import { Page, Section, StateAction, StateDemo } from '@/components'

export default function CheckboxPage() {
  const colors: Array<CheckboxProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const sizes: Array<CheckboxProps['size']> = ['xs', 'sm', 'md', 'lg']
  const radius: Array<CheckboxProps['radius']> = ['none', 'xs', 'sm', 'md', 'lg', 'full']

  const [state, setState] = useMutative<CheckboxProps>({
    color: 'default',
    size: 'md',
    radius: 'md',
    isDisabled: false,
    isLoading: false,
    isReadOnly: false,
    isIndeterminate: false,
    isLineThrough: false,
  })

  const handleStateActionTap = (key: string, value: (typeof state)[keyof typeof state]) => {
    setState((draft) => {
      draft[key] = value
    })
  }

  return (
    <Page>
      <Section title="Usage" contentClass="">
        <StateDemo className="h-20">
          <Checkbox defaultSelected {...state}>Checkbox</Checkbox>
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
        <StateAction title="Radius" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
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
        {/* isLoading, isDisabled, isReadOnly */}
        <StateAction title="State" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm">
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
            <Button
              color={state.isReadOnly ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isReadOnly', !state.isReadOnly)}
            >
              Read Only
            </Button>
          </ButtonGroup>
          <Box className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
            <Box className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
            <Box className="text-sm text-gray-800">Button will be auto loading when `onTap` is async function.</Box>
          </Box>
          <ButtonGroup size="sm">
            <Button
              color={state.isIndeterminate ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isIndeterminate', !state.isIndeterminate)}
            >
              Indeterminate
            </Button>
            <Button
              color={state.isLineThrough ? 'primary' : void 0}
              className="flex-1"
              onTap={() => handleStateActionTap('isLineThrough', !state.isLineThrough)}
            >
              Line Through
            </Button>
          </ButtonGroup>
        </StateAction>
      </Section>
      <Section title="Icon" contentClass="grid grid-cols-3 gap-2">
        <Checkbox
          defaultSelected
          icon={<Box className="i-[ic--twotone-circle] w-inherit h-inherit" />}
        >
          Check
        </Checkbox>
        <Checkbox
          color="primary"
          defaultSelected
          icon={<Box className="i-[ph--flying-saucer-fill] w-inherit h-inherit" />}
        >
          UFO
        </Checkbox>
        <Checkbox
          color="success"
          defaultSelected
          icon={<Box className="i-[mingcute--grass-fill]" />}
        >
          Grass
        </Checkbox>
        <Checkbox
          color="warning"
          defaultSelected
          icon={<Box className="i-[streamline--flower-solid]" />}
        >
          Flower
        </Checkbox>
        <Checkbox
          color="danger"
          defaultSelected
          icon={<Box className="i-[mdi--heart] w-inherit h-inherit" />}
        >
          Heart
        </Checkbox>
      </Section>
      <Section title="Checkbox Group" contentClass="flex flex-col gap-4">
        <CheckboxGroup defaultValue={['1', '2']} color="default">
          <Checkbox value="1">Vertical 1</Checkbox>
          <Checkbox value="2" isDisabled>Vertical 2</Checkbox>
          <Checkbox value="3">Vertical 3</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup defaultValue={['1', '2']} orientation="horizontal">
          <Checkbox value="1">Horizontal 1</Checkbox>
          <Checkbox value="2">Horizontal 2</Checkbox>
        </CheckboxGroup>
        <Box className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <Box className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <Box className="text-sm text-gray-800">Group support checkboxs `color`, `size`, `radius`, `isDisabled` and `isReadOnly` properties.</Box>
        </Box>
      </Section>
    </Page>
  )
}
