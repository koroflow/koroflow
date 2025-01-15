// import PlaygroundExampleWrapper from "@/registry/default/example/cookie-consent/playground";

import { PrivacyConsentProvider } from "@better-events/react";

import { PrivacyDevToolWidget } from "@better-events/dev-tools";
import PrivacySettingsModal from "@/components/ui/privacy-setting-modal";
import { Button } from "@/components/ui/button";
import CookieConsentBanner from "@/components/ui/cookie-consent-banner";
export default function PrivacyConsentPage() {
  return (
    <main className="container py-10">
      <PrivacyConsentProvider
        initialGdprTypes={["necessary", "marketing"]}
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
          <h1 className="text-4xl font-bold">Better Events SDK Demo</h1>
          <p className="text-xl">
            Explore our privacy consent management tools
          </p>
          <div className="space-x-4">
            <PrivacySettingsModal>
              <Button>Open Privacy Settings</Button>
            </PrivacySettingsModal>
          </div>
        </div>
        {/* <CookieConsentBanner /> */}
        {/* <PrivacyDevToolWidget /> */}
      </PrivacyConsentProvider>
    </main>
  );
}
