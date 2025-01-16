"use server";

import React from "react";
import { ComponentPreviewClient } from "./component-preview-client";
import { CodeBlock } from "./component-preview.codeblock";
import { getComponentCode } from "./get-component-code";

const styles = [
  { name: "default", label: "Default" },
  { name: "dark", label: "Dark" },
];

interface ComponentPreviewProps {
  name: string;
  styleName?: string;
  defaultTab?: "Preview" | "Code";
}

export async function ComponentPreviewServer({
  name,
  styleName = "default",
  defaultTab = "Preview",
}: ComponentPreviewProps) {
  try {
    const { code, preview } = await getComponentCode(name, styleName);

    if (!code?.trim()) {
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
  } catch (error) {
    console.error(`Error fetching component ${name}:`, error);
    return (
      <p className="text-sm text-muted-foreground">
        Error loading component {name}. Please try again later.
      </p>
    );
  }
}

