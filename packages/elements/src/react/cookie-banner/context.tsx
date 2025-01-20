"use client";

import { createContext, useContext } from "react";
import type { useConsentManager } from "../store/consent-manager";

// Types
type CookieBannerContextValue = ReturnType<typeof useConsentManager>;

// Context
export const CookieBannerContext =
	createContext<CookieBannerContextValue | null>(null);

export const useCookieBannerContext = () => {
	const context = useContext(CookieBannerContext);
	if (!context) {
		throw new Error(
			"CookieBanner components must be used within CookieBanner.Root",
		);
	}
	return context;
};
