import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerProvider } from "@koroflow/elements/common";
import CookieBanner, {
	type CookieBannerStyles,
} from "@koroflow/elements/cookie-banner";

export default function PrivacyConsentPage() {
	const customStyles: CookieBannerStyles = {
		root: "fixed bottom-0 left-0 right-0 z-50",
		content: "bg-gray-800 text-white p-4 md:p-6",
		title: "text-xl font-bold mb-2",
		description: "text-sm mb-4",
		actions: "flex justify-end space-x-2",
		rejectButton: "px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700",
		customizeButton:
			"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
		acceptButton:
			"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",
	};

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
				<CookieBanner styles={customStyles} />
				{/* <ConsentCustomizationDialog /> */}
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
