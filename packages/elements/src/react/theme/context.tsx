"use client";

import { createContext, useContext } from "react";
import type { useConsentManager } from "../common/store/consent-manager";
// import type { CookieBannerTheme } from "./types";

/**
 * The value type for the ThemeContext.
 *
 * This type extends the return type of `useConsentManager` and includes additional
 * properties for styling the cookie banner.
 *
 * @typedef {Object} ThemeContextValue
 * @property {boolean} noStyle - Indicates whether default styles should be disabled.
 * @property {CookieBannerTheme} styles - Custom styles to apply to the CookieBanner and its children.
 * @property {boolean} disableAnimation - Indicates whether all animations should be disabled.
 * @property {boolean} showPopup - Indicates whether the cookie banner popup should be shown.
 */
export type ThemeContextValue = ReturnType<typeof useConsentManager> & {
	// noStyle: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	theme: any;
	disableAnimation: boolean;
};

/**
 * The context for the CookieBanner components.
 *
 * This context provides access to the consent management state and styling options
 * for the cookie banner. It must be used within a `CookieBanner.Root` component.
 *
 * @constant
 * @type {React.Context<ThemeContextValue | null>}
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Hook to access the ThemeContext.
 *
 * This hook provides the context value for the cookie banner, ensuring that it is
 * used within a `CookieBanner.Root` component. If the context is not available,
 * it throws an error.
 *
 * @returns {ThemeContextValue} The context value for the cookie banner.
 * @throws Will throw an error if the context is used outside of a `Theme.Root`.
 */
export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("Theme components must be used within Theme.Root");
	}
	return context;
};
