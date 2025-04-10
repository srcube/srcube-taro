'use client'

import type { JSX, PropsWithChildren } from 'react'
import type { BundledLanguage } from 'shiki/bundle/web'
import * as HeroUI from '@heroui/react'
import cn from 'classnames'
import { useLayoutEffect, useState } from 'react'
import { highlights } from './shared'

export type InlineCodeProps = PropsWithChildren<{
  className?: string
}>

function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <HeroUI.Code
      className={cn('p-0 relative before:content-["`"] after:content-["`"] font-semibold font-mono text-small rounded-md text-default-900 dark:text-default-500 bg-transparent', className)}
    >
      {children}
    </HeroUI.Code>
  )
}

InlineCode.displayName = 'InlineCode'

export type InlineCodeChipProps = PropsWithChildren<{
  className?: string
}>

function InlineCodeChip({ children, className }: InlineCodeChipProps) {
  return (
    <InlineCode
      className={cn(
        'before:hidden after:hidden text-tiny rounded-md text-default-600 bg-default-100 dark:bg-default-100/80 px-1.5 py-0.5',
        className,
      )}
    >
      {children}
    </InlineCode>
  )
}

InlineCodeChip.displayName = 'InlineCodeChip'

export type CodeBlockProps = PropsWithChildren<{
  lang: BundledLanguage
  children: string
  initial?: JSX.Element
  className?: string
}>

function CodeBlock(props: CodeBlockProps) {
  const { initial, children, lang, className = 'inline-block' } = props

  const [nodes, setNodes] = useState(initial)

  useLayoutEffect(() => {
    void highlights.codeblock(children, lang).then(setNodes)
  }, [lang, children])

  if (!nodes) {
    return (
      <HeroUI.Skeleton className="inline-flex rounded">
        <div className="w-64 rounded-lg">...</div>
      </HeroUI.Skeleton>
    )
  }

  return <div className={className}>{nodes}</div>
}

CodeBlock.displayName = 'CodeBlock'

function Code(props: React.HTMLAttributes<HTMLElement>) {
  const { children, className } = props

  if (!className) {
    return (
      <InlineCode>
        {children}
      </InlineCode>
    )
  }

  const lang = (className?.replace('language-', '') ?? 'bash') as BundledLanguage
  const isMultiLine = (children as string)?.split?.('\n')?.length > 2

  return (
    <HeroUI.Snippet
      fullWidth
      hideSymbol
      disableTooltip
      className={cn('not-prose', className)}
      classNames={{
        base: cn('dark not-prose bg-code-block', isMultiLine && 'items-start'),
        pre: 'px-2 font-light',
        copyButton: 'text-lg text-default-400',
      }}
    >
      <CodeBlock lang={lang}>
        {children as string}
      </CodeBlock>
    </HeroUI.Snippet>
  )
}

export { Code, CodeBlock, InlineCode, InlineCodeChip }
