import React from 'react'
import path from 'path'
import fs from 'fs/promises'
import { ComponentSourceClient } from './component-source-client'

const styles = [
  { name: 'default', label: 'Default' },
  { name: 'dark', label: 'Dark' },
]

interface ComponentSourceProps {
  name: string
  styleName?: string
}

const getComponentCode = React.cache(async (name: string, styleName: string): Promise<string> => {
  const registryPath = path.join(process.cwd(), 'registry', styleName, 'examples', `${name}.tsx`)
  try {
    const code = await fs.readFile(registryPath, 'utf-8')
    return code.replace(`@/registry/${styleName}/`, '@/components/')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`File not found: ${registryPath}`)
      return `// Component ${name} not found in ${styleName} style.`
    }
    console.error(`Error reading file for ${name}:`, error)
    return `// Error loading component ${name}.`
  }
})

export async function ComponentSourceServer({ name, styleName = styles[0].name }: ComponentSourceProps) {
  const code = await getComponentCode(name, styleName)
  
  if (!code.trim()) {
    return <p>Component {name} not found in {styleName} style.</p>
  }
  
  return <ComponentSourceClient code={code} />
}

