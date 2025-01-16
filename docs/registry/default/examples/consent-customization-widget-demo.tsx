import { PrivacyConsentProvider } from "@koroflow/core-react";
import KoroflowDevTool from "@koroflow/dev-tools";
import ConsentCustomizationModal from "@/registry/default/components/consent/consent-customization-modal";
import { Button } from "@/components/ui/button";
import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";

export default function PrivacyPopupDemo() {
  return (
    <PrivacyConsentProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
    >
      <div className="text-center space-y-4">
        <ConsentCustomizationModal>
          <Button>Open Consent Customization Modal Settings</Button>
        </ConsentCustomizationModal>
      </div>
      <PrivacyPopup />
      <KoroflowDevTool />
    </PrivacyConsentProvider>
  );
}
