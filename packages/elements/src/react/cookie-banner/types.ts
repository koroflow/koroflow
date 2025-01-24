import type clsx from "clsx";
import type { CSSProperties } from "react";

import type { ButtonStyleKeys, ConsentButtonStyles } from "../primitives/button.types";
import type { ClassNameStyle, Prettify, StyleValue } from "../theme/types";

/**
 * Configuration object for styling different parts of the CookieBanner component.
 * @public
 */
export interface CookieBannerStyles {
	/** @remarks Styles for the root container element */
	root?: StyleValue;
	card?: StyleValue;
	/** @remarks Styles for the main content wrapper */
	header?: {
		root?: ClassNameStyle;
		/** @remarks Styles for the banner title */
		title?: StyleValue;
		/** @remarks Styles for the banner description text */
		description?: StyleValue;
	};

	/** @remarks Styles for the actions container */
	footer?: ConsentButtonStyles;
	/** @remarks Styles for the overlay background */
	overlay?: StyleValue;
}
