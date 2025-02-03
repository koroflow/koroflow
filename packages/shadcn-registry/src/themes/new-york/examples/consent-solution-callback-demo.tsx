"use client";

import {
	ConsentManagerProvider,
	useConsentManager,
} from "@koroflow/elements/headless";
import { Cookie, Lock, RefreshCw } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Button } from "../components/button";
import { ConsentManagerDialog } from "../components/consent/consent-manager-dialog";
import { CookieBanner } from "../components/consent/cookie-banner";

export default function PrivacyPopupMinimalDemo() {
	return (
		<ConsentManagerProvider
			initialGdprTypes={[
				"necessary",
				"marketing",
				"functionality",
				"measurement",
			]}
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
				<Cookie className="mr-2 h-4 w-4" />
				Open Cookie Banner
			</Button>
			<ConsentManagerDialog>
				<Button>
					<Lock className="mr-2 h-4 w-4" />
					Open Consent Customization{" "}
				</Button>
			</ConsentManagerDialog>
			<Button onClick={handleResetConsent}>
				<RefreshCw className="mr-2 h-4 w-4" />
				Reset Local Storage Consent
			</Button>
		</div>
	);
}
