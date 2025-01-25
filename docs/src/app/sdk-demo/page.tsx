"use client";

import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerDialog } from "@koroflow/elements/consent-manager";
import CookieBanner from "@koroflow/elements/cookie-banner";
import { ConsentManagerProvider, useConsentManager } from "@koroflow/elements/headless";
import "@koroflow/elements/globals.css";
import { DemoWidget } from "./component";

export default function PrivacyConsentPage() {
	return (
		<main className="container py-10">
			<ConsentManagerProvider
				initialGdprTypes={["necessary", "marketing", "functionality", "measurement"]}
				initialComplianceSettings={{
					gdpr: { enabled: true, appliesGlobally: true, applies: true },
					ccpa: { enabled: true, appliesGlobally: false, applies: undefined },
					lgpd: { enabled: false, appliesGlobally: false, applies: undefined },
					usStatePrivacy: {
						enabled: true,
						appliesGlobally: false,
						applies: undefined,
					},
				}}
			>
				<DemoWidget />
				<CookieBanner
					noStyle
					theme={{
						"cookie-banner.root":
							"bottom-12 left-12 fixed z-50 flex items-end sm:items-center justify-center px-4 sm:px-0",
						"cookie-banner.card":
							"max-w-md w-full relative border bg-gradient-to-b from-[#111111] rounded-lg to-black border-t-[.75px] border-white/20 overflow-hidden",
						"cookie-banner.header.root":
							"space-y-2 px-4 sm:px-6 pt-4 sm:pt-6 border-white/10 editor-top-gradient",
						"cookie-banner.header.title": "text-lg sm:text-xl",
						"cookie-banner.header.description": "text-sm sm:text-base",
						"cookie-banner.footer": "flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6",
						"cookie-banner.footer.sub-group":
							"flex flex-col sm:flex-row justify-between gap-4 w-full sm:w-auto",
						"cookie-banner.footer.accept-button":
							"relative flex items-center px-4 gap-2 text-sm font-semibold text-black group-hover:bg-white/90 duration-1000 rounded-lg bg-gradient-to-r from-white/80 to-white h-10",
						"cookie-banner.footer.reject-button":
							"items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
						"cookie-banner.footer.customize-button":
							"items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
						// "cookiebanner.root": "bottom-12 left-12 fixed z-50 flex items-end sm:items-center justify-center px-4 sm:px-0",
						// "cookiebanner.card": "max-w-md w-full relative border bg-gradient-to-b from-[#111111] rounded-lg to-black border-t-[.75px] border-white/20 overflow-hidden",
						// "cookiebanner.header": "space-y-2 px-4 sm:px-6 pt-4 sm:pt-6 border-white/10 editor-top-gradient",
						// "cookiebanner.title": "text-lg sm:text-xl",
						// "cookiebanner.description": "text-sm sm:text-base",
						// "cookiebanner.footer": "flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6",
						// "cookiebanner.footerSubGroup": "flex flex-col sm:flex-row justify-between gap-4 w-full sm:w-auto",
						// acceptButton: "relative flex items-center px-4 gap-2 text-sm font-semibold text-black group-hover:bg-white/90 duration-1000 rounded-lg bg-gradient-to-r from-white/80 to-white h-10",
						// rejectButton: "items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
						// customizeButton: "items-center gap-2 px-4 duration-500 border border-white/40 rounded-lg text-white/70 hover:text-white h-10 flex",
					}}
				/>
				<ConsentManagerDialog />
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
