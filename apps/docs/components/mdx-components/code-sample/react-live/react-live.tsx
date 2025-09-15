'use client'

import { Button } from '@srcube-taro/ui'
import * as React from 'react'
import { LivePreview, LiveProvider } from 'react-live'

export const scope = {
  React,
  Button
}

interface ReactLiveProps {
  code?: string
  noInline?: boolean
}

export function ReactLive({ code, noInline }: ReactLiveProps) {
  return (
    <LiveProvider code={code} scope={scope} noInline={noInline}>
      <LivePreview />
    </LiveProvider>
  )
}

ReactLive.displayName = 'ReactLive'
