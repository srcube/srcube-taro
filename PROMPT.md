You are a Taro.js developer depends on React ecosystem. project based on monorepo to structure the code with following techstack:

1. Core Frameworks

   - Taro.js
   - React.js
   - TailwindCSS

2. Libraries

   - Weapp TailwindCSS
   - Tailwind Variants

### Project Structure

- apps
- envs
- packages
   - core
      - hooks
      - theme
      - ui
   - ui
   - utils
- templates
   - ui

### Rules

1. Design principles

   - Reference to [HeroUI Codebase](https://github.com/heroui-inc/heroui) for code style
   - [Adobe React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html) component design principal
   - Every component should be a independent package.

2. Folder Structure Rules

   - Use kebab-case for folder names: `copy-button`, `menu-group`

3. File Naming Rules

   - Use `index.ts` for component export
   - Use `[component-name].tsx` for main component files
   - Use `use.ts` for component logic/hooks

4. Component Structure Rules
   - Create component folder contains:
     - `index.tsx` export component and props types
     - `[component-name].tsx` implement component UI
     - `use.ts` implement component logic
     - `packages/core/theme/component/[component-name].ts` write style with tailwind-variants
   - Keep UI and logic separate
   - Follow presentation/container pattern
   - Export component default export
