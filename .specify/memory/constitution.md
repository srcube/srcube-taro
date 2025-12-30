<!--
Sync Impact Report:
- Version change: 1.0.0 -> 1.1.0
- List of modified principles:
  - Updated [PRINCIPLE_2] (Styling Strategy) to mandate `mapPropsVariants` and `useMemo` for slots.
- Added sections: None
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ aligned via delegation)
  - .specify/templates/spec-template.md (✅ aligned via delegation)
  - .specify/templates/tasks-template.md (✅ aligned via delegation)
- Follow-up TODOs: Refactor existing components (e.g., listbox-item) to comply.
-->
# Srcube Taro Constitution

## Core Principles

### I. Cross-Platform & Headless Architecture
Build headless, cross-platform components using React Hooks and Taro components. Components must support Mini-programs, H5, and React Native.
- Keep APIs consistent: naming, events, ref forwarding, defaults.
- Logic must be separated into custom hooks (`use.ts`).
- UI must be declarative and composed of Taro components.

### II. Styling Strategy (Tailwind + Variants)
Use `weapp-tailwindcss` for compiling Tailwind utilities to mini-programs and `tailwind-variants` (tv) for component states.
- Define variants (size/color/isDisabled/isLoading) via `tv` in `@srcube-taro/theme`.
- Use `mapPropsVariants` to separate component props from variant props.
- Compute slots via `useMemo` in the hook (or component) using the separated variant props.
- Replace unsupported selectors (like group/peer) with variant-driven logic.
- Ensure static, predictable class generation.

### III. Accessibility & I18n First
Components must be accessible and internationalizable by default.
- **Accessibility**: Support aria attributes, keyboard interactions, and focus management (WCAG 2.1 AA).
- **I18n**: Expose copy via props; support external translators; use stable namespaced keys (e.g., `dialog.ok`).
- **Formatting**: Date/number formatting must respect the active locale.

### IV. Strict Typing & Engineering Quality
Maintain compile-time safety and runtime robustness.
- **TypeScript**: Strict mode enabled; exhaustive types required; `any` is strictly prohibited.
- **Linting**: Use `eslint-antfu` and `lint-staged`.
- **Commits**: Follow Conventional Commits (feat, fix, docs, etc.).
- **Error Handling**: Use the defensive async pattern in handlers (try/catch/finally with loading states).

### V. Layered Architecture & No Cyclic Deps
Follow the strict layering model: Core (infra) → UI (components) → Utils (tools).
- Circular dependencies are forbidden.
- Use React Context per component granularity.
- Create new contexts via `@srcube-taro/utils-react`.

## Coding Standards

### Naming & Files
- **Folders**: kebab-case (e.g., `copy-button`).
- **Files**: `index.ts` (exports), `<component>.tsx` (UI), `use.ts` (logic).
- **Props**: Boolean prefixes (`is/has/should/can`), events (`on*`), handlers (`handle*`).

### Error Handling Pattern
Handlers must follow the defensive async pattern:
```ts
const handleAction = useCallback(async (event: unknown) => {
  if (isLoading || isDisabled) return
  setIsLoading(true)
  try { await onAction?.(event as any) }
  catch (error) { if (process.env.NODE_ENV === 'development') console.error('[Component] Action failed:', error) }
  finally { setIsLoading(false) }
}, [isLoading, isDisabled, onAction])
```

## Directory & File Conventions

### Package Structure (packages/ui/*)
- One package per component.
- **Standard Files**:
  - `src/index.ts`: Exports types and components.
  - `src/<component>.tsx`: Presentation layer (`forwardRef`).
  - `src/use.ts`: Logic hook.
  - `README.md`: Usage, Variants, Accessibility.
  - `CHANGELOG.md`: Version history.
- **Theme**: Variants live in `packages/core/theme/src/components/*`.

## Governance

This Constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan.

- **Compliance**: All PRs must verify compliance with these principles.
- **Documentation**: Each package must maintain up-to-date `README.md` with runnable snippets.
- **Versioning**: Follow Semantic Versioning.

**Version**: 1.1.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28
