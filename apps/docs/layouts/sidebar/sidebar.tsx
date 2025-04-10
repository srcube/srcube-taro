'use client'

import { routes, Status } from '@/conf/sidebar'
import cn from 'classnames'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getSidebarData() {
  const data = routes.map((route) => {
    return {
      key: nanoid(),
      title: route.title,
      routes: route.routes.map(r => ({ ...r, key: nanoid() })),
    }
  })

  return data
}

function Sidebar() {
  const sidebarData = getSidebarData()

  const pathname = usePathname()

  return (
    <nav className="fixed flex flex-col gap-4">
      {sidebarData.map(g => (
        <div key={g.key}>
          <div className="flex items-center gap-1 mb-2">
            <span className="font-medium">{g.title}</span>
          </div>
          <ul className="flex flex-col gap-2 pl-4">
            {g.routes.map(r => (
              <li
                key={r.key}
                className="flex items-center before:content-[''] before:size-1 before:rounded-full before:bg-gray-500/20 before:mr-2.5"
              >
                <Link
                  href={`/docs${r.href}`}
                  className={cn(
                    'flex items-center gap-4 w-full font-light',
                  )}
                >
                  <span
                    className={cn(
                      'text-sm',
                      pathname === `/docs${r.href}` ? 'opacity-100' : 'opacity-50 hover:opacity-75',
                    )}
                  >
                    {r.title}
                  </span>
                  {r.status && (
                    <span className="text-xs text-blue-500 rounded-full bg-blue-500/15 px-2 py-1">
                      {Status[r.status]}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default Sidebar
