"use server";

import React from "react";
import { ComponentPreviewClient } from "./component-preview-client";
import { CodeBlock } from "./component-preview.codeblock";
import { getComponentCode } from "./get-component-code";

const styles = [
  { name: "default", label: "Default" },
  { name: "dark", label: "Dark" },
];

/**
 * Props for the ComponentPreviewServer component.
 */
interface ComponentPreviewProps {
  /**
   * The name of the component to fetch and display.
   */
  name: string;

  /**
   * The style name to use when fetching the component code.
   * Defaults to the first style in the styles array.
   */
  styleName?: string;

  /**
   * The default tab to display, either "Preview" or "Code".
   */
  defaultTab?: "Preview" | "Code";
}

/**
 * A server-side component that fetches and displays both the preview and source code of a specified component.
 *
 * @param props - The props for the ComponentPreviewServer component.
 * @returns A JSX element that displays the component's preview and source code in a tabbed interface.
 *
 * @remarks
 * This component is used to showcase both the visual preview and the source code of components on documentation pages.
 * It fetches the component code and renders it alongside a live preview, allowing users to view and copy the code.
 */
export async function ComponentPreviewServer({
  name,
  styleName = styles[0].name,
  defaultTab = "Preview",
}: ComponentPreviewProps) {
  const { code, preview } = await getComponentCode(name, styleName);

  if (!code.trim()) {
    return (
      <p className="text-sm text-muted-foreground">
        Component {name} not found in {styleName} style.
      </p>
    );
  }

  const highlightedCode = await CodeBlock({ code, lang: "tsx" });

  return (
    <ComponentPreviewClient
      name={name}
      code={code}
      preview={preview}
      styleName={styleName}
      highlightedCode={highlightedCode}
      defaultTab={defaultTab}
    />
  );
}

