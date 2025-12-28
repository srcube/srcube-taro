import type { InputOtpProps } from '@srcube-taro/ui'
import { ButtonGroup } from '@srcube-taro/button'
import { Button, Dialog, DialogBody, DialogContent, DialogHeader, InputOtp, usePageScrollLock } from '@srcube-taro/ui'
import { PageMeta } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useState } from 'react'
import { useMutative } from 'use-mutative'
import { Page, Section, StateAction, StateDemo } from '@/components'

export default function InputOtpPage() {
  const { isLocked } = usePageScrollLock()

  const [completeValue, setCompleteValue] = useState('')
  const [isCompleteOpen, setIsCompleteOpen] = useState(false)

  const colors: Array<InputOtpProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const variants: Array<InputOtpProps['variant']> = ['default', 'outline', 'twotone', 'underline']
  const sizes: Array<InputOtpProps['size']> = ['xs', 'sm', 'md', 'lg']
  const radius: Array<NonNullable<InputOtpProps['radius']>> = ['none', 'sm', 'md', 'lg', 'full']

  const [state, setState] = useMutative<InputOtpProps>({
    color: 'default',
    variant: 'default',
    size: 'md',
    radius: 'md',
    isDisabled: false,
    isReadOnly: false,
    isPassword: false,
  })

  const handleStateActionTap = (key: string, value: (typeof state)[keyof typeof state]) => {
    setState((draft) => {
      draft[key] = value
    })
  }

  return (
    <Page>
      <PageMeta pageStyle={isLocked ? 'overflow: hidden' : ''} />

      <Section title="Usage" contentClass="">
        <StateDemo className="h-20">
          <InputOtp {...state} />
        </StateDemo>

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
        <StateAction title="Variants" contentClass="">
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
        <StateAction title="Round" contentClass="flex flex-col gap-2">
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

        <StateAction title="State" contentClass="flex flex-col gap-2">
          <ButtonGroup size="sm" fullWidth>
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

      <Section title="Keyboard Type" contentClass="flex flex-col gap-4">
        <InputOtp keyboardType="number" />
        <InputOtp keyboardType="text" />
      </Section>

      <Section title="Complete Show Value" contentClass="flex flex-col gap-4">
        <InputOtp
          length={6}
          onComplete={(value) => {
            setCompleteValue(value)
            setIsCompleteOpen(true)
          }}
        />
        <Dialog isOpen={isCompleteOpen} isConfirmOnly onClose={() => setIsCompleteOpen(false)}>
          <DialogContent>
            <DialogHeader>
              Complete Show Value
            </DialogHeader>
            <DialogBody>
              Value: {completeValue}
            </DialogBody>
          </DialogContent>
        </Dialog>
      </Section>
    </Page>
  )
}
