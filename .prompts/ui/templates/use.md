#### Component use.ts

- Imports:
  - split types, definitions in same module
- Exclude native props that duplicate component props or whose names are unsuitable for the component [architecture](../PATTERN.md) like `disabled` to `isDisabled`

```ts
// imports

// Native props
type OmitNativeKeys = 'xxx' | 'xxx'

interface Props extends Omit<NativeProps<[NativeProps]>, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
   ref?: ReactRef
  // Component props
}

export type UseComponentProps = MergeVariantProps<Props, ComponentVariantProps>

export function useComponent(props: UseComponentProps) {
  const { ref, ...rest } = props
  
  const domRef = useDOMRef(ref)

  const slots = useMemo(
    () => component({/* component variants props */}),
    [/* deps */]
  )

  const styles = useMemo(() => {
    return {
      /* styles */
    }
  }), [/* deps */])

  return {
    // props & states
  }
}

export type UseComponentReturn = ReturnType<typeof useComponent>
```
