<div align='center'>
<h1>Srcube Taro UI</h1>

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/srcube/srcube-taro)

A React component library for Taro.js applications with TailwindCSS support.
</div>

## Features

- 🎨 Built with TailwindCSS and Tailwind Variants
- 📦 Monorepo architecture with pnpm workspaces
- 🔧 Powered by Moon build system
- 🎯 TypeScript support
- 📱 Cross-platform components for mini-program

## Project Structure

```
srcube-taro/
├── apps/
│   ├── docs/                   # Docs
│   └── sample/                 # Demo application
├── packages/
│   ├── core/
│   │   ├── ui/                 # Main UI package
│   │   └── theme/              # Components theme, UI plugin
│   ├── ui/                     # UI components
│   │   ├── [components]/
│   └── utils/                  # Shared utilities
│       └── [util]/
└── envs/                       # Shared configurations
    └── [config]/
```

### Component Structure

Each component follows a consistent structure:

```
packages/ui/[component]/
├── src/
|   ├── [component].tsx
|   ├── index.ts
|   └── use.ts
├── moon.yml
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

> The component style in the `packages/core/theme/components/[component].ts`.

## Preview

<img src="./meta/weapp-qr-code.jpg" alt="Srcube Taro UI" width="150" />

## Contribution

We welcome contributions from the community! Please refer to the
[CONTRIBUTING.md](./CONTRIBUTING.md) file for more information.

## License

[MIT](./LICENSE.md)
