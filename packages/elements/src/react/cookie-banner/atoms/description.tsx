"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { useStyles } from "../hooks/use-styles";

/**
 * Props for the description text component of the CookieBanner.
 * Extends standard HTML div attributes.
 *
 * @public
 */
interface CookieBannerDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	// All props are inherited from HTMLAttributes<HTMLDivElement>
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
 *   className="text-gray-600 text-sm"
 *   style={{ maxWidth: '500px' }}
 * >
 *   By using our site, you acknowledge that you have read and understand our
 *   Cookie Policy and Privacy Policy.
 * </CookieBanner.Description>
 * ```
 *
 * @public
 */
export const CookieBannerDescription = forwardRef<
	HTMLDivElement,
	CookieBannerDescriptionProps
>(({ className, style, ...props }, ref) => {
	/**
	 * Apply styles from the CookieBanner context and merge with local styles.
	 * Uses the 'description' style key for consistent theming.
	 */
	const descriptionStyle = useStyles({
		baseClassName: "text-muted-foreground text-sm sm:text-base",
		componentStyle: className,
		styleKey: "description",
	});

	return (
		<div
			ref={ref}
			{...descriptionStyle}
			style={{ ...style, ...descriptionStyle.style }}
			{...props}
		/>
	);
});

CookieBannerDescription.displayName = "CookieBannerDescription";
