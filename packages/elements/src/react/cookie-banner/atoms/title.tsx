"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { useStyles } from "../hooks/use-styles";

/**
 * Props for the title component of the CookieBanner.
 * Extends standard HTML div attributes.
 *
 * @public
 */
interface CookieBannerTitleProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * When true, the component will not apply any styles.
	 */
	noStyle?: boolean;
}

/**
 * Renders the main heading of the CookieBanner.
 *
 * @remarks
 * This component is responsible for displaying the primary heading text that:
 * - Introduces the cookie consent notice to users
 * - Provides immediate context about privacy settings
 * - Maintains consistent styling with the banner theme
 *
 * The component automatically inherits styles from the CookieBanner context
 * and can be customized through className and style props.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CookieBanner.Title>
 *   Cookie Settings
 * </CookieBanner.Title>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <CookieBanner.Title
 *   className="text-2xl font-bold text-gray-900"
 *   style={{ fontFamily: 'system-ui' }}
 * >
 *   We Value Your Privacy
 * </CookieBanner.Title>
 * ```
 *
 * @example
 * With semantic HTML override:
 * ```tsx
 * <CookieBanner.Title as="h1">
 *   Privacy Preferences
 * </CookieBanner.Title>
 * ```
 *
 * @public
 */
export const CookieBannerTitle = forwardRef<HTMLDivElement, CookieBannerTitleProps>(
	({ className, style, noStyle, ...props }, ref) => {
		/**
		 * Apply styles from the CookieBanner context and merge with local styles.
		 * Uses the 'title' style key for consistent theming.
		 */
		const titleStyle = useStyles({
			baseClassName: "text-label-md text-text-strong-950",
			componentStyle: className,
			styleKey: "title",
			noStyle,
		});

		return <div ref={ref} {...titleStyle} style={{ ...style, ...titleStyle.style }} {...props} />;
	},
);

CookieBannerTitle.displayName = "CookieBannerTitle";
