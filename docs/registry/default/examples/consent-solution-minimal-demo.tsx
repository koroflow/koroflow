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
      // This is just for the demo's so we can have multiple instances of the consent manager on the same page.
      namespace="minimal-demo"
    >
      <CookieBanner />
    </ConsentManagerProvider>
  );
}
