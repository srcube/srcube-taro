import { Spinner } from '@srcube-taro/ui'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export default function SpinnerDemo() {
  return (
    <Page>
      <Section title="Colors" contentClass="grid grid-cols-6 gap-4 justify-items-center">
        {colors.map(color => <Spinner key={color} color={color} />)}
      </Section>

      <Section title="Sizes" contentClass="grid grid-cols-5 gap-4 items-center">
        {sizes.map(size => <Spinner key={size} size={size} />)}
      </Section>

      <Section title="Label" contentClass="grid grid-cols-3 gap-2">
        {colors.map(color => <Spinner key={color} color={color} label="Loading" />)}
      </Section>
    </Page>
  )
}
