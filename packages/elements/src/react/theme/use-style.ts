"use client";

/**
 * @packageDocumentation
 * Provides hooks and utilities for managing component styles with theme support.
 * Implements a flexible styling system that merges theme and component-level styles.
 */

import { useMemo } from "react";
import { useThemeContext } from "./context";
import type { AllThemeKeys } from "./types/style-keys";
import type { ClassNameStyle, ThemeValue } from "./types/style-types";
import { mergeStyles } from "./utils/merge-styles";

/**
 * Hook for retrieving and merging styles from theme context and component props.
 *
 * @remarks
 * This hook manages the style resolution process by:
 * - Retrieving styles from theme context
 * - Merging with component-level styles
 * - Handling style disabling through noStyle flags
 * - Memoizing results for performance
 *
 * @param themeKey - The theme key to lookup styles
 * @param componentStyle - Optional component-level styles to merge
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const styles = useStyles('cookie-banner.root', {
 *     className: 'custom-class',
 *     style: { backgroundColor: 'white' }
 *   });
 *
 *   return <div {...styles} />;
 * };
 * ```
 *
 * @returns An object containing merged className and style properties
 * @public
 */

export function useStyles(themeKey: AllThemeKeys, componentStyle?: ThemeValue): ClassNameStyle {
	const { noStyle: contextNoStyle, theme } = useThemeContext();
	// Merge noStyle from props and context
	const mergedNoStyle =
		typeof componentStyle === "object" && "noStyle" in componentStyle
			? componentStyle.noStyle
			: contextNoStyle;

	return useMemo(() => {
		// Get the style from context using the styleKey, if provided
		const themeStylesObject = themeKey
			? (theme as Record<AllThemeKeys, ThemeValue>)?.[themeKey]
			: null;
		// debugger
		// If noStyle is true, bypass base and context styles, using only component styles
		if (mergedNoStyle) {
			if (!themeStylesObject) return {}; // Return empty if no component style is provided

			// Return a new object to ensure immutability
			return typeof themeStylesObject === "string"
				? { className: themeStylesObject }
				: { className: themeStylesObject.className, style: themeStylesObject.style };
		}

		// Initialize mergedStyle with empty values if no component style, or component style is a string
		const initialStyle: ThemeValue = {
			className: typeof componentStyle === "string" ? componentStyle : componentStyle?.className,
			style: undefined,
		};

		// Merge context style if available, creating a new object
		const mergedWithContext = themeStylesObject
			? mergeStyles(initialStyle, themeStylesObject)
			: initialStyle;

		// Merge component style if provided, creating a new object
		const finalMergedStyle = componentStyle
			? mergeStyles(mergedWithContext, componentStyle)
			: mergedWithContext;

		// Return the final merged style, ensuring immutability
		return { ...finalMergedStyle };
	}, [componentStyle, themeKey, mergedNoStyle, theme]);
}
