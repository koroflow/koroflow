"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/components/card";
import { PrivacyConsentWidget } from "@/registry/default/components/privacy-consent/privacy-consent-widget";
import { PrivacyConsentProvider } from "@/registry/default/components/privacy-consent/privacy-consent-provider";

export default function PrivacyWidgetExample() {
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
      <Card>
        <CardHeader>
          <CardTitle>Embedded Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <PrivacyConsentWidget />
        </CardContent>
      </Card>
    </PrivacyConsentProvider>
  );
}
