import fs from "fs/promises";
import path from "path";
import { Index } from "__registry__";
import React from "react";

interface ComponentInfo {
  component: React.ComponentType;
  files: { path: string }[];
}

export const getComponentCode = async (
  name: string,
  styleName: string
): Promise<{ code: string; preview: React.ReactNode }> => {
  const Component = (Index as Record<string, Record<string, ComponentInfo>>)[styleName]?.[name];

  if (!Component) {
    console.error(`Component ${name} not found in ${styleName} style.`);
    return { code: `// Component ${name} not found in ${styleName} style.`, preview: null };
  }

  const fetchFile = path.join(process.cwd(), Component.files[0].path);

  try {
    const code = await fs.readFile(fetchFile, "utf-8");
    console.log(`Found component: ${fetchFile}`);

    // Wrap the component in a client component
    const ClientComponent = React.memo(() => React.createElement(Component.component));
    ClientComponent.displayName = `ClientComponent(${name})`;

    return {
      code: code.replace(`@/registry/${styleName}/`, "@/components/"),
      preview: React.createElement(ClientComponent),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`File not found: ${fetchFile}`);
    } else {
      console.error(`Error reading file for ${name}:`, error);
    }
    return { code: `// Error loading component ${name}.`, preview: null };
  }
};