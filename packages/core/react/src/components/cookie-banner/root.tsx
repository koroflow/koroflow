"use client";

import { useConsentManager } from "../../consent-manager";
import { CookieBannerContext } from "./context";

// Root Component
const CookieBannerRoot = function CookieBannerRoot({
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
}) {
	const consentManager = useConsentManager();

	return (
		<CookieBannerContext.Provider value={consentManager}>
			<div {...props}>{children}</div>
		</CookieBannerContext.Provider>
	);
};

export { CookieBannerRoot };
