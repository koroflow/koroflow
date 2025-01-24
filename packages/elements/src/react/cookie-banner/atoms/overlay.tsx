/**
 * @packageDocumentation
 * Provides the overlay backdrop component for the CookieBanner.
 */

import { AnimatePresence, motion } from "motion/react";
import { type FC, type HTMLAttributes, forwardRef } from "react";

import { useConsentManager } from "../../headless";
import { useStyles, useThemeContext } from "../../theme";

/**
 * Props for the Overlay component.
 *
 * @remarks
 * The overlay provides a semi-transparent backdrop behind the cookie banner content.
 * It can be styled using the CookieBanner theme system or through direct style props.
 *
 * @public
 */
interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * When true, the component will not apply any styles.
	 */
	noStyle?: boolean;
	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;
}

/**
 * Overlay component that provides a backdrop for the CookieBanner content.
 *
 * @remarks
 * This component handles:
 * - Rendering a semi-transparent backdrop
 * - Fade in/out animations (when animations are enabled)
 * - Proper z-indexing for modal behavior
 * - Theme-based styling
 *
 * The overlay visibility is controlled by the `showPopup` state from CookieBanner context,
 * and its animation behavior is controlled by the `disableAnimation` flag.
 *
 * @public
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
	({ className, style, noStyle, asChild, ...props }, ref) => {
		const { showPopup } = useConsentManager();
		const { disableAnimation } = useThemeContext();
		const theme = useStyles("cookie-banner.overlay", {
			baseClassName: "cookie-banner-overlay",
			noStyle,
		});

		return showPopup ? (
			disableAnimation ? (
				<div ref={ref} {...props} {...theme} />
			) : (
				<AnimatePresence>
					<motion.div
						ref={ref}
						{...theme}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
				</AnimatePresence>
			)
		) : null;
	},
);
