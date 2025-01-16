"use client"

import React from 'react'
import { ClipboardCopy } from 'lucide-react'
import { CodeBlock } from './component-preview.codeblock'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ComponentSourceClientProps {
  code: string
}

export function ComponentSourceClient({ code }: ComponentSourceClientProps) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
    }).catch((err) => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <div className={cn("relative my-4 overflow-hidden rounded-md")}>
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          aria-label="Copy code to clipboard"
        >
          <ClipboardCopy className="h-4 w-4" />
        </Button>
      </div>
      <CodeBlock code={code} lang="tsx" />
    </div>
  )
}

