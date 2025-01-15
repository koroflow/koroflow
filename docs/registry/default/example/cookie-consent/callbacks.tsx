"use client";

import { PrivacyConsentProvider } from "@/registry/default/components/privacy-consent/privacy-consent-provider";
import { usePrivacyConsent } from "@/registry/default/components/privacy-consent/hooks/use-privacy-consent";
import { CookiePopup } from "@/registry/default/components/privacy-consent/cookie-popup";
import { useEffect, useState } from "react";
import { Button } from "@/registry/default/components/button";
import { Alert, AlertDescription } from "@/registry/default/components/alert";
import { privacyConsentAtom } from "@/registry/default/components/privacy-consent/atoms/privacy-consent.atoms";
import { useAtom } from "jotai";

function EventLog() {
  const [events, setEvents] = useState<string[]>([]);
  const { setShowPopup } = usePrivacyConsent();
  const [snapshot] = useAtom(privacyConsentAtom);

  // Track state changes from the machine
  useEffect(() => {
    const addEvent = (message: string) => {
      setEvents((prev) => [
        ...prev,
        `${message} at ${new Date().toLocaleTimeString()}`,
      ]);
    };

    // Subscribe to machine state changes
    if (snapshot.value === "popupVisible") {
      addEvent("Banner shown");
    }
    if (snapshot.matches("popupVisible")) {
      addEvent("Banner closed");
    }
    if (snapshot.context.consents.necessary) {
      addEvent("Consent given");
    }
    if (!snapshot.context.consents.necessary) {
      addEvent("Consent rejected");
    }
  }, [snapshot]);

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowPopup(true)}>Show Cookie Banner</Button>

      <div className="space-y-2">
        <h2 className="font-bold">Event Log:</h2>
        {events.map((event, i) => (
          <Alert key={i}>
            <AlertDescription>{event}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}

export default function CallbacksExample() {
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
      <div className="min-h-screen p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          State Machine Events Example
        </h1>
        <EventLog />
        <CookiePopup />
      </div>
    </PrivacyConsentProvider>
  );
}
