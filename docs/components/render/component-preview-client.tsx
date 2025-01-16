"use client"

import * as React from "react"
import { Index } from "__registry__"
import { RotateCcw } from 'lucide-react'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ComponentWrapper from "@/components/component-wrapper"
import { Icons } from "@/components/icons"

interface ComponentPreviewClientProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  code: string
  styleName: string
  align?: "center" | "start" | "end"
  highlightedCode: React.ReactNode
  defaultTab?: "Preview" | "Code"
}

export function ComponentPreviewClient({
  name,
  code,
  styleName,
  className,
  align = "center",
  highlightedCode,
  defaultTab = "Preview",
  ...props
}: ComponentPreviewClientProps) {
  const [key, setKey] = React.useState(0)

  const Preview = React.useMemo(() => {
    const Component = Index[styleName][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, styleName])
  
  console.log(defaultTab)
  const defaultIndex = defaultTab === "Preview" ? 0 : 1

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className
      )}
      {...props}
    >
      <Tabs items={["Preview", "Code"]} defaultIndex={defaultIndex}>
        <Tab value="Preview" className="p-0 rounded-none">
          <div className="relative" key={key}>
            <ComponentWrapper>
              <Button
                onClick={() => setKey((prev) => prev + 1)}
                className="absolute right-1.5 top-1.5 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
                variant="ghost"
              >
                <RotateCcw aria-label="restart-btn" size={16} />
              </Button>
              <React.Suspense
                fallback={
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </ComponentWrapper>
          </div>
        </Tab>
        <Tab value="Code">
          {highlightedCode}
        </Tab>
      </Tabs>
    </div>
  )
}

