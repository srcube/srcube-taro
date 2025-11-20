import type { InputOtpProps } from '@srcube-taro/ui'
import { Button, Dialog, DialogBody, DialogContent, DialogHeader, InputOtp, usePageScrollLock } from '@srcube-taro/ui'
import { Page, Section } from '@/components'
import { useState } from 'react'
import { PageMeta } from '@tarojs/components'

export default function InputOtpPage() {
  const { isLocked } = usePageScrollLock()
  
  const [isPassward, setIsPassward] = useState(false)
  const [completeValue, setCompleteValue] = useState('')
  const [isCompleteOpen, setIsCompleteOpen] = useState(false)
  
  const colors: Array<InputOtpProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const sizes: Array<InputOtpProps['size']> = ['xs', 'sm', 'md', 'lg']

  return (
    <Page>
      <PageMeta pageStyle={isLocked ? 'overflow: hidden' : ''} />
      <Section title="Colors" contentClass="flex flex-col gap-4">
        {colors.map(c => (
          <InputOtp key={c} color={c} />
        ))}
      </Section>
      <Section title="Sizes" contentClass="flex flex-col gap-4">
        {sizes.map(s => (
          <InputOtp key={s} isPassword={isPassward} size={s} />
        ))}
        <Button isBlock className="mt-2" onTap={() => setIsPassward(!isPassward)}>
          {isPassward ? 'Show' : 'Hide'} Code
        </Button>
      </Section>
      <Section title="Password" contentClass="flex flex-col gap-4">
        <InputOtp isPassword />
      </Section>
      <Section title="Disabled" contentClass="flex flex-col gap-4">
        <InputOtp isDisabled />
      </Section>
      <Section title="ReadOnly" contentClass="flex flex-col gap-4">
        <InputOtp isReadOnly value='2025' />
      </Section>
      <Section title="Length" contentClass="flex flex-col gap-4">
        <InputOtp length={6} />
      </Section>
      <Section title="Keyboard Type" contentClass="flex flex-col gap-4">
        <InputOtp keyboardType="number" />
        <InputOtp keyboardType="text" />
      </Section>
      <Section title="Complete Show Value" contentClass="flex flex-col gap-4">
        <InputOtp onComplete={value => {
          setCompleteValue(value)
          setIsCompleteOpen(true)
        }} />
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
