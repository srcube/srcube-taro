import { Section } from '@/components/section'
import { Box, Button } from '@srcube-taro/ui'
import { View } from '@tarojs/components'

export default function Buttons() {
  return (
    <Box className="flex flex-col gap-4 py-4">
      <Section title="Colors" contentClass="grid grid-cols-3 gap-2">
        <Button>Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="danger">Danger</Button>
        <Button color="warning">Warning</Button>
        <Button color="success">Success</Button>
      </Section>
      <Section title="Sizes" contentClass="grid grid-cols-4 gap-2">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </Section>
      <Section title="Variants" contentClass="grid grid-cols-4 gap-2">
        <Button variant="solid" color="primary">
          Solid
        </Button>
        <Button variant="outline" color="primary">
          Outline
        </Button>
        <Button variant="flat" color="primary">
          Flat
        </Button>
        <Button variant="link" color="primary">
          Link
        </Button>
        <Button variant="shadow" color="primary">
          Shadow
        </Button>
      </Section>
      <Section title="Layout" contentClass="flex flex-col gap-2">
        <Box className="grid grid-cols-2 gap-2">
          <Button
            startContent={<View className="i-[teenyicons--button-solid]" />}
          >
            Start Content
          </Button>
          <Button
            endContent={<View className="i-[teenyicons--button-solid]" />}
          >
            End Content
          </Button>
        </Box>
        <Button color="primary" block>
          BLOCK
        </Button>
      </Section>
      <Section title="State" contentClass="grid grid-cols-2 gap-2">
        <Button color="default" loading>
          Loading
        </Button>
        <Button color="danger" disabled>
          Disabled
        </Button>
      </Section>
    </Box>
  )
}
