"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/components/card";
import { PrivacyConsentDialog } from "@/registry/default/components/privacy-consent/privacy-consent-dialog";
import { Button } from "@/registry/default/components/button";
import { PrivacyConsentWidget } from "@/registry/default/components/privacy-consent/privacy-consent-widget";
import { PrivacyConsentProvider } from "@/registry/default/components/privacy-consent/privacy-consent-provider";
import { usePrivacyConsent } from "@/registry/default/components/privacy-consent/hooks/use-privacy-consent";

function PrivacyModalContent() {
  const { setIsPrivacyDialogOpen } = usePrivacyConsent();

  const openDialog = () => {
    setIsPrivacyDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Modal Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={openDialog}>Open Privacy Settings Modal</Button>
        <PrivacyConsentDialog>
          <PrivacyConsentWidget />
        </PrivacyConsentDialog>
      </CardContent>
    </Card>
  );
}

export default function PrivacyModalExample() {
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
      <PrivacyModalContent />
    </PrivacyConsentProvider>
  );
}
