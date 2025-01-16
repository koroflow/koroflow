import { promises as fs } from 'fs'
import path from 'path'

export async function getComponentCode(name: string, styleName: string = "default"): Promise<string> {
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
}

