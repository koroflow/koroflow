"use client";

import { ConsentCustomizationDialog } from "@/registry/default/components/consent/consent-customization-dialog";
import { CookieBanner } from "@/registry/default/components/consent/cookie-banner";
import { ConsentManagerProvider, useConsentManager } from "@koroflow/core-react";
import { Cookie, Lock, RefreshCw } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Button } from "../components/button";

export default function PrivacyPopupMinimalDemo() {
	return (
		<ConsentManagerProvider
			initialGdprTypes={["necessary", "marketing", "functionality", "measurement"]}
			// This namespace is used specifically for demonstration purposes,
			// allowing multiple instances of the consent manager to coexist on the same page.
			// It helps in isolating consent states for different demos or components.
			namespace="CallbackDemo"
		>
			<DemoWidget />
			<CookieBanner />
		</ConsentManagerProvider>
	);
}

export function DemoWidget() {
	const { clearAllData, setShowPopup, setCallback } = useConsentManager();

	const handleResetConsent = useCallback(() => {
		clearAllData();
	}, [clearAllData]);

	const handleOpenCookiePopup = useCallback(() => {
		setShowPopup(true);
	}, [setShowPopup]);

	useEffect(() => {
		setCallback("onBannerShown", () => {
			console.log("Banner displayed");
		});

		setCallback("onConsentGiven", () => {
			console.log("User gave consent");
		});

		setCallback("onConsentRejected", () => {
			console.log("User rejected consent");
		});

		setCallback("onBannerClosed", () => {
			console.log("Banner closed");
		});
	}, [setCallback]);
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
