import fs from "node:fs/promises";
import path from "node:path";
import { Index } from "@koroflow/shadcn/__registry__";
import React from "react";

/**
 * Represents information about a component, including its React component type and associated files.
 */
interface ComponentInfo {
	/**
	 * The React component type for rendering the component.
	 */
	component: React.ComponentType;

	/**
	 * An array of file objects associated with the component.
	 * Each file object contains the path to the file.
	 */
	files: { path: string }[];
}

/**
 * Asynchronously retrieves the code and a preview component for a given component name and style.
 *
 * @param name - The name of the component to retrieve.
 * @param styleName - The style category under which the component is registered.
 * @returns A promise that resolves to an object containing the component's code as a string and a React node for preview.
 *
 * @remarks
 * This function reads the component's source file from the filesystem and creates a memoized React component for preview.
 * If the component or its file is not found, appropriate error messages are logged and default error messages are returned.
 */
export const getComponentCode = async (
	name: string,
	styleName: string,
): Promise<{ code: string; preview: React.ReactNode }> => {
	const Component = (Index as Record<string, Record<string, ComponentInfo>>)[styleName]?.[name];

	if (!Component) {
		console.error(`Component ${name} not found in ${styleName} style.`);
		return {
			code: `// Component ${name} not found in ${styleName} style.`,
			preview: null,
		};
	}

	const fetchFile = path.join(process.cwd(), Component.files[0].path);
	console.log(fetchFile, Component.files[0].path);
	try {
		const code = await fs.readFile(fetchFile, "utf-8");
		console.log(code);
		const ClientComponent = React.memo(() => React.createElement(Component.component));
		ClientComponent.displayName = `ClientComponent(${name})`;

		return {
			code: code.replace(/\.\.\/components\//g, "@components/ui/"),
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
