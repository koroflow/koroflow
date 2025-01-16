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
    >
      <CookieBanner />
    </ConsentManagerProvider>
  );
}
