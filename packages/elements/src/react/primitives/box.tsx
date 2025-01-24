"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import type { ClassNameStyle } from "../theme/types";
import { type NestedStyleKey, useStyles } from "../theme/useStyle";

/**
 * Props for the description text component of the CookieBanner.
 * Extends standard HTML div attributes.
 *
 * @public
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement>, ClassNameStyle {
	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;

	styleKey: NestedStyleKey;
}

/**
 * Renders the descriptive text content within a CookieBanner.
 *
 * @remarks
 * This component is responsible for displaying the explanatory text that:
 * - Informs users about the site's cookie usage
 * - Explains what cookies are used for
 * - Provides context for the cookie consent choices
 *
 * The component automatically inherits styles from the CookieBanner context
 * and can be customized through className and style props.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CookieBanner.Description>
 *   We use cookies to enhance your browsing experience and analyze site traffic.
 * </CookieBanner.Description>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <CookieBanner.Description
 *   className="text-gray-600"
 *   style={{ maxWidth: '500px' }}
 * >
 *   By using our site, you acknowledge that you have read and understand our
 *   Cookie Policy and Privacy Policy.
 * </CookieBanner.Description>
 * ```
 *
 * @public
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
	({ asChild, className, style, styleType, styleKey, baseClassName, ...props }, ref) => {
		/**
		 * Apply styles from the CookieBanner context and merge with local styles.
		 * Uses the 'description' style key for consistent theming.
		 */
		const descriptionStyle = useStyles(styleKey, {
			baseClassName,
			className,
			styleType,
			style,
		});

		const Comp = asChild ? Slot : "div";
		return <Comp ref={ref} {...props} {...descriptionStyle} />;
	},
);

Box.displayName = "Box";
