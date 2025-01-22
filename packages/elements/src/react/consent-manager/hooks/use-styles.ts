"use client";
import { useMemo } from "react";
import { cnExt } from "../../common/libs/cn";
import { useCookieBannerContext } from "../context";
import type { ClassNameStyle, StyleKey, StyleValue } from "../types";

// Define the UseStylesProps type
type UseStylesProps = {
	baseClassName?: string;
	componentStyle?: ClassNameStyle | string;
	styleKey?: StyleKey;
	noStyle?: boolean;
};

/**
 * Custom hook for managing styles within the CookieBanner component system.
 *
 * @remarks
 * This hook handles the complex logic of merging styles from multiple sources:
 * - Base styles from the component
 * - Context styles from the CookieBanner theme
 * - Component-specific styles passed as props
 *
 * The hook also respects the noStyle flag from context, which allows for
 * complete style customization when needed.
 *
 * @example
 * Basic usage with a style key:
 * ```tsx
 * const { className, style } = useStyles({
 *   styleKey: "title"
 * });
 * ```
 *
 * @example
 * With base class name and component styles:
 * ```tsx
 * const { className, style } = useStyles({
 *   baseClassName: "cookie-banner-button",
 *   componentStyle: {
 *     className: "rounded-md px-4 py-2",
 *     style: { backgroundColor: "#0070f3" }
 *   }
 * });
 * ```
 *
 * @example
 * Using string-based class names:
 * ```tsx
 * const { className } = useStyles({
 *   baseClassName: "base-styles",
 *   componentStyle: "custom-styles",
 *   styleKey: "actions"
 * });
 * ```
 *
 * @returns An object containing the merged className and style properties
 * @public
 */
export function useStyles({ baseClassName, componentStyle, styleKey, noStyle }: UseStylesProps) {
	// Retrieve style-related context values
	const { noStyle: contextNoStyle, styles } = useCookieBannerContext();

	// Merge noStyle from props and context
	const mergedNoStyle = noStyle !== undefined ? noStyle : contextNoStyle;

	return useMemo(() => {
		// Get the style from context using the styleKey, if provided
		const contextStyle = styleKey ? styles[styleKey] : null;

		// If noStyle is true, bypass base and context styles, using only component styles
		if (mergedNoStyle) {
			if (!componentStyle) return {}; // Return empty if no component style is provided

			// Return a new object to ensure immutability
			return typeof componentStyle === "string"
				? { className: componentStyle }
				: { className: componentStyle.className, style: componentStyle.style };
		}

		// Initialize mergedStyle with baseClassName if noStyle is false
		const initialStyle: StyleValue = {
			className: baseClassName,
			style: undefined,
		};

		// Merge context style if available, creating a new object
		const mergedWithContext = contextStyle ? mergeStyles(initialStyle, contextStyle) : initialStyle;

		// Merge component style if provided, creating a new object
		const finalMergedStyle = componentStyle
			? mergeStyles(mergedWithContext, componentStyle)
			: mergedWithContext;

		// Return the final merged style, ensuring immutability
		return { ...finalMergedStyle };
	}, [baseClassName, componentStyle, mergedNoStyle, styleKey, styles]);
}

/**
 * Merges two style values into a single style result.
 *
 * @remarks
 * This utility function handles the merging of different style formats:
 * - String class names are concatenated with spaces
 * - Style objects are merged with Object.assign semantics
 * - Mixed formats (string + object) are properly combined
 *
 * The merge follows these rules:
 * 1. Later styles override earlier ones
 * 2. Class names are concatenated with proper spacing
 * 3. Style objects are deeply merged
 *
 * @example
 * ```tsx
 * // Merging two string classes
 * mergeStyles("btn", "btn-primary")
 * // Result: { className: "btn btn-primary" }
 *
 * // Merging style objects
 * mergeStyles(
 *   { className: "btn", style: { color: "blue" } },
 *   { className: "large", style: { fontSize: "20px" } }
 * )
 * // Result: {
 * //   className: "btn large",
 * //   style: { color: "blue", fontSize: "20px" }
 * // }
 * ```
 *
 * @param existingStyle - First style to merge
 * @param style2 - Second style to merge (takes precedence)
 * @returns Merged style result
 *
 * @internal
 */
function mergeStyles(existingStyle: StyleValue, newStyle: StyleValue) {
	// Use cnExt to concatenate class names immutably
	const className = cnExt(
		typeof existingStyle === "string" ? existingStyle : existingStyle?.className,
		typeof newStyle === "string" ? newStyle : newStyle?.className,
	);

	// Create a new style object by merging existing and new styles immutably
	const style = {
		...(typeof existingStyle === "object" && existingStyle?.style),
		...(typeof newStyle === "object" && newStyle?.style),
	};

	// Return a new object to ensure immutability
	return {
		className: className || undefined,
		style: Object.keys(style).length > 0 ? style : undefined,
	};
}
