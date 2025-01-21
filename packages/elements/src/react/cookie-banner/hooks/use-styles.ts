"use client";
import { type CSSProperties, useMemo } from "react";
import { cnExt } from "../../common/libs/cn";
import { useCookieBannerContext } from "../context";
import type { ClassName, ClassNameStyle, StyleKey, StyleValue } from "../types";

// Define the UseStylesProps type
type UseStylesProps = {
	baseClassName?: string;
	componentStyle?: ClassNameStyle | string;
	styleKey?: StyleKey;
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
export function useStyles({
	baseClassName,
	componentStyle,
	styleKey,
}: UseStylesProps) {
	const { noStyle, styles } = useCookieBannerContext();

	return useMemo(() => {
		const contextStyle = styleKey ? styles[styleKey] : null;

		// When noStyle is true, only apply component styles
		if (noStyle) {
			if (!componentStyle) return {};

			return typeof componentStyle === "string"
				? { className: componentStyle }
				: { className: componentStyle.className, style: componentStyle.style };
		}

		let className = noStyle ? undefined : baseClassName;
		let style: CSSProperties | undefined;

		if (contextStyle) {
			const mergedStyle = mergeStyles({ className, style }, contextStyle);
			className = mergedStyle.className || undefined;
			style = mergedStyle.style;
		}

		if (componentStyle) {
			const mergedStyle = mergeStyles({ className, style }, componentStyle);
			className = mergedStyle.className || undefined;
			style = mergedStyle.style;
		}

		// Use cnExt to merge class names
		className = cnExt(
			className,
			typeof componentStyle === "object" ? componentStyle.className : undefined,
			typeof contextStyle === "object" ? contextStyle?.className : undefined,
		);

		return {
			className: className || undefined,
			style: style || undefined,
		};
	}, [baseClassName, componentStyle, noStyle, styleKey, styles]);
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
 * @param style1 - First style to merge
 * @param style2 - Second style to merge (takes precedence)
 * @returns Merged style result
 *
 * @internal
 */
function mergeStyles(style1: StyleValue, style2: StyleValue) {
	const className = cnExt(
		typeof style1 === "string" ? style1 : style1?.className,
		typeof style2 === "string" ? style2 : style2?.className,
	);

	const style = {
		...(typeof style1 === "object" && style1?.style),
		...(typeof style2 === "object" && style2?.style),
	};

	return {
		className: className || undefined,
		style: Object.keys(style).length > 0 ? style : undefined,
	};
}
