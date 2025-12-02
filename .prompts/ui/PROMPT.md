# Srcube Taro UI 组件库架构与开发指南

## 1. 引言

本文档旨在概述 `@srcube-taro` 库中 UI 组件的完整架构原则和开发标准。Srcube Taro 是一个基于 Taro.js 的现代化 UI 组件库，采用 monorepo 架构，使用 pnpm workspace 进行包管理。其目的是确保每个组件都具有一致性、可扩展性和可维护性，同时提供最大化的灵活性和定制能力。

## 2. 整体架构设计

### 2.1 核心技术栈

- **核心框架:** Taro.js (用于跨平台), React.js
- **样式系统:** TailwindCSS@3.4.1 + `weapp-tailwindcss` 适配
- **样式变体:** `tailwind-variants` 用于管理组件样式
- **状态管理:** React Context + 自定义 Hooks
- **类型系统:** 完整的 TypeScript 支持
- **国际化:** react-i18next 用于多语言支持

### 2.2 Workspace 结构

```
apps/
└── example/        # 示例应用
packages/
├── core/           # 核心基础设施
│   ├── hooks/      # React Hooks 集合
│   ├── theme/      # TailwindCSS 插件以及组件样式定义
│   └── ui/         # 统一导出包
├── ui/             # UI 组件实现
│   ├── app/        # 应用级组件和全局管理
│   ├── button/     # 按钮组件
│   ├── modal/      # 模态框组件
│   └── ...         # 其他组件
└── utils/          # 工具函数库
    ├── func/       # 通用函数工具
    ├── react/      # React 相关工具
    ├── taro/       # Taro.js 相关工具
    ├── tv/         # Tailwind Variants 工具
    └── types/      # TypeScript 类型定义
```

### 2.3 设计原则
- **参考架构:** 我们参考 [Adobe React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html) 的组件设计原则和 [HeroUI Codebase](https://github.com/heroui-inc/heroui) 的代码风格
- **Headless 设计:** 逻辑与视觉完全分离，实现最大化灵活性
- **组件独立性:** 每个组件必须是自包含的、独立的包
- **分层架构:** Core（基础设施）→ UI（组件实现）→ Utils（工具支持）

## 3. 核心架构模式

### 3.1 "智能钩子" (Smart Hook) 模式
组件的所有逻辑、状态和副作用都封装在一个专用的 **`use.ts`** 钩子中。

**示例: `useButton`**
`@srcube-taro/button` 组件的逻辑完全包含在 `useButton` 钩子中。这个钩子管理加载状态，根据 props (`variant`, `color`) 从 `@srcube-taro/theme` 计算样式，并包装事件处理程序。这使得 `Button.tsx` 文件成为一个简单的、声明式的渲染层。

### 3.2 Headless 组件设计

**核心理念:**
- **逻辑与视觉分离**: 组件专注于功能实现，样式完全可定制
- **最大化灵活性**: 开发者可以完全控制组件的外观和布局
- **保持一致性**: 通过主题系统提供默认样式，同时允许完全自定义

**实现方式:**
```text
// 传统方式
<Modal>
  <ModalContent>
    <ModalHeader>标题</ModalHeader>
    <ModalBody>内容</ModalBody>
  </ModalContent>
</Modal>

// Headless 方式
<Modal>
  <ModalBackdrop />  {/* 可独立使用和定制 */}
  <ModalContent>     {/* 可独立使用和定制 */}
    <ModalHeader>标题</ModalHeader>
    <ModalBody>内容</ModalBody>
  </ModalContent>
</Modal>
```

### 3.3 全局管理器模式 (SrcubeUI)

**@srcube-taro/app** 提供全局 UI 管理器，统一管理所有弹窗类组件：
- **管理组件**: Modal、Dialog、Drawer、Toast
- **特性**:
  - 统一的组件注册和渲染机制
  - Toast 堆叠效果管理（最多显示 3 个，支持缩放和位移）
  - 动态组件类型识别和渲染

### 3.4 组合与上下文模式
我们使用 React 上下文 (Context) 来实现强大的组合。`ButtonGroup` 组件向其 `Button` 子组件提供一个上下文，共享 `size` 和 `variant` 等属性。`useButton` 钩子消费这个上下文，允许按钮从其父组继承属性。

### 3.5 分层样式系统
- **Theme Layer**: 提供默认样式变体
- **Component Layer**: 实现功能逻辑
- **Style Layer**: 通过 Tailwind Variants 提供样式定制

所有样式都通过 `@srcube-taro/theme` 包中的 `tailwind-variants` 进行管理，确保一致且易于主题化的视觉系统。

## 4. 核心基础设施

### 4.1 @srcube-taro/hooks
- **功能**: 提供可复用的 React Hooks
- **主要 Hooks**:
  - `use-animate-presence`: 动画存在状态管理
  - `use-callback-ref`: 回调引用管理
  - `use-disclosure`: 显示/隐藏状态管理
  - `use-page-scroll-lock`: 页面滚动锁定
- **外部依赖**: 集成 React Stately 库的状态管理 hooks

### 4.2 @srcube-taro/theme
- **功能**: 统一的主题系统和样式定义
- **技术栈**: Tailwind CSS + Tailwind Variants
- **组件样式**: 为所有 UI 组件提供一致的样式变体
- **布局样式**: Box 和 Stack 布局组件的样式定义
- **插件系统**: 支持主题扩展和自定义

### 4.3 工具包架构

**@srcube-taro/utils-tv**:
- 小程序字符转义处理（解决小程序平台限制）
- 自定义 twMerge 配置（支持安全区域类名）
- 动画类名支持

**其他工具包**:
- **@srcube-taro/utils-func**: 通用函数工具
- **@srcube-taro/utils-react**: React 相关工具
- **@srcube-taro/utils-taro**: Taro 平台特定工具
- **@srcube-taro/utils-types**: TypeScript 类型定义

## 5. 组件开发标准

### 5.1 文件组织
- 每个组件必须是 `packages/ui` 中的一个独立包
- 源代码位于 `src` 目录中
- **`src/index.ts`**: 导出组件和所有公共类型定义
- **`src/[component-name].tsx`**: 组件的 UI 实现（展示层）
- **`src/use.ts`**: 组件的逻辑和状态管理（"智能钩子"）
- **`packages/core/theme/[components|layout]/[component-name].ts`**: 使用 `tailwind-variants` 的样式定义

### 5.2 代码标准
- **UI/逻辑分离**: UI 代码在 `.tsx` 文件中；逻辑在 `use.ts` 文件中
- **导出**: 对组件使用默认导出。`index.ts` 文件是包的公共 API
- **Props**: 布尔类型的 props 必须使用语义化的前缀：`is` (状态), `has` (功能存在), `should` (条件动作), 或 `can` (能力)，`on` (事件处理)
- **Logic**: 组件的逻辑和状态管理都在 `use.ts` 文件中实现, 合理使用 `useState`, `useEffect`, `useMemo`, `useCallback` 等 hooks, 事件定义以 `handle` 开头
- **类型安全**: 提供完整的 TypeScript 类型定义

#### 5.2.1 统一错误处理标准

所有UI组件的事件处理函数都必须遵循以下错误处理模式：

**标准实现模式**:
```typescript
const handleAction = useCallback(async (event: any) => {
  if (isLoading || isDisabled)
    return

  setIsLoading(true)

  try {
    await onAction?.(event)
  }
  catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ComponentName] Action failed:`, error)
    }
  }
  finally {
    setIsLoading(false)
  }
}, [isLoading, isDisabled, onAction])
```

**核心原则**:
- 防御性编程：所有异步操作必须包含错误捕获
- 状态一致性：错误发生时确保组件状态正确重置
- 开发友好：开发环境下提供详细的错误信息

### 5.3 组件架构模式
每个 UI 组件包都遵循统一的架构模式：
- **组件实现**: 主组件 + 子组件（如 Header、Body、Footer）
- **Context 系统**: 使用 React Context 进行状态共享
- **Hooks 集成**: 使用自定义 hooks 管理组件逻辑
- **Headless 设计**: 支持逻辑与视觉分离

## 6. 架构优势与特点

### 6.1 核心优势
- **一致性**: 所有组件共享相同的结构和模式
- **可维护性**: 逻辑集中在钩子中，易于定位和修改
- **灵活性**: 组合和上下文允许强大的 UI 组合
- **可测试性**: 钩子可以作为纯函数进行测试，与 UI 分离
- **可扩展性**: Headless 设计支持多主题切换和平台适配

### 6.2 开发体验
- **模块化设计**: 每个组件独立打包，支持按需引入
- **类型安全**: 完整的 TypeScript 支持
- **主题一致性**: 统一的主题系统确保视觉一致性
- **跨端兼容**: 基于 Taro.js，支持多端部署
- **现代化工具链**: 使用 tsup、pnpm、moon 等现代工具

### 6.3 Headless 设计的优势

**开发者体验**:
- **完全控制**: 可以完全自定义组件的外观和行为
- **渐进增强**: 可以使用默认样式，也可以完全重写
- **组合灵活**: 可以只使用需要的部分组件

**维护性**:
- **关注点分离**: 逻辑和样式独立维护
- **测试友好**: 可以独立测试逻辑和视觉
- **版本兼容**: 样式更新不影响功能逻辑

**可扩展性**:
- **主题系统**: 支持多主题切换
- **平台适配**: 同一套逻辑适配不同平台的视觉规范
- **定制化**: 满足不同项目的个性化需求

## 7. 设计原则

1. **功能完整性**: 确保 Headless 组件提供完整的功能逻辑
2. **API 一致性**: 保持组件 API 的一致性和可预测性
3. **可访问性**: 内置完整的无障碍访问支持
4. **性能优化**: 避免不必要的重渲染和计算
5. **类型安全**: 提供完整的 TypeScript 类型定义

这种架构设计既保证了组件的独立性和可维护性，又通过统一的基础设施确保了整体的一致性和开发效率。特别是 Headless 组件设计思想的应用，使得组件库能够适应各种不同的使用场景和定制需求，真正实现了"一套逻辑，多种表现"的设计目标。
