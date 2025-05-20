import { Page } from '@/components/page'
import { Section } from '@/components/section'
import { Box } from '@srcube-taro/ui'

export default function Buttons() {
  return (
    <Page className="flex flex-col gap-4 py-4">
      <Section title="Box" contentClass="">
        <Box className="flex items-center justify-center size-24 rounded-lg bg-gray-100"></Box>
      </Section>
    </Page>
  )
}
