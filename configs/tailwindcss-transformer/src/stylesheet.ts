import cssnanoPlugin from "cssnano";
import postcss, { type Plugin } from "postcss";
import tailwindcss from "tailwindcss";
import { replaceVariableScope } from "./replace-variable-scope.js";
import type { StyleCache, StylesheetConfig } from "./types";

/**
 * Generates a CSS stylesheet from the style cache using Tailwind CSS
 *
 * @param styleCache - Map of hashed class names to original values
 * @param ctx - Configuration for stylesheet generation
 * @returns The generated CSS stylesheet
 *
 * @remarks
 * This function processes the style cache through Tailwind CSS and additional
 * PostCSS plugins to generate the final stylesheet.
 *
 * @public
 */
export async function generateStylesheet(styleCache: StyleCache, ctx: StylesheetConfig) {
	let stylesheet = "@tailwind base;\n";
	stylesheet += ctx?.globalCss || "";

	for (const [cn, value] of styleCache) {
		stylesheet += `.${cn} { @apply ${value} }\n`;
	}

	const result = await postcss([
		tailwindcss(ctx.tailwindConfig) as Plugin,
		replaceVariableScope,
		cssnanoPlugin,
	]).process(stylesheet, {
		from: undefined,
	});

	return result.css;
}
