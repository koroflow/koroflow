"use client";

import type { FC, ReactNode } from "react";
import { useConsentManager } from "../common/store/consent-manager";
import { CookieBannerContext } from "./context";
import type { CookieBannerStyles } from "./types";

interface CookieBannerRootProps {
	/** Custom styles to apply to the CookieBanner and its children */
	styles?: CookieBannerStyles;
	/** Whether to disable default styles */
	noStyle?: boolean;
	/** Whether to disable all animations */
	disableAnimation?: boolean;
	/** Children components */
	children: ReactNode;
}

export const CookieBannerRoot: FC<CookieBannerRootProps> = ({
	children,
	styles = {},
	noStyle = false,
	disableAnimation = false,
}) => {
	const consentManager = useConsentManager();

	return (
		<CookieBannerContext.Provider
			value={{
				...consentManager,
				styles,
				noStyle,
				disableAnimation,
			}}
		>
			{children}
		</CookieBannerContext.Provider>
	);
}; 