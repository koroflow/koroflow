import KoroflowDevTool from "@koroflow/dev-tools";
import { ConsentManagerProvider } from "@koroflow/elements/common";
import CookieBanner, {
	type CookieBannerStyles,
} from "@koroflow/elements/cookie-banner";

export default function PrivacyConsentPage() {
	// const customStyles: CookieBannerStyles = {
	// 	root: {
	// 		style: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 },
	// 	},
	// 	content: {
	// 		style: { backgroundColor: "#1a202c", color: "white", padding: "1rem" },
	// 		className: "rounded-lg shadow-lg",
	// 	},
	// 	title: {
	// 		style: {
	// 			fontSize: "1.25rem",
	// 			fontWeight: "bold",
	// 			marginBottom: "0.5rem",
	// 		},
	// 	},
	// 	description: { style: { fontSize: "0.875rem", marginBottom: "1rem" } },
	// 	actions: {
	// 		style: { display: "flex", justifyContent: "flex-end", gap: "0.5rem" },
	// 	},
	// 	rejectButton: {
	// 		style: {
	// 			padding: "0.5rem 1rem",
	// 			backgroundColor: "#4a5568",
	// 			color: "white",
	// 			borderRadius: "0.25rem",
	// 		},
	// 		className: "hover:bg-gray-700 transition-colors",
	// 	},
	// 	customizeButton: {
	// 		style: {
	// 			padding: "0.5rem 1rem",
	// 			backgroundColor: "#3182ce",
	// 			color: "white",
	// 			borderRadius: "0.25rem",
	// 		},
	// 		className: "hover:bg-blue-600 transition-colors",
	// 	},
	// 	acceptButton: {
	// 		style: {
	// 			padding: "0.5rem 1rem",
	// 			backgroundColor: "#38a169",
	// 			color: "white",
	// 			borderRadius: "0.25rem",
	// 		},
	// 		className: "hover:bg-green-600 transition-colors",
	// 	},
	// };

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
				<CookieBanner />
				<KoroflowDevTool />
			</ConsentManagerProvider>
		</main>
	);
}
