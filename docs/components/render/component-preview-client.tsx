"use client";

import React, { useState, useMemo, useEffect } from "react";
import { RotateCcw } from 'lucide-react';
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ComponentWrapper from "@/components/render/component-wrapper";
import { Icons } from "@/components/icons";

/**
 * Props for the ComponentPreviewClient component.
 */
interface ComponentPreviewClientProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The name of the component being previewed.
   */
  name: string;

  /**
   * The source code of the component.
   */
  code: string;

  /**
   * The style name used for the component.
   */
  styleName: string;

  /**
   * The React node to render as the component preview.
   */
  preview: React.ReactNode;

  /**
   * The alignment of the component preview.
   */
  align?: "center" | "start" | "end";

  /**
   * The highlighted source code to display.
   */
  highlightedCode: React.ReactNode;

  /**
   * The default tab to display, either "Preview" or "Code".
   */
  defaultTab?: "Preview" | "Code";
}

/**
 * A client-side component that displays both the preview and source code of a specified component.
 *
 * @param props - The props for the ComponentPreviewClient component.
 * @returns A JSX element that displays the component's preview and source code in a tabbed interface.
 *
 * @remarks
 * This component is used to showcase both the visual preview and the source code of components on documentation pages.
 * It provides a tabbed interface for users to switch between viewing the live preview and the source code.
 */
export function ComponentPreviewClient({
  name,
  code,
  styleName,
  className,
  align = "center",
  highlightedCode,
  defaultTab = "Preview",
  preview,
  ...props
}: ComponentPreviewClientProps) {
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const Preview = useMemo(() => {
    if (!preview) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in {styleName} style registry.
        </p>
      );
    }

    return preview;
  }, [name, styleName, preview]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const defaultIndex = defaultTab === "Preview" ? 0 : 1;

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
                {isLoading ? (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  Preview
                )}
              </React.Suspense>
            </ComponentWrapper>
          </div>
        </Tab>
        <Tab value="Code">{highlightedCode}</Tab>
      </Tabs>
    </div>
  );
}

