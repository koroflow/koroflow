"use server"

import React from 'react'
import { CodeBlock } from './component-preview.codeblock'
import { getComponentCode } from './get-component-code'

const styles = [
  { name: 'default', label: 'Default' },
  { name: 'dark', label: 'Dark' },
]

/**
 * Props for the ComponentSourceServer component.
 */
interface ComponentSourceProps {
  /**
   * The name of the component to fetch and display.
   */
  name: string;

  /**
   * The style name to use when fetching the component code.
   * Defaults to the first style in the styles array.
   */
  styleName?: string;
}

/**
 * A server-side component that fetches and displays the source code of a specified component.
 *
 * @param props - The props for the ComponentSourceServer component.
 * @returns A JSX element that displays the component's source code in a code block.
 *
 * @remarks
 * This component is used to showcase the source code of components on documentation pages,
 * allowing users to view and copy the code.
 */
export async function ComponentSourceServer({ name, styleName = styles[0].name }: ComponentSourceProps) {
  const { code } = await getComponentCode(name, styleName)
  
  if (!code.trim()) {
    return <p>Component {name} not found in {styleName} style.</p>
  }
  
  return <CodeBlock code={code} lang="tsx" />
}

