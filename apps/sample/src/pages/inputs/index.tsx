import type { InputProps } from '@srcube-taro/ui'
import { Box, Input } from '@srcube-taro/ui'
import { capitalize } from 'lodash-es'
import { Page, Section } from '@/components'

export default function Inputs() {
  const colors: Array<InputProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const variants: Array<InputProps['variant']> = ['default', 'outline', 'twotone', 'underline']
  const sizes: Array<InputProps['size']> = ['xs', 'sm', 'md', 'lg']

  return (
    <Page>
      <Section title="Colors" contentClass="flex flex-col gap-2">
        {colors.map(c => <Input key={c} color={c} defaultValue={capitalize(c)} />)}
      </Section>
      <Section title="Sizes" contentClass="flex flex-col gap-2">
        {sizes.map(s => <Input key={s} size={s} defaultValue={s?.toUpperCase()} />)}
      </Section>
      <Section title="Variants" contentClass="flex flex-col gap-2">
        {variants.map(v => colors.map(c => (
          <Input key={v} variant={v} color={c} defaultValue={capitalize(v)} />
        )))}
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
      <Section title="Disabled" contentClass="flex flex-col gap-2">
        {colors.map(c => <Input key={c} color={c} defaultValue={capitalize(c)} isDisabled isClearable />)}
      </Section>
    </Page>
  )
}
