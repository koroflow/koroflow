import {
	ConsentCustomizationDialog,
	ConsentManagerProvider,
	CookieBanner,
} from "@koroflow/core-react";

import KoroflowDevTool from "@koroflow/dev-tools";

export default function PrivacyConsentPage() {
	return (
		<main className="container py-10">
			<ConsentManagerProvider
				initialGdprTypes={[
					"necessary",
					"marketing",
					"functionality",
					"measurement",
				]}
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
					<p className="text-xl">
						Explore our privacy consent management tools
					</p>
				</div>
				<CookieBanner.Root>
					<CookieBanner.Content className="bottom-4 left-4">
						<CookieBanner.Title>We value your privacy</CookieBanner.Title>
						<CookieBanner.Description>
							This site uses cookies to improve your browsing experience,
							analyze site traffic, and show personalized content.
						</CookieBanner.Description>
						<CookieBanner.Actions>
							<CookieBanner.RejectButton>Reject All</CookieBanner.RejectButton>
							<CookieBanner.CustomizeButton>Customize</CookieBanner.CustomizeButton>
							<CookieBanner.AcceptButton>Accept All</CookieBanner.AcceptButton>
						</CookieBanner.Actions>
					</CookieBanner.Content>
				</CookieBanner.Root>
				<ConsentCustomizationDialog />
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
