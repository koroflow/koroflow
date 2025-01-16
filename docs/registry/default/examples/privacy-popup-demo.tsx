import { ConsentManagerProvider } from "@koroflow/core-react";
import KoroflowDevTool from "@koroflow/dev-tools";
import ConsentCustomizationModal from "@/registry/default/components/consent/consent-customization-modal";
import { Button } from "@/components/ui/button";
import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";

export default function PrivacyPopupDemo() {
  return (
    <main className="container py-10">
      <ConsentManagerProvider
        initialGdprTypes={[
          "necessary",
          "marketing",
          "functionality",
          "measurement",
        ]}
      >
        <div className="text-center space-y-4">
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
