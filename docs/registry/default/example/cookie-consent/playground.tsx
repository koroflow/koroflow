"use client";

import { PrivacyConsentProvider } from "@/registry/default/components/privacy-consent/privacy-consent-provider";
import { usePrivacyConsent } from "@/registry/default/components/privacy-consent/hooks/use-privacy-consent";
import { CookiePopup } from "@/registry/default/components/privacy-consent/cookie-popup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/default/components/card";
import { PrivacyConsentDialog } from "@/registry/default/components/privacy-consent/privacy-consent-dialog";
import { Button } from "@/registry/default/components/button";

function AdvancedComplianceContent() {
  const { consents, complianceSettings, setShowPopup } = usePrivacyConsent();

  const activeRegulations = Object.entries(complianceSettings)
    .filter(
      ([_, settings]: [string, any]) =>
        settings &&
        typeof settings === "object" &&
        "enabled" in settings &&
        "applies" in settings &&
        settings.enabled &&
        settings.applies,
    )
    .map(([name]) => name.toUpperCase())
    .join(", ");

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Advanced Compliance Settings</h1>
      <Button onClick={() => setShowPopup(true)} className="mb-4">
        Show Cookie Banner
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Active Regulations: {activeRegulations}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Current Consent Status:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              {Object.entries(consents).map(([name, value]) => (
                <li key={name} className="text-sm">
                  {name}: {value ? "Accepted" : "Declined"}
                </li>
              ))}
            </ul>
          </div>
          <PrivacyConsentDialog>
            <Button variant="link" className="p-0 h-auto font-normal">
              Manage Cookie Preferences
            </Button>
          </PrivacyConsentDialog>
        </CardContent>
      </Card>

      <CookiePopup
        bannerTitle="Privacy Notice"
        bannerDescription="This site uses cookies and similar technologies to provide essential functionality and improve your experience."
        enableScrollLock={true}
        horizontalPosition="center"
        verticalPosition="bottom"
      />
    </div>
  );
}

export default function AdvancedComplianceExample() {
  return (
    <PrivacyConsentProvider
      initialGdprTypes={[
        "necessary",
        "functionality",
        "marketing",
        "measurement",
        "experience",
      ]}
      initialComplianceSettings={{
        gdpr: { enabled: true, appliesGlobally: true, applies: true },
        ccpa: { enabled: true, appliesGlobally: false, applies: true },
        lgpd: { enabled: true, appliesGlobally: false, applies: false },
        usStatePrivacy: {
          enabled: true,
          appliesGlobally: false,
          applies: true,
        },
      }}
    >
      <AdvancedComplianceContent />
    </PrivacyConsentProvider>
  );
}
