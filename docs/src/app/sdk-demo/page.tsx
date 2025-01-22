import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerProvider } from "@koroflow/elements/common";
import { ConsentManagerDialog, ConsentManagerWidget } from "@koroflow/elements/consent-manager";
import CookieBanner from "@koroflow/elements/cookie-banner";
import "@koroflow/elements/globals.css";

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
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold">Koroflow SDK Demo</h1>
					<p className="text-xl">Explore our privacy consent management tools</p>
				</div>
				<CookieBanner />
				<ConsentManagerDialog />
				<ConsentManagerWidget />
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
