import type { Config } from "tailwindcss";

/**
 * Represents a cache mapping of hashed class names to their original values
 * @public
 */
export type StyleCache = Map<string, string>;

/**
 * Configuration options for generating stylesheets
 * @public
 */
export interface StylesheetConfig {
	/** The Tailwind configuration object */
	tailwindConfig: Config;
	/** Optional global CSS to include */
	globalCss?: string;
}
