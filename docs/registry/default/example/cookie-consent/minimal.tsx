"use client";

import { PrivacyConsentProvider } from "@/registry/default/components/privacy-consent/privacy-consent-provider";
import { usePrivacyConsent } from "@/registry/default/components/privacy-consent/hooks/use-privacy-consent";
import { CookiePopup } from "@/registry/default/components/privacy-consent/cookie-popup";
import { Button } from "@/registry/default/components/button";

function MinimalExampleContent() {
  const { showPopup, setShowPopup, consents } = usePrivacyConsent();

  const handleOpenCookieSettings = () => {
    setShowPopup(true);
  };

  return (
    <div className="p-4">
      <Button onClick={handleOpenCookieSettings}>
        {showPopup ? "Close" : "Open"} Cookie Settings
      </Button>
      <div className="mt-4">
        Current consent state: {consents.necessary ? "Accepted" : "Declined"}
      </div>
      <CookiePopup
        bannerTitle="Cookies"
        bannerDescription="This website uses necessary cookies to ensure proper functionality."
      />
    </div>
  );
}

export default function MinimalExample() {
  return (
    <PrivacyConsentProvider
      initialGdprTypes={["necessary"]}
      initialComplianceSettings={{
        gdpr: { enabled: true, appliesGlobally: true, applies: true },
        ccpa: { enabled: false, appliesGlobally: false, applies: undefined },
        lgpd: { enabled: false, appliesGlobally: false, applies: undefined },
        usStatePrivacy: {
          enabled: false,
          appliesGlobally: false,
          applies: undefined,
        },
      }}
    >
      <MinimalExampleContent />
    </PrivacyConsentProvider>
  );
}
