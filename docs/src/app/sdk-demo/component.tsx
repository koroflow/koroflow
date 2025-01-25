"use client";

import { useConsentManager } from "@koroflow/elements/headless";
import * as Button from "~/components/ui/button";
import "@koroflow/elements/globals.css";
import { useCallback } from "react";

export function DemoWidget() {
	const { clearAllData, setShowPopup, setIsPrivacyDialogOpen } = useConsentManager();
	const handleResetConsent = useCallback(() => {
		clearAllData();
	}, [clearAllData]);

	const handleOpenCookiePopup = useCallback(() => {
		setShowPopup(true);
	}, [setShowPopup]);

	const handleOpenConsentCustomization = useCallback(() => {
		setIsPrivacyDialogOpen(true);
	}, [setIsPrivacyDialogOpen]);

	return (
		<div className="space-y-8">
			<div className="text-center space-y-4 mb-8">
				<h1 className="text-4xl font-bold">Koroflow SDK Demo</h1>
				<p className="text-xl">Explore our privacy consent management tools</p>
			</div>

			<div className="flex flex-row gap-4 py-8 lg:py-0 items-center justify-center max-w-xl mx-auto">
				<Button.Root onClick={handleOpenCookiePopup} mode="lighter">
					{/* <Button.Icon icon={Cookie}/> */}
					Open Cookie Banner
				</Button.Root>
				<Button.Root onClick={handleOpenConsentCustomization} mode="lighter">
					{/* <Button.Icon icon={Cookie}/> */}
					Open Consent Dialog
				</Button.Root>
			</div>
			<div className="flex flex-row gap-4 py-8 lg:py-0 items-center justify-center max-w-xl mx-auto">
				<Button.Root onClick={handleResetConsent} variant="neutral" mode="lighter">
					{/* <Button.Icon icon={RefreshCw}/> */}
					Reset Local Storage Consent
				</Button.Root>
			</div>
		</div>
	);
}
