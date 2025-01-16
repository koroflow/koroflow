import * as Base from 'fumadocs-ui/components/codeblock'
import { highlight } from 'fumadocs-core/server'

export interface CodeBlockProps {
  code: string
  wrapper?: Base.CodeBlockProps
  lang: string
}

export async function CodeBlock({ code, wrapper }: CodeBlockProps) {
  const rendered = await highlight(code, {
    lang: "tsx",
    components: {
      pre: Base.Pre,
    },
  })

  return <Base.CodeBlock {...wrapper}>{rendered}</Base.CodeBlock>
}

