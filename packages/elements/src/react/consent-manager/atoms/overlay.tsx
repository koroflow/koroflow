/**
 * @packageDocumentation
 * Provides the overlay backdrop component for the CookieBanner.
 */

import { AnimatePresence, motion } from "motion/react";
import type { FC } from "react";
import { useConsentManager } from "../../common";
import { type ThemeValue, useStyles, useThemeContext } from "../../theme";

// import { useStyles } from "./hooks/use-styles";

/**
 * Props for the Overlay component.
 *
 * @remarks
 * The overlay provides a semi-transparent backdrop behind the cookie banner content.
 * It can be styled using the CookieBanner theme system or through direct style props.
 *
 * @public
 */
interface OverlayProps {
	/**
	 * Custom styles to override default overlay styling.
	 *
	 * @remarks
	 * Can be either a string class name or an object with className and style properties.
	 * These styles will be merged with the theme styles and default styles.
	 */
	style?: ThemeValue;

	/**
	 * @remarks
	 * When true, the component will not apply any styles.
	 */
	noStyle?: boolean;
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
export const Overlay: FC<OverlayProps> = ({ noStyle }) => {
	const { isPrivacyDialogOpen } = useConsentManager();
	const { disableAnimation } = useThemeContext();
	const theme = useStyles("consent-manager.overlay", {
		baseClassName: "consent-manager-overlay",
		noStyle,
	});

	return isPrivacyDialogOpen ? (
		disableAnimation ? (
			<div {...theme} />
		) : (
			<AnimatePresence>
				<motion.div
					{...theme}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			</AnimatePresence>
		)
	) : null;
};
