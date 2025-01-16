import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";
import { ConsentManagerProvider } from "@koroflow/core-react";

export default function PrivacyPopupMinimalDemo() {
  return (
    <ConsentManagerProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
    >
      <PrivacyPopup />
    </ConsentManagerProvider>
  );
}
