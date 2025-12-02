import { Button, Skeleton } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { useState } from 'react'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

const rounds = ['none', 'sm', 'md', 'lg', 'full'] as const

export default function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Page>
      <Section title="Basic" contentClass="grid grid-cols-3 gap-4">
        <Skeleton>
          <View className="h-14 w-40" />
        </Skeleton>
      </Section>

      <Section title="Controlled" contentClass="flex flex-col gap-4">
        <Skeleton isLoaded={loaded} className="w-fit">
          <View className="h-14 w-40 bg-secondary-500 rounded-xl" />
        </Skeleton>

        <Button color="primary" onTap={() => setLoaded(!loaded)}>
          {loaded ? 'Unload' : 'Loaded'}
        </Button>
      </Section>

      <Section title="Rounded" contentClass="flex gap-4 justify-items-center">
        {rounds.map(r => (
          <Skeleton key={r} rounded={r} isLoaded={false}>
            <View className="size-14" />
          </Skeleton>
        ))}
      </Section>
    </Page>
  )
}
