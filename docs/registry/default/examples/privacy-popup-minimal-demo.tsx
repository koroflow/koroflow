import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";
import { PrivacyConsentProvider } from "@koroflow/core-react";

export default function PrivacyPopupMinimalDemo() {
  return (
    <PrivacyConsentProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
    >
      <PrivacyPopup />
    </PrivacyConsentProvider>
  );
}
