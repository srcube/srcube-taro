import { Page } from '@/components/page'
import { Section } from '@/components/section'
import { Spinner } from '@srcube-taro/ui'

export default function SpinnerDemo() {
  return (
    <Page>
      <Section title="Colors" contentClass="grid grid-cols-6 gap-4 justify-items-center">
        <Spinner color="default" />
        <Spinner color="primary" />
        <Spinner color="danger" />
        <Spinner color="warning" />
        <Spinner color="success" />
      </Section>

      <Section title="Sizes" contentClass="grid grid-cols-5 gap-4 items-center">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Section>

      <Section title="Label" contentClass="grid grid-cols-3 gap-2">
        <Spinner color="default" label="Loading" />
        <Spinner color="primary" label="Loading" />
        <Spinner color="danger" label="Loading" />
        <Spinner color="warning" label="Loading" />
        <Spinner color="success" label="Loading" />
      </Section>
    </Page>
  )
}
