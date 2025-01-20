import { cn } from "../../libs/utils";
import type { StyleResult, StyleValue } from "../types";

/**
 * Configuration options for the style application utility.
 *
 * @remarks
 * These options control how different styles are combined and applied to components.
 * The utility supports both class name strings and style objects, allowing for
 * flexible styling approaches.
 *
 * @public
 */
interface ApplyStyleOptions {
	/**
	 * @remarks
	 * Primary class name that serves as the foundation for styling.
	 * This is typically a component-specific identifier.
	 */
	baseClassName?: string | undefined;

	/**
	 * @remarks
	 * Additional styles to apply on top of the base class name.
	 * Can be either a string of class names or an object containing
	 * both className and style properties.
	 */
	styleValue?: StyleValue;

	/**
	 * @remarks
	 * Fallback class name used when no other styles are provided.
	 * Ensures a minimum styling baseline is maintained.
	 */
	defaultClassName?: string;
}

/**
 * Combines multiple style sources into a single, unified style result.
 *
 * @remarks
 * This utility function handles the complexity of merging different types of styles:
 * - String-based class names
 * - Object-based styles with className and style properties
 * - Default styles as a fallback
 *
 * The styles are merged following this precedence (highest to lowest):
 * 1. styleValue (if provided)
 * 2. baseClassName
 * 3. defaultClassName
 *
 * @example
 * Basic usage with class names:
 * ```tsx
 * const result = applyStyle({
 *   baseClassName: "btn",
 *   styleValue: "btn-primary",
 *   defaultClassName: "text-white"
 * });
 * // => { className: "btn text-white btn-primary" }
 * ```
 *
 * @example
 * Using object-based styles:
 * ```tsx
 * const result = applyStyle({
 *   baseClassName: "card",
 *   styleValue: {
 *     className: "shadow-lg",
 *     style: {
 *       backgroundColor: "#fff",
 *       borderRadius: "8px"
 *     }
 *   },
 *   defaultClassName: "p-4"
 * });
 * // => {
 * //   className: "card p-4 shadow-lg",
 * //   style: {
 * //     backgroundColor: "#fff",
 * //     borderRadius: "8px"
 * //   }
 * // }
 * ```
 *
 * @example
 * Fallback to default styles:
 * ```tsx
 * const result = applyStyle({
 *   baseClassName: "input",
 *   defaultClassName: "border rounded"
 * });
 * // => { className: "input border rounded" }
 * ```
 *
 * @param options - Configuration options for style application
 * @returns A StyleResult object containing the merged className and optional style object
 * @public
 */
export const applyStyle = (options: ApplyStyleOptions): StyleResult => {
	const { baseClassName, styleValue, defaultClassName = "" } = options;

	if (typeof styleValue === "string") {
		return { className: cn(baseClassName, defaultClassName, styleValue) };
	}

	if (styleValue && typeof styleValue === "object") {
		return {
			className: cn(baseClassName, defaultClassName, styleValue.className),
			style: styleValue.style,
		};
	}
	return { className: cn(baseClassName, defaultClassName) };
};
