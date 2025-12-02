# skeleton 组件设计

### Props

继承 NativeProps<ViewProps>

```text
isLoaded: boolean
children: ReactNode
classNames: Partial<Record<'base', 'content', string>> (SlotsToClasses<SkeletonSlots>)
```

### UI （themes/components/skeleton.ts）

大小由 内容 （content）决定，isLoaded 为 true 时，content 的 opacity 1，反之 0

isLoaded 为 false 时，做 gray-50 和 gray-100 的呼吸变色
