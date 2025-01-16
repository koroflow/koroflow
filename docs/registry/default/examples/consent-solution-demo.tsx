import { ConsentManagerProvider } from "@koroflow/core-react";
import KoroflowDevTool from "@koroflow/dev-tools";
import ConsentCustomizationModal from "@/registry/default/components/consent/consent-customization-modal";
import { Button } from "@/components/ui/button";
import CookieBanner from "@/registry/default/components/consent/cookie-banner";

export default function PrivacyPopupDemo() {
  return (
    <ConsentManagerProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
      // This namespace is used specifically for demonstration purposes,
      // allowing multiple instances of the consent manager to coexist on the same page.
      // It helps in isolating consent states for different demos or components.
      namespace="ConsentSolutionDemo"
    >
      <div className="text-center space-y-4">
        <div className="space-x-4">
          <ConsentCustomizationModal>
            <Button>Open Privacy Settings</Button>
          </ConsentCustomizationModal>
        </div>
      </div>
      <CookieBanner />
    </ConsentManagerProvider>
  );
}
