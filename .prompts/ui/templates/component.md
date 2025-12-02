#### Component component.tsx

- Imports:
  - split types, definitions in same module

```tsx
// imports

export interface ComponentProps extends UseComponentProps {}

const Component = forwardRef<TaroElement, ComponentProps>((props, ref) => {
  const { ref, ...rest } = props

  return (
    <View ref={domRef} {...rest}>
      {/* Component renders */}
    </View>
  )
})

Component.displayName = 'Srcube.Component'

export default Component
