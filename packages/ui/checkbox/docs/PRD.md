# 产品需求文档：@srcube-taro/ui Checkbox 组件

## 1. 简介

使用 TaroJS 构建应用的开发者需要一个强大且灵活的 Checkbox 组件。虽然 `@tarojs/components` 提供了原生的 Checkbox，但它缺乏高级功能、一致的主题化能力，以及在复杂场景下的易用性，如处理加载状态、不确定状态或跨不同平台的一致样式。

本文档概述了 `@srcube-taro/ui` 库中新 Checkbox 组件的需求。该组件将基于标准 Taro checkbox 构建，提供更强大、可定制且对开发者友好的体验，确保 UI 一致性并减少样板代码。

## 2. 目标

* **提供一致的 API：** 为开发者提供清晰且可预测的属性集合。
* **简化主题化和定制：** 允许开发者轻松更改复选框的外观以匹配其应用程序的设计系统。
* **处理常见用例：** 原生支持 `loading`、`disabled`、`indeterminate` 等状态和图标。
* **改善开发者体验：** 减少实现常见复选框功能所需的代码量。
* **支持复选框组：** 提供 `CheckboxGroup` 组件以轻松管理一组相关复选框的布局和共享属性。
* **支持高级状态：** 提供不确定状态、删除线效果等高级功能。

## 3. 目标用户

* **角色：** 前端和全栈开发者
* **职责：** 使用 TaroJS 框架构建移动端或 Web 应用程序的开发者。
* **需求和痛点：**
  * 需要快速高效地构建 UI。
  * 在应用程序的不同部分维护一致样式方面存在困难。
  * 为常见 UI 模式编写样板代码花费太多时间（例如，处理复选框加载状态）。
  * 希望组件易于使用、文档完善，并且足够灵活以适应其特定的设计要求。

## 4. 成功指标

* **采用率：** 该组件在至少 80% 需要复选框的新项目/功能中被使用。
* **开发者满意度：** 通过代码审查、团队聊天或简单调查获得开发者的积极反馈。我们的目标是满意度评分达到 4/5 或更高。
* **减少样板代码：** 在功能开发中实现复选框所需的代码行数可衡量地减少。
* **低错误率：** 在发布后的前 3 个月内报告的关键错误少于 2 个。

## 5. 功能和需求

### 功能 1：基础复选框
* **需求 1.1：** 组件应渲染原生 Taro 复选框。
* **需求 1.2：** 应接受 `children` 属性以在复选框内显示文本或其他元素。
* **需求 1.3：** 应处理 `onTap` 事件。
* **需求 1.4：** 应支持受控和非受控模式（`isSelected` 和 `defaultSelected`）。

### 功能 2：样式和变体
* **需求 2.1：** 复选框必须支持多种 `color` 主题（例如 `default`、`primary`、`success`、`warning`、`danger`）。
* **需求 2.2：** 复选框必须支持不同的 `size` 选项（例如 `xs`、`sm`、`md`、`lg`）。
* **需求 2.3：** 复选框必须支持不同的 `radius` 选项（例如 `none`、`xs`、`sm`、`md`、`lg`、`full`）。

### 功能 3：状态管理
* **需求 3.1：** 复选框必须有 `disabled` 状态，防止交互并在视觉上表明它处于非活动状态。
* **需求 3.2：** 复选框必须有 `loading` 状态，显示加载器并禁用复选框。
* **需求 3.3：** 复选框必须支持 `readOnly` 状态，允许显示但不允许用户交互。
* **需求 3.4：** 复选框必须支持 `indeterminate` 状态（部分选中状态）。

### 功能 4：内容增强
* **需求 4.1：** 复选框应允许自定义图标或使用函数渲染图标。
* **需求 4.2：** 复选框应支持删除线效果（`isLineThrough`），在选中时在文本上显示删除线。

### 功能 5：自动加载
* **需求 5.1：** 复选框应支持自动加载模式，在异步操作期间自动显示加载状态。
* **需求 5.2：** 应提供 `withLoading` 工具函数来处理异步操作。

### 功能 6：复选框组
* **需求 6.1：** 应创建 `CheckboxGroup` 组件将多个复选框组合在一起。
* **需求 6.2：** `CheckboxGroup` 应控制其内部复选框的布局和间距。
* **需求 6.3：** `CheckboxGroup` 可以向所有子复选框传递共享属性（如 `size`、`color`、`radius`、`isDisabled`、`isReadOnly`）。
* **需求 6.4：** `CheckboxGroup` 应支持垂直和水平方向布局。
* **需求 6.5：** `CheckboxGroup` 应支持受控和非受控的值管理。

## 6. 超出范围

* **复杂动画：** 超出标准悬停/按压效果的高级动画。
* **带进度指示器的异步操作：** 为长时间运行的任务显示进度条的复选框。
* **与表单库的集成：** 与特定表单管理库的直接内置集成。
* **复杂的验证逻辑：** 内置的复杂表单验证功能。

## 7. 技术规范

### 架构模式
* 采用"智能钩子"模式，逻辑封装在 `useCheckbox` 和 `useCheckboxGroup` 中
* UI 组件保持简洁，专注于渲染
* 使用 `tailwind-variants` 管理样式变体

### 文件结构
```
packages/ui/checkbox/
├── src/
│   ├── index.ts                    # 导出文件
│   ├── checkbox.tsx                # 主组件
│   ├── use.ts                      # 逻辑钩子
│   ├── checkbox-group/
│   │   ├── checkbox-group.tsx      # 组合组件
│   │   ├── use.ts                  # 组合逻辑
│   │   └── context.tsx             # 上下文提供者
│   └── hooks/
│       └── use-checkbox-item.ts    # 项目逻辑
└── docs/
    └── PRD.md                      # 本文档
```

### 主要 Props

#### Checkbox Props
- `isSelected?: boolean` - 受控选中状态
- `defaultSelected?: boolean` - 默认选中状态
- `value?: string` - 复选框值
- `isDisabled?: boolean` - 禁用状态
- `isReadOnly?: boolean` - 只读状态
- `isIndeterminate?: boolean` - 不确定状态
- `isLoading?: boolean | 'auto'` - 加载状态
- `isLineThrough?: boolean` - 删除线效果
- `color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'` - 颜色主题
- `size?: 'xs' | 'sm' | 'md' | 'lg'` - 尺寸
- `radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'` - 圆角
- `icon?: ReactNode | Function` - 自定义图标
- `onValueChange?: (isSelected: boolean) => void` - 值变化回调

#### CheckboxGroup Props
- `value?: string[]` - 受控值数组
- `defaultValue?: string[]` - 默认值数组
- `orientation?: 'vertical' | 'horizontal'` - 布局方向
- `isDisabled?: boolean` - 组禁用状态
- `isReadOnly?: boolean` - 组只读状态
- `color?: string` - 组颜色主题
- `size?: string` - 组尺寸
- `radius?: string` - 组圆角
- `onValueChange?: (value: string[]) => void` - 值变化回调

## 8. 待解决问题

* 在不同小程序平台上是否有需要注意的特定性能考虑？
* `onTap` 处理程序是否应自动处理 `Promise` 拒绝，还是应该留给开发者处理？
* 当复选框具有冲突属性时（例如，组上有一个 `size`，复选框上有不同的 `size`），`CheckboxGroup` 的期望行为是什么？
* 是否需要支持键盘导航和无障碍功能？
* 是否需要支持自定义主题和 CSS 变量？