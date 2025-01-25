"use client";

import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerDialog } from "@koroflow/elements/consent-manager";
import CookieBanner from "@koroflow/elements/cookie-banner";
import { ConsentManagerProvider } from "@koroflow/elements/headless";
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
				<CookieBanner />
				<ConsentManagerDialog />
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
