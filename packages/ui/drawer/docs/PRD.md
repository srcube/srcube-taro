# 产品需求文档：@srcube-taro/ui Drawer 组件

## 1. 简介

使用 TaroJS 构建应用的开发者需要一个强大且灵活的 Drawer 组件。虽然可以基于 Modal 组件构建抽屉，但开发者需要一个专门针对侧边栏、菜单和内容展示场景优化的组件，提供多种展示位置、流畅的动画效果和优秀的移动端体验。

本文档概述了 `@srcube-taro/ui` 库中 Drawer 组件的需求。该组件采用 **Headless 设计模式**，基于 Modal 组件构建，通过 **DrawerContent** 容器和 **Smart Hook** 模式，专门用于处理侧边栏导航、内容展示和移动端抽屉场景，提供开箱即用的位置配置和卓越的用户体验，同时保持最大的定制灵活性。

## 2. 目标

### 主要目标
* **Headless 架构：** 逻辑与 UI 完全分离，提供最大定制灵活性。
* **Placement 系统：** 支持 `left`、`right`、`top`、`bottom` 四个方向的精确控制。
* **Smart Hook 模式：** `useDrawer` 封装所有状态管理和业务逻辑。
* **组合模式架构：** 通过 `DrawerProvider` 和 `DrawerContent` 实现组件解耦。
* **移动端优化：** 专门针对移动设备的触摸交互和响应式设计。

### 次要目标
* **智能导航栏适配：** 自动处理移动端导航栏高度和安全区域。
* **动画系统集成：** 流畅的滑入/滑出动画和状态转换。
* **手势支持：** 滑动关闭和边缘拖拽等高级交互。
* **无障碍访问增强：** 完整的 ARIA 支持和键盘导航。
* **开发者体验：** 直观的 API、完整的 TypeScript 支持和调试工具。

## 3. 目标用户

* **角色：** 前端和全栈开发者
* **职责：** 使用 TaroJS 框架构建移动端或 Web 应用程序的开发者。
* **需求和痛点：**
  * 需要快速实现侧边栏导航和内容展示。
  * 希望有流畅的动画效果和多种展示位置。
  * 需要在不同移动端平台上保持一致的体验。
  * 希望组件能自动适配自定义导航栏。
  * 需要在不同场景下保持一致的用户体验。

## 4. 成功指标

* **采用率：** 该组件在至少 80% 需要抽屉的新项目/功能中被使用。
* **开发者满意度：** 通过代码审查、团队聊天或简单调查获得开发者的积极反馈。我们的目标是满意度评分达到 4/5 或更高。
* **减少样板代码：** 在功能开发中实现抽屉所需的代码行数可衡量地减少。
* **低错误率：** 在发布后的前 3 个月内报告的关键错误少于 2 个。

## 5. 功能和需求

### 功能 1：Headless 架构设计
* **需求 1.1：** 组件应采用 Headless 设计模式，逻辑与 UI 完全分离。
* **需求 1.2：** 应基于 Modal 组件构建，继承其所有基础功能。
* **需求 1.3：** 应提供 DrawerContent 容器组件，专门处理布局和渲染。
* **需求 1.4：** 应通过 DrawerProvider 实现组件间状态共享。

### 功能 2：Smart Hook 模式
* **需求 2.1：** 应提供 `useDrawer` Hook 封装所有状态管理和业务逻辑。
* **需求 2.2：** Hook 应智能处理四个方向的展示逻辑。
* **需求 2.3：** 应自动计算组件所需的所有状态和属性。
* **需求 2.4：** 应与 DrawerProvider 无缝集成。

### 功能 3：Placement 系统
* **需求 3.1：** 抽屉必须支持 `placement` 属性控制展示位置。
* **需求 3.2：** 应支持四个方向：`left`、`right`、`top`、`bottom` 的精确控制。
* **需求 3.3：** 应根据 placement 自动计算宽度或高度。
* **需求 3.4：** 应根据位置自动选择合适的滑入动画。

### 功能 4：组合模式架构
* **需求 4.1：** 应提供 `DrawerContent` 主要内容容器，基于 ModalContent 构建。
* **需求 4.2：** 应提供 `DrawerHeader` 组件，支持标题和关闭按钮。
* **需求 4.3：** 应提供 `DrawerBody` 组件用于内容展示。
* **需求 4.4：** 应提供 `DrawerFooter` 组件，支持操作按钮和自定义内容。

### 功能 5：移动端优化
* **需求 5.1：** 抽屉必须智能适配移动端导航栏高度和状态栏。
* **需求 5.2：** 应完整处理刘海屏和安全区域适配。
* **需求 5.3：** 应支持滑动关闭、边缘拖拽等高级交互。
* **需求 5.4：** 应针对移动端进行渲染和动画优化。

### 功能 6：动画系统集成
* **需求 6.1：** 应根据 placement 自动选择滑入方向。
* **需求 6.2：** 应提供流畅的进入/退出动画过渡。
* **需求 6.3：** 动画状态应与组件状态完美同步。
* **需求 6.4：** 应支持 GPU 加速和低端设备优化。

### 功能 7：交互和可访问性增强
* **需求 7.1：** 应支持 ESC 关闭、Tab 焦点管理等键盘导航。
* **需求 7.2：** 应在抽屉打开时实现焦点陷阱。
* **需求 7.3：** 应提供完整的 ARIA 属性和语义化标签。
* **需求 7.4：** 应支持大触摸目标和手势识别。

## 6. 超出范围

* **手势拖拽关闭：** 用户通过手势拖拽关闭抽屉的功能。
* **多层抽屉管理：** 复杂的多抽屉层级管理系统。
* **高级动画效果：** 超出基础滑动的复杂动画效果。
* **内置导航组件：** 抽屉内置的导航菜单组件。
* **响应式布局：** 根据屏幕尺寸自动切换展示模式。

## 7. 技术规格

### 架构设计
* **Headless 设计模式：** Drawer 作为逻辑容器，DrawerContent 负责 UI 渲染。
* **基于 Modal 继承：** 完全继承 Modal 的 Portal 渲染和状态管理能力。
* **Smart Hook 模式：** `useDrawer` Hook 封装所有状态管理和业务逻辑。
* **Context Provider 模式：** 通过 DrawerProvider 实现组件间状态共享。
* **Placement 系统：** 智能的四方向展示控制和动画适配。
* **移动端优化：** 专门的导航栏适配、安全区域处理和触摸交互。
* **TypeScript 支持：** 完整的类型定义、泛型支持和类型安全。

### 文件结构

```
packages/ui/drawer/
├── src/
│   ├── drawer.tsx              # 主组件 (Headless 容器)
│   ├── drawer-content.tsx      # 内容容器组件
│   ├── drawer-header.tsx       # 头部组件
│   ├── drawer-body.tsx         # 主体组件
│   ├── drawer-footer.tsx       # 底部组件
│   ├── use.ts                  # Smart Hook (状态管理)
│   ├── context.ts              # Context Provider
│   └── index.ts                # 统一导出
├── docs/
│   ├── PRD.md                  # 产品需求文档
│   └── SUMMARY.md              # 组件设计评分总结
└── package.json
```

### 核心属性

#### Drawer 主组件 (Headless 容器)
```typescript
interface DrawerProps extends UseModalProps {
  children: React.ReactNode // 内容 (通常是 DrawerContent)
}

interface UseDrawerProps extends UseModalProps {
  // 位置控制
  placement?: 'left' | 'right' | 'top' | 'bottom' // 展示位置，默认 'bottom'
  
  // 基础属性
  title?: React.ReactNode // 抽屉标题
  
  // 样式定制
  classNames?: SlotsToClasses<DrawerSlots> // 样式类名映射
}
```

#### useDrawer Hook (Smart Hook)
```typescript
interface UseDrawerReturn {
  // 基础状态 (继承自 useModal)
  isOpen: boolean // 当前显示状态
  open: () => void // 打开抽屉
  close: () => void // 关闭抽屉
  toggle: () => void // 切换显示状态
  
  // Placement 相关
  placement: DrawerPlacement // 当前展示位置
  
  // 组件属性获取器
  getDrawerProps: () => DrawerProps // 获取 Drawer 组件 props
  getDrawerContentProps: () => DrawerContentProps // 获取 DrawerContent props
  
  // Context 相关
  DrawerProvider: React.ComponentType<{ value: UseDrawerReturn; children: React.ReactNode }>
  
  // 样式和动画
  styles: Record<string, string> // 计算后的样式
  isVisible: boolean // 动画可见状态
}
```

#### DrawerContent 组件
```typescript
interface DrawerContentProps {
  className?: string // 自定义样式类
  children?: React.ReactNode // 自定义内容
  // 继承所有 ModalContent 属性
}
```

#### DrawerSlots 类型定义
```typescript
type DrawerSlots = 
  | 'wrapper'
  | 'backdrop' 
  | 'content'
  | 'header'
  | 'body'
  | 'footer'
  | 'closeButton'
```

## 8. 待解决的问题

### 高优先级
1. **手势系统完善**：滑动关闭、边缘拖拽和触摸反馈的流畅度优化
2. **移动端导航栏适配**：更智能的导航栏高度检测和安全区域处理
3. **性能监控和优化**：大量实例时的内存管理和动画性能

### 中优先级
4. **响应式设计增强**：不同屏幕尺寸下的最佳展示效果和交互体验
5. **动画系统优化**：更丰富的动画效果和低端设备性能优化
6. **无障碍访问完善**：ARIA 属性、键盘导航和屏幕阅读器支持增强

### 低优先级
7. **多平台一致性**：iOS、Android、Web 平台的行为和样式统一
8. **主题系统深度集成**：与设计系统的无缝集成和动态主题切换
9. **开发者工具集成**：调试面板、性能分析和开发模式增强
