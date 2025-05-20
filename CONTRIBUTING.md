# SrcubeUI Taro Contributing Guide

What an exciting moment you are here! Thank you for your interest in contributing to SrcubeUI Taro. Here are a few guidelines
that will help you along the way.

## Summary

* [Code of Conduct](#code-of-conduct)
* [Tooling](#tooling)
* [Commit Convention](#commit-convention)
* [Pull Request](#pull-request)
* [Development Setup](#development-setup)
* [Visual Changes](#visual-changes)
* [Documentation](#documentation)
* [Breaking changes](#breaking-changes)

## Code of Conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](./CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## Tooling

- [Moonrepo](https://moonrepo.dev/) to manage monorepo workspace and environment
- [PNPM](https://pnpm.io/) to manage packages and dependencies
- [tsup](https://tsup.egoist.dev/) to bundle packages
- [Storybook](https://storybook.js.org/) for rapid UI component development and
  testing
- [Changesets](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

## Pull Request

- The `main` branch is basically a snapshot of the latest production version. All development must be done in dedicated branches and will be merged to `canary` branch.
- Make sure that Github Actions are green
- It is good to have multiple small commits while working on the PR. We'll let GitHub squash it automatically before the merge.
- If you add a new feature:
  - Add the test case that accompanies it.
  - Provide a compelling reason to add this feature. Ideally, I would first open a suggestion topic and green it before working on it.
- If you correct an error:
  - If you are solving a special problem, add (fix #xxxx [, # xxx]) (# xxxx is the problem identification) in your PR title for a better launch record, for example update entities encoding / decoding (fix # 3899).
  - Provide a detailed description of the error in the PR. Favorite live demo.
  - Add the appropriate test coverage, if applicable.

### Steps to PR

1. Fork of the SrcubeUI Taro repository and clone your fork

2. Create a new branch out of the `canary` branch. We follow the convention
   `[type/scope]`. For example `fix/dropdown-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](#commit-convention).
   As you canary, you can run `moon moon_id:build` and `moon moon_id:test` to make sure everything works as expected. e.g. `moon button:build` and `moon button:test`.
   (You can find the moon_id in the sub-package `moon.yml` file)

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.
5. Also, if you provide `jsx` snippets to the changeset, please turn off the
   live preview by doing the following at the beginning of the snippet:
   ` ```jsx live=false`

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

## Development Setup

Before starting development, make sure your environment has installed [moon](https://moonrepo.dev/).

Because moonrepo has set the toolchain in the project, so we do not need to install the dependencies manually, just start with `moon moon_id:command`.

1. Start development server of docs

```bash
moon docs:dev
```

2. If you will be working on the components source code, you can start the sample app for development mini app preview

```bash
moon sample:dev-weapp
```

3. Create a branch for your feature or fix:

```bash
# Move into a new branch for your feature
git checkout -b feat/thing
```

```bash
# Move into a new branch for your fix
git checkout -b fix/something
```

4. If your code passes all the tests, then push your feature/fix branch:

All commits that fix bugs or add features need a test.

```bash
moon moon_id:test
```

5. Be sure the package builds.

```bash
moon :build
```

> Note: Because moonrepo contains the toolchain, so you do not need the Node.js, PNPM or other environment tools. Just need install `moon`.

6. Send your pull request:

- Send your pull request to the `canary` branch
- Your pull request will be reviewed by the maintainers and the maintainers will decide if it is accepted or not
- Once the pull request is accepted, the maintainers will merge it to the `canary` branch

## Visual Changes

When making a visual change, please provide screenshots
and/or screencasts of the proposed change. This will help us to understand the
desired change easier.

Until SrcubeUI Taro has a stable release new components will be created only for the core team.

## Documentation

Please update the docs with any API changes, the code and docs should always be in sync.

The main documentation lives in the `apps/docs/content` folder, the project uses MDX and all `SrcubeUI Taro` are already imported.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. The deprecated APIs themselves should not be removed until the minor release after that.
