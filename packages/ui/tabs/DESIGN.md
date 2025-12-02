# Tabs Component Design

## Overview
The `Tabs` component organizes content into multiple sections and allows users to navigate between them. It supports horizontal and vertical layouts, scrolling, and various styling variants.

## Usage
```tsx
import { Tabs, Tab } from '@srcube-taro/tabs'

<Tabs aria-label="Tabs colors" color="primary" radius="full">
  <Tab key="photos" title="Photos" />
  <Tab key="music" title="Music" />
  <Tab key="videos" title="Videos" />
</Tabs>
```

## API

### Tabs Props
| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `default` \| `primary` \| `secondary` \| `success` \| `warning` \| `danger` | `default` | The color of the tabs. |
| `variant` | `solid` \| `underlined` \| `bordered` \| `light` | `solid` | The style variant of the tabs. |
| `size` | `sm` \| `md` \| `lg` | `md` | The size of the tabs. |
| `radius` | `none` \| `sm` \| `md` \| `lg` \| `full` | `md` | The border radius of the tabs. |
| `fullWidth` | `boolean` | `false` | Whether the tabs should take up the full width of the container. |
| `isDisabled` | `boolean` | `false` | Whether the tabs are disabled. |
| `selectedKey` | `string` \| `number` | - | The key of the currently selected tab (controlled). |
| `defaultSelectedKey` | `string` \| `number` | - | The initial selected key (uncontrolled). |
| `onSelectionChange` | `(key: Key) => void` | - | Handler that is called when the selection changes. |
| `isVertical` | `boolean` | `false` | Whether the tabs should be vertical. |

### Tab Props
| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `key` | `string` \| `number` | - | Unique identifier for the tab. |
| `title` | `ReactNode` | - | The content to display in the tab header. |
| `isDisabled` | `boolean` | `false` | Whether the tab is disabled. |

## Architecture
- **State Management**: Uses `useTabs` hook to manage selection state and context.
- **Styling**: Uses `@srcube-taro/theme` with `tailwind-variants` for consistent styling.
- **Scrolling**: Uses `ScrollView` from `@tarojs/components` to handle overflow.
