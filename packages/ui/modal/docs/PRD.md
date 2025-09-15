# Modal 组件产品需求文档

## 简介

Modal 组件是 `@srcube-taro/ui` 设计系统中的核心交互组件，采用 **Headless 设计模式**，用于在当前页面上方显示临时内容，如确认对话框、表单、详细信息等。该组件基于 Portal 渲染机制，提供灵活的配置选项、优秀的用户体验和开发者友好的 API，支持完整的组合模式和智能状态管理。

## 目标

### 主要目标
- **Headless 设计架构**：逻辑与 UI 完全分离，提供最大的定制灵活性
- **Portal 渲染机制**：使用 RootPortal 确保正确的层级管理和性能优化
- **Smart Hook 模式**：通过 `useModal` 提供专业的状态管理和逻辑封装
- **组合模式支持**：支持 ModalContent、ModalHeader、ModalBody、ModalFooter 的灵活组合
- **跨端兼容性**：完美支持 H5/小程序等多端环境
- **优秀的开发体验**：提供完整的 TypeScript 支持和直观的 API 设计

### 次要目标
- **动画系统集成**：集成 `useAnimatePresence` 提供流畅的进出场动画
- **滚动锁定机制**：通过 `usePageScrollLock` 防止背景页面滚动
- **无障碍访问支持**：符合 ARIA 标准的键盘导航和屏幕阅读器支持
- **性能优化**：Portal 渲染优化、智能重渲染控制、内存管理优化

## 目标用户

### 主要用户
- **前端开发者**：使用 Taro 框架开发跨平台应用的开发者
- **UI/UX 设计师**：需要一致设计语言的设计师
- **产品经理**：关注用户体验和功能完整性的产品经理

### 使用场景
- 小程序应用开发
- H5 移动端应用
- 跨平台应用开发
- 企业级应用开发

## 成功指标

### 采用率指标
- 组件在项目中的使用率 > 80%
- 开发者满意度评分 > 4.5/5
- 代码重用率提升 > 60%
- Bug 报告率 < 2%

### 性能指标
- 组件渲染时间 < 16ms
- 包体积增量 < 10KB
- 内存占用优化 > 20%

## 功能特性和需求

### 1. Headless 架构设计

#### 1.1 Smart Hook 模式
- **逻辑分离**：`useModal` Hook 封装所有状态管理和业务逻辑
- **状态管理**：集成 `useOverlayTriggerState` 提供专业的覆盖层状态管理
- **动画集成**：内置 `useAnimatePresence` 管理进出场动画状态
- **滚动锁定**：集成 `usePageScrollLock` 自动管理页面滚动锁定

#### 1.2 Portal 渲染机制
- **层级管理**：使用 `RootPortal` 确保正确的 DOM 层级
- **性能优化**：Portal 渲染减少不必要的重绘和回流
- **容器控制**：支持自定义渲染容器
- **多实例支持**：支持多个模态框同时存在的场景

### 2. 组合模式架构

#### 2.1 ModalContent 容器
- **内容封装**：提供标准的模态框内容容器
- **样式管理**：通过 tailwind-variants 提供响应式样式
- **布局控制**：支持自定义宽度、高度和位置
- **主题集成**：完整的主题系统支持

#### 2.2 组合子组件
- **ModalHeader**：标准化的头部组件，支持标题和关闭按钮
- **ModalBody**：主体内容区域，支持滚动和内边距控制
- **ModalFooter**：底部操作区域，支持按钮组合和对齐
- **Context 共享**：通过 `ModalProvider` 实现组件间状态共享

### 3. 智能状态管理

#### 3.1 专业状态管理
- **useOverlayTriggerState**：专业的覆盖层状态管理 Hook
- **受控/非受控模式**：支持完全受控和非受控两种使用模式
- **状态同步**：自动同步内部状态与外部 props
- **事件回调**：提供完整的生命周期回调事件

#### 3.2 动画状态管理
- **useAnimatePresence**：专业的动画状态管理
- **进出场控制**：智能控制组件的挂载和卸载时机
- **动画同步**：确保动画与状态变化的完美同步
- **性能优化**：避免不必要的动画计算和渲染

### 4. 组合组件

#### 4.1 Modal.Header
- **标题显示**：支持文本和自定义内容
- **关闭按钮**：可选的内置关闭按钮
- **样式定制**：支持自定义头部样式

#### 4.2 Modal.Body
- **内容区域**：主要内容显示区域
- **滚动控制**：支持内容滚动配置
- **内边距控制**：可配置内容区域的内边距

#### 4.3 Modal.Footer
- **操作按钮**：支持确认、取消等操作按钮
- **按钮布局**：支持左对齐、右对齐、居中等布局
- **自定义内容**：支持自定义底部内容

### 5. 样式定制

#### 5.1 尺寸控制
- **预设尺寸**：small、medium、large、full 等预设尺寸
- **自定义尺寸**：支持自定义宽度和高度
- **响应式**：支持不同屏幕尺寸的适配

#### 5.2 位置控制
- **居中显示**：默认居中显示
- **自定义位置**：支持自定义模态框位置
- **边距控制**：支持设置与屏幕边缘的距离

#### 5.3 主题支持
- **主题变量**：支持 CSS 变量定制
- **暗色模式**：支持明暗主题切换
- **品牌定制**：支持品牌色彩定制

## 超出范围的功能

以下功能暂不包含在当前版本中：

- **拖拽功能**：模态框拖拽移动（可能在未来版本中添加）
- **调整大小**：用户手动调整模态框大小
- **多窗口管理**：复杂的多窗口管理系统
- **高级动画**：复杂的 3D 动画效果
- **虚拟化**：大量内容的虚拟化渲染
- **国际化**：内置的多语言支持（由使用者处理）

## 技术规格

### 架构设计
- **Headless 设计模式**：逻辑与 UI 完全分离，提供最大的定制灵活性
- **Smart Hook 模式**：`useModal` Hook 封装所有状态管理和业务逻辑
- **Portal 渲染机制**：使用 `RootPortal` 确保正确的层级管理和性能优化
- **组合模式**：通过 `ModalProvider` Context 实现组件间状态共享
- **专业状态管理**：集成 `useOverlayTriggerState` 和 `useAnimatePresence`
- **TypeScript 支持**：完整的类型定义和类型安全

### 文件结构

```
packages/ui/modal/
├── src/
│   ├── modal.tsx              # 主组件 (Headless 容器)
│   ├── modal-content.tsx      # 内容容器组件
│   ├── modal-backdrop.tsx     # 背景遮罩组件
│   ├── modal-header.tsx       # 头部组件
│   ├── modal-body.tsx         # 主体组件
│   ├── modal-footer.tsx       # 底部组件
│   ├── use.ts                 # Smart Hook (状态管理)
│   ├── context.ts             # Context Provider
│   └── index.ts               # 统一导出
├── docs/
│   ├── PRD.md                 # 产品需求文档
│   └── SUMMARY.md             # 组件设计评分总结
└── package.json
```

### 核心属性

#### Modal 主组件 (Headless 容器)
```typescript
interface ModalProps extends UseModalProps {
  children: React.ReactNode // 内容 (通常是 ModalContent)
}

interface UseModalProps {
  isOpen?: boolean // 受控模式：是否显示
  defaultOpen?: boolean // 非受控模式：默认是否显示
  onOpenChange?: (isOpen: boolean) => void // 状态变化回调
  isDismissable?: boolean // 是否可通过背景点击关闭
  hasBackdrop?: boolean // 是否显示背景遮罩
  classNames?: SlotsToClasses<ModalSlots> // 样式类名映射
}
```

#### useModal Hook (Smart Hook)
```typescript
interface UseModalReturn {
  isOpen: boolean // 当前显示状态
  open: () => void // 打开模态框
  close: () => void // 关闭模态框
  toggle: () => void // 切换显示状态
  isVisible: boolean // 动画可见状态
  styles: Record<string, string> // 计算后的样式
  getModalProps: () => ModalProps // 获取 Modal 组件 props
  getBackdropProps: () => ModalBackdropProps // 获取背景遮罩 props
  // Context 相关
  ModalProvider: React.ComponentType<{ value: UseModalReturn; children: React.ReactNode }>
}
```

#### ModalContent 组件
```typescript
interface ModalContentProps {
  className?: string // 自定义样式类
  children?: React.ReactNode // 内容
  // 继承所有 HTML div 属性
}
```

## 待解决问题

### 高优先级
1. **移动端手势支持**：滑动关闭和触摸反馈优化
2. **动画性能优化**：复杂动画在低端设备上的流畅度提升
3. **嵌套模态框管理**：多层模态框的 z-index 自动管理和焦点链

### 中优先级
4. **无障碍访问增强**：完善的 ARIA 属性、键盘导航和屏幕阅读器支持
5. **主题系统集成**：与设计系统的深度集成和动态主题切换
6. **内存泄漏防护**：大量实例的自动清理和性能监控

### 低优先级
7. **服务端渲染优化**：SSR 环境下的 Portal 渲染和水合优化
8. **开发者工具**：调试面板和性能分析工具
9. **国际化支持**：多语言环境下的布局和文本适配
