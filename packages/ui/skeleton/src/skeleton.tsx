import type { TaroElement } from '@tarojs/runtime'
import type { UseSkeletonProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSkeleton } from './use'

export interface SkeletonProps extends UseSkeletonProps {}

const Skeleton = forwardRef<TaroElement, SkeletonProps>((props, ref) => {
  const { children, isLoaded, styles, getSkeletonProps } = useSkeleton({
    ...props,
    ref,
  })

  return (
    <View {...getSkeletonProps()}>
      {!isLoaded && (
        <View className={styles.placeholder} />
      )}
      <View className={styles.content} style={{ opacity: isLoaded ? 1 : 0 }}>
        {children}
      </View>
    </View>
  )
})

Skeleton.displayName = 'Srcube.Skeleton'

export default Skeleton
