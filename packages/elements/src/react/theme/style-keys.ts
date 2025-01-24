/**
 * @packageDocumentation
 * Provides utilities for type-safe theme key management and value access.
 * Implements nested key type generation and value retrieval for theming system.
 */

import type { ConsentManagerWidgetTheme } from "../consent-manager/theme";
import type { CookieBannerTheme } from "../cookie-banner";

/**
 * Utility type that generates dot-notation string keys for nested objects.
 * 
 * @remarks
 * Creates union type of all possible nested paths in an object type using dot notation.
 * Useful for type-safe theme key access in deeply nested theme objects.
 * 
 * @typeParam T - The object type to generate nested keys for
 * 
 * @example
 * ```typescript
 * type Theme = {
 *   colors: {
 *     primary: string;
 *     secondary: string;
 *   };
 * };
 * 
 * type Keys = NestedKeys<Theme>; // "colors.primary" | "colors.secondary"
 * ```
 * 
 * @public
 */
export type NestedKeys<T> = {
	[P in keyof T]: T[P] extends object ? `${string & P}.${NestedKeys<T[P]>}` : string & P;
}[keyof T];

/**
 * Union type of all valid style keys for the theming system.
 * 
 * @remarks
 * Combines consent manager and cookie banner theme keys into a single type.
 * Ensures type safety when accessing theme values across different components.
 * 
 * @example
 * ```typescript
 * const key: StyleKeys = "cookieBanner.root";
 * const key2: StyleKeys = "consentManager.footer.accept-button";
 * ```
 * 
 * @public
 */
export type StyleKeys =
	| `consentManager.${keyof ConsentManagerWidgetTheme}`
	| `cookieBanner.${keyof CookieBannerTheme}`;

/**
 * Safely retrieves a nested value from an object using a dot-notation key.
 * 
 * @remarks
 * Provides type-safe access to nested theme values.
 * Handles undefined values gracefully through optional chaining.
 * 
 * @typeParam K - The specific StyleKeys type to retrieve
 * @param obj - The source object to retrieve the value from
 * @param key - The dot-notation path to the desired value
 * 
 * @example
 * ```typescript
 * const theme = {
 *   cookieBanner: {
 *     root: { backgroundColor: 'white' }
 *   }
 * };
 * 
 * const value = getNestedValue(theme, 'cookieBanner.root');
 * ```
 * 
 * @returns The value at the specified path or undefined if not found
 * @public
 */
export const getNestedValue = <K extends StyleKeys>(
	obj: Record<string, unknown>,
	key: K,
): unknown => {
	const [root, ...path] = key.split(".");
	return path.reduce((acc, part) => acc?.[part as keyof typeof acc], obj[root as keyof typeof obj]);
};
