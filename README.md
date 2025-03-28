# Srcube Taro UI

A React component library for Taro.js applications with TailwindCSS support.

## Features

- 🎨 Built with TailwindCSS and Tailwind Variants
- 📦 Monorepo architecture with pnpm workspaces
- 🔧 Powered by Moon build system
- 🎯 TypeScript support
- 📱 Cross-platform components for mini-programs

## Tech Stack

- Moon Build System

- Taro.js
- React 18
- TailwindCSS
- Tailwind Variants
- TypeScript

## Project Structure

```
srcube-taro/
├── apps/
│   └── sample/                 # Demo application
├── packages/
│   ├── core/
│   │   ├── ui/                 # Main UI package
│   │   └── plugins/            # TailwindCSS plugins
│   ├── ui/                     # UI components
│   │   ├── [component]/
│   └── utils/                  # Shared utilities
│       └── [util]/
└── envs/                       # Shared configurations
    └── [config]/
```

## Getting Started

### Prerequisites

- Moon >= 1.0.0

> We only need `moon` for the workspace. It means we don't need `pnpm` or `Node.js` environment locally.

### Development

Because the moon toolchain, just start the development!

```bash
# Sample weapp
moon sample:dev-weapp
# Docs
moon docs:dev
```

### Build

```bash
# Build all `build` commands in the workspace
moon :build
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

We welcome contributions from the community! Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for more information.

## License

[MIT](./LICENSE.md)