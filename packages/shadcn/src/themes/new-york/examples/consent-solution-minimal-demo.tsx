"use client";

import { ConsentManagerProvider, useConsentManager } from "@koroflow/core-react";
import { Cookie, Lock, RefreshCw } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../components/button";
import { ConsentCustomizationDialog } from "../components/consent/consent-customization-dialog";
import { CookieBanner } from "../components/consent/cookie-banner";

export default function PrivacyPopupMinimalDemo() {
	return (
		<ConsentManagerProvider
			initialGdprTypes={["necessary", "marketing", "functionality", "measurement"]}
			// This namespace is used specifically for demonstration purposes,
			// allowing multiple instances of the consent manager to coexist on the same page.
			// It helps in isolating consent states for different demos or components.
			namespace="MinimalDemo"
		>
			<DemoWidget />
			<CookieBanner />
		</ConsentManagerProvider>
	);
}

export function DemoWidget() {
	const { clearAllData, setShowPopup } = useConsentManager();
	const handleResetConsent = useCallback(() => {
		clearAllData();
	}, [clearAllData]);

	const handleOpenCookiePopup = useCallback(() => {
		setShowPopup(true);
	}, [setShowPopup]);

	return (
		<div className="flex flex-col gap-4 py-8 lg:py-0">
			<Button onClick={handleOpenCookiePopup}>
				<Cookie className="h-4 w-4 mr-2" />
				Open Cookie Banner
			</Button>
			<ConsentCustomizationDialog>
				<Button>
					<Lock className="h-4 w-4 mr-2" />
					Open Consent Customization{" "}
				</Button>
			</ConsentCustomizationDialog>
			<Button onClick={handleResetConsent}>
				<RefreshCw className="h-4 w-4 mr-2" />
				Reset Local Storage Consent
			</Button>
		</div>
	);
}
