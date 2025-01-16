import CookieBanner from "@/registry/default/components/consent/cookie-banner";
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
      // This namespace is used specifically for demonstration purposes,
      // allowing multiple instances of the consent manager to coexist on the same page.
      // It helps in isolating consent states for different demos or components.
      namespace="MinimalDemo"
    >
      <CookieBanner />
    </ConsentManagerProvider>
  );
}
