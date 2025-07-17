'use client'

import type { Toc } from '@stefanprobst/rehype-extract-toc'
import cn from 'classnames'
import { useScrollSpy } from '@/hooks/use-scroll-spy'

interface TableOfContentsProps {
  headings?: Toc
}

const paddingLeftByLevel: Record<number, string> = {
  1: 'ml-0',
  2: 'ml-4',
  3: 'ml-8',
  4: 'ml-12',
}

function TableOfContents(props: TableOfContentsProps) {
  const { headings } = props

  const { activeId, updateActiveId } = useScrollSpy(
    headings?.map(({ id }) => `[id="${id}"]`) ?? [],
    { rootMargin: '0% 0% -80% 0%' },
  )

  return (
    <div>
      <nav className="text-sm">
        <p className="font-medium mb-4 text-gray-900 dark:text-gray-100">On this page</p>
        <ul className="">
          {headings?.map(item => (
            <li
              key={item.id}
              className={cn(paddingLeftByLevel[item.depth], 'my-1')}
              onClick={() => updateActiveId(item.id)}
            >
              <a
                href={`#${item.id}`}
                className={cn('hover:opacity-80 text-xs leading-1 transition-colors', activeId === item.id ? 'opacity-100' : 'opacity-40')}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

TableOfContents.displayName = 'TableOfContents'

export default TableOfContents
