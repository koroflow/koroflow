"use server"

import React from 'react'
import { CodeBlock } from './component-preview.codeblock'
import { getComponentCode } from './get-component-code'

const styles = [
  { name: 'default', label: 'Default' },
  { name: 'dark', label: 'Dark' },
]

interface ComponentSourceProps {
  name: string
  styleName?: string
}

export async function ComponentSourceServer({ name, styleName = styles[0].name }: ComponentSourceProps) {
  const {code} = await getComponentCode(name, styleName)
  
  if (!code.trim()) {
    return <p>Component {name} not found in {styleName} style.</p>
  }
  
  return <CodeBlock code={code} lang="tsx" />
}

