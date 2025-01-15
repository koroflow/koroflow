"use client";

import { CookiePopup } from "@/registry/default/components/privacy-consent/cookie-popup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/components/card";
import { PrivacyConsentDialog } from "@/registry/default/components/privacy-consent/privacy-consent-dialog";
import { PrivacyConsentProvider } from "../../components/privacy-consent/privacy-consent-provider";

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
      <div className="min-h-screen p-8 max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Advanced Compliance Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <PrivacyConsentDialog>
              <button className="text-blue-600 hover:underline">
                Manage Cookie Preferences
              </button>
            </PrivacyConsentDialog>
          </CardContent>
        </Card>

        <CookiePopup
          bannerTitle="Privacy Notice"
          bannerDescription="This site uses cookies and similar technologies to provide essential functionality and improve your experience."
          enableScrollLock={true}
        />
      </div>
    </PrivacyConsentProvider>
  );
}
