export enum Status {
  building = 'Building',
  done = 'Done',
  updated = 'Updated',
  deprecated = 'Deprecated',
}

export type Routes = Array<{
  title: string
  routes: Array<{
    title: string
    href: string
    status?: keyof typeof Status
  }>
}>

export const routes: Routes = [
  {
    title: 'Getting Started',
    routes: [
      {
        title: 'Introduction',
        href: '/guides/introduction',
      },
      {
        title: 'Installation',
        href: '/guides/installation',
      },
    ],
  },
  {
    title: 'Components',
    routes: [
      {
        title: 'Button',
        href: '/components/button',
        status: 'building',
      },
    ],
  },
  {
    title: 'AI',
    routes: [],
  },
]
