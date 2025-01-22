import { Button } from "@/components/ui/button";
import { ConsentCustomizationDialog } from "@/registry/default/components/consent/consent-customization-dialog";
import { CookieBanner } from "@/registry/default/components/consent/cookie-banner";
import { ConsentManagerProvider } from "@koroflow/core-react";
import KoroflowDevTool from "@koroflow/dev-tools";

export default function PrivacyPopupDemo() {
	return (
		<ConsentManagerProvider
			initialGdprTypes={["necessary", "marketing", "functionality", "measurement"]}
		>
			<div className="text-center space-y-4">
				<div className="space-x-4">
					<ConsentCustomizationDialog>
						<Button>Open Privacy Settings</Button>
					</ConsentCustomizationDialog>
				</div>
			</div>
			<CookieBanner />
			<KoroflowDevTool />
		</ConsentManagerProvider>
	);
}
