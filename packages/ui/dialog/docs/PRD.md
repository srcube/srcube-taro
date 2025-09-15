# 产品需求文档：@srcube-taro/ui Dialog 组件

## 1. 简介

使用 TaroJS 构建应用的开发者需要一个强大且灵活的 Dialog 组件。采用 **Headless 设计模式**，开发者需要一个专门针对确认、提示和交互场景优化的组件，提供预设的操作按钮、国际化支持和异步操作处理能力。

本文档概述了 `@srcube-taro/ui` 库中 Dialog 组件的需求。该组件基于 Modal 组件构建，通过 **DialogContent** 容器和 **Smart Hook** 模式，专门用于处理用户确认、提示和简单交互场景，提供开箱即用的操作按钮和优秀的开发者体验，同时保持最大的定制灵活性。

## 2. 目标

### 主要目标
* **Headless 架构：** 逻辑与 UI 完全分离，提供最大定制灵活性。
* **专业异步处理：** 内置 loading 状态、错误处理和异步操作管理。
* **Smart Hook 模式：** `useDialog` 封装所有状态管理和业务逻辑。
* **组合模式架构：** 通过 `DialogProvider` 和 `DialogContent` 实现组件解耦。
* **统一 API 设计：** 基于 Modal 的一致性接口和行为。

### 次要目标
* **移动端优化：** 触摸交互和响应式布局适配。
* **动画系统集成：** 流畅的进入/退出动画和状态转换。
* **国际化支持：** 多语言环境下的文本和布局适配。
* **无障碍访问增强：** 完整的 ARIA 支持和键盘导航。
* **开发者体验：** 直观的 API、完整的 TypeScript 支持和调试工具。

## 3. 目标用户

* **角色：** 前端和全栈开发者
* **职责：** 使用 TaroJS 框架构建移动端或 Web 应用程序的开发者。
* **需求和痛点：**
  * 需要快速实现用户确认和提示对话框。
  * 希望有预设的操作按钮和样式，减少重复代码。
  * 需要处理异步操作时的加载状态和错误处理。
  * 希望组件支持多语言和国际化。
  * 需要在不同场景下保持一致的用户体验。

## 4. 成功指标

* **采用率：** 该组件在至少 80% 需要对话框的新项目/功能中被使用。
* **开发者满意度：** 通过代码审查、团队聊天或简单调查获得开发者的积极反馈。我们的目标是满意度评分达到 4/5 或更高。
* **减少样板代码：** 在功能开发中实现对话框所需的代码行数可衡量地减少。
* **低错误率：** 在发布后的前 3 个月内报告的关键错误少于 2 个。

## 5. 功能和需求

### 5.1 Headless 架构设计
- **逻辑分离**：Dialog 组件作为 Headless 容器，仅负责状态管理和逻辑
- **DialogContent 容器**：专门的内容容器组件，处理布局和渲染
- **Context 共享**：通过 DialogProvider 实现组件间状态共享
- **Portal 渲染**：基于 Modal 的 Portal 渲染机制

### 5.2 Smart Hook 模式
- **useDialog Hook**：封装所有状态管理和业务逻辑
- **异步状态管理**：内置 `confirmLoading`、`cancelLoading` 状态
- **智能状态计算**：自动计算组件所需的所有状态和属性
- **Context 集成**：与 DialogProvider 无缝集成

### 5.3 专业异步操作支持
- **Promise 处理**：支持 `onConfirm` 和 `onCancel` 的 Promise 返回
- **Loading 状态**：自动管理确认和取消操作的加载状态
- **错误处理**：统一的异步操作错误处理机制
- **操作防抖**：防止重复点击和并发操作

### 5.4 组合模式架构
- **DialogContent**：主要内容容器，基于 ModalContent 构建
- **DialogHeader**：头部组件，支持标题和关闭按钮
- **DialogBody**：主体组件，用于内容展示
- **DialogFooter**：底部组件，支持操作按钮和自定义内容

### 5.5 操作按钮和交互
- **智能按钮渲染**：根据 `isConfirmOnly` 自动渲染按钮
- **按钮状态管理**：自动处理按钮的 loading 和 disabled 状态
- **自定义操作**：支持完全自定义的操作按钮
- **键盘交互**：ESC 关闭、Enter 确认等键盘快捷键

### 5.6 样式和主题系统
- **Color 属性**：支持 `primary`、`danger`、`warning` 等语义化颜色
- **主题集成**：与设计系统的深度集成
- **响应式设计**：移动端和桌面端的自适应布局
- **自定义样式**：完整的 className 和 style 支持

### 5.7 国际化和本地化
- **Lang 属性**：支持多语言环境配置
- **默认文本**：内置常用按钮文本的多语言支持
- **RTL 支持**：从右到左文本方向的完整支持
- **本地化格式**：不同地区的格式和约定支持

## 6. 超出范围

* **复杂表单对话框：** 包含复杂表单验证和多步骤流程的对话框。
* **拖拽和调整大小：** 用户手动拖拽或调整对话框大小的功能。
* **多对话框管理：** 复杂的多对话框层级管理系统。
* **高级动画效果：** 超出基础淡入淡出的复杂动画效果。
* **内置表单组件：** 对话框内置的表单输入组件。

## 7. 技术规格

### 架构设计
* **Headless 设计模式：** Dialog 作为逻辑容器，DialogContent 负责 UI 渲染。
* **基于 Modal 继承：** 完全继承 Modal 的 Portal 渲染和状态管理能力。
* **Smart Hook 模式：** `useDialog` Hook 封装所有状态管理和业务逻辑。
* **Context Provider 模式：** 通过 DialogProvider 实现组件间状态共享。
* **专业异步处理：** 内置 Promise 处理、Loading 状态和错误管理。
* **组合模式架构：** DialogContent + DialogHeader/Body/Footer 的组合设计。
* **TypeScript 支持：** 完整的类型定义、泛型支持和类型安全。

### 文件结构

```
packages/ui/dialog/
├── src/
│   ├── dialog.tsx              # 主组件 (Headless 容器)
│   ├── dialog-content.tsx      # 内容容器组件
│   ├── dialog-header.tsx       # 头部组件
│   ├── dialog-body.tsx         # 主体组件
│   ├── dialog-footer.tsx       # 底部组件
│   ├── use.ts                  # Smart Hook (状态管理)
│   ├── context.ts              # Context Provider
│   ├── i18n/                   # 国际化文件
│   └── index.ts                # 统一导出
├── docs/
│   ├── PRD.md                  # 产品需求文档
│   └── SUMMARY.md              # 组件设计评分总结
└── package.json
```

### 核心属性

#### Dialog 主组件 (Headless 容器)
```typescript
interface DialogProps extends UseModalProps {
  children: React.ReactNode // 内容 (通常是 DialogContent)
}

interface UseDialogProps extends UseModalProps {
  // 基础属性
  color?: 'primary' | 'danger' | 'warning' | 'success' // 确认按钮颜色主题
  title?: React.ReactNode // 对话框标题
  lang?: 'en' | 'zh-CN' | 'zh-TW' // 语言设置
  
  // 操作配置
  isConfirmOnly?: boolean // 是否只显示确认按钮
  onConfirm?: () => void | Promise<void> // 确认回调
  onCancel?: () => void | Promise<void> // 取消回调
  
  // 按钮自定义
  confirmContent?: React.ReactNode | ((loading: boolean) => React.ReactNode)
  cancelContent?: React.ReactNode | ((loading: boolean) => React.ReactNode)
}
```

#### useDialog Hook (Smart Hook)
```typescript
interface UseDialogReturn {
  // 基础状态 (继承自 useModal)
  isOpen: boolean // 当前显示状态
  open: () => void // 打开对话框
  close: () => void // 关闭对话框
  toggle: () => void // 切换显示状态
  
  // 异步操作状态
  confirmLoading: boolean // 确认操作加载状态
  cancelLoading: boolean // 取消操作加载状态
  
  // 操作方法
  handleConfirm: () => Promise<void> // 处理确认操作
  handleCancel: () => Promise<void> // 处理取消操作
  
  // 组件属性获取器
  getDialogProps: () => DialogProps // 获取 Dialog 组件 props
  getDialogContentProps: () => DialogContentProps // 获取 DialogContent props
  
  // Context 相关
  DialogProvider: React.ComponentType<{ value: UseDialogReturn; children: React.ReactNode }>
  
  // 国际化
  t: (key: string) => string // 翻译函数
}
```

#### DialogContent 组件
```typescript
interface DialogContentProps {
  className?: string // 自定义样式类
  children?: React.ReactNode // 自定义内容
  // 继承所有 ModalContent 属性
}
```

## 8. 待解决的问题

### 高优先级
1. **异步错误处理增强**：更完善的错误边界和用户友好的错误提示
2. **移动端交互优化**：触摸反馈、手势支持和响应式布局改进
3. **性能监控和优化**：大量实例时的内存管理和渲染性能

### 中优先级
4. **无障碍访问完善**：ARIA 属性、键盘导航和屏幕阅读器支持增强
5. **主题系统深度集成**：与设计系统的无缝集成和动态主题切换
6. **国际化功能扩展**：更多语言支持、RTL 布局和本地化格式

### 低优先级
7. **开发者工具集成**：调试面板、性能分析和开发模式增强
8. **高级动画效果**：更丰富的进入/退出动画和状态转换
9. **测试覆盖率提升**：单元测试、集成测试和 E2E 测试完善
