import { ConsentManagerProvider } from "@koroflow/core-react";

import KoroflowDevTool from "@koroflow/dev-tools";
import ConsentCustomizationModal from "@/registry/default/components/consent/consent-customization-modal";
import { Button } from "@/components/ui/button";
import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";

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
          <p className="text-xl">
            Explore our privacy consent management tools
          </p>
          <div className="space-x-4">
            <ConsentCustomizationModal>
              <Button>Open Privacy Settings</Button>
            </ConsentCustomizationModal>
          </div>
        </div>
        <PrivacyPopup />
        <KoroflowDevTool />
      </ConsentManagerProvider>
    </main>
  );
}

