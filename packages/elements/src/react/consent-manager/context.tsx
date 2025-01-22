"use client";

import { createContext, useContext } from "react";
import type { useConsentManager } from "../common/store/consent-manager";
import type { CookieBannerStyles, StyleValue } from "./types";

/**
 * The value type for the CookieBannerContext.
 *
 * This type extends the return type of `useConsentManager` and includes additional
 * properties for styling the cookie banner.
 *
 * @typedef {Object} CookieBannerContextValue
 * @property {boolean} noStyle - Indicates whether default styles should be disabled.
 * @property {CookieBannerStyles} styles - Custom styles to apply to the CookieBanner and its children.
 * @property {boolean} disableAnimation - Indicates whether all animations should be disabled.
 * @property {boolean} showPopup - Indicates whether the cookie banner popup should be shown.
 */
export type CookieBannerContextValue = ReturnType<typeof useConsentManager> & {
	noStyle: boolean;
	styles: CookieBannerStyles;
	disableAnimation: boolean;
	showPopup: boolean;
};

/**
 * The context for the CookieBanner components.
 *
 * This context provides access to the consent management state and styling options
 * for the cookie banner. It must be used within a `CookieBanner.Root` component.
 *
 * @constant
 * @type {React.Context<CookieBannerContextValue | null>}
 */
export const CookieBannerContext = createContext<CookieBannerContextValue | null>(null);

/**
 * Hook to access the CookieBannerContext.
 *
 * This hook provides the context value for the cookie banner, ensuring that it is
 * used within a `CookieBanner.Root` component. If the context is not available,
 * it throws an error.
 *
 * @returns {CookieBannerContextValue} The context value for the cookie banner.
 * @throws Will throw an error if the context is used outside of a `CookieBanner.Root`.
 */
export const useCookieBannerContext = () => {
	const context = useContext(CookieBannerContext);
	if (!context) {
		throw new Error("CookieBanner components must be used within CookieBanner.Root");
	}
	return context;
};
