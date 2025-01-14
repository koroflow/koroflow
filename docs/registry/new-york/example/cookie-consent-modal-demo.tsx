import { type ReactNode, useState, useCallback } from "react";
import { Button } from "@/registry/new-york/components/button";
import {
  CookieConsentModal,
  CookieConsentTrigger,
  CookieConsentAccept,
  CookieConsentDecline,
} from "@/registry/new-york/components/cookie-consent-modal";
import type { allConsentNames } from "@/types/consent";

type DemoProviderProps = {
  children?: ReactNode;
  requiredGdprPurposes?: allConsentNames[];
};

// Demo analytics hook that tracks consent state
const useDemoAnalytics = () => {
  const [hasConsent, setHasConsent] = useState(false);
  return {
    isLoaded: true,
    state: {
      consent: {
        dateConsented: hasConsent ? new Date() : undefined,
      },
    },
    consent: (params: {
      gdprPurposes?: Record<allConsentNames, boolean>;
      type: "all" | "minimum" | "custom";
    }) => {
      console.log("Consent updated:", params);
      setHasConsent(true);
      localStorage.setItem("cookieConsent", JSON.stringify(params));
    },
  };
};

export const CookieConsentDemoProvider = ({
  requiredGdprPurposes = ["necessary"],
}: DemoProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const analytics = useDemoAnalytics();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="z-10 flex min-h-64 items-center justify-center">
        <Button onClick={handleOpenSettings}>Show Cookie Consent Banner</Button>
      </div>
      {isOpen && (
        <CookieConsentModal
          requiredGdprPurposes={requiredGdprPurposes}
          useAnalytics={() => analytics}
          lockScroll={false}
        >
          <h2 className="text-lg font-semibold">We value your privacy</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic.
          </p>
          <div className="mt-4 flex justify-between space-x-2">
            <div className="space-x-2">
              <CookieConsentDecline onClick={handleClose}>
                Decline
              </CookieConsentDecline>
              <CookieConsentAccept onClick={handleClose}>
                Accept All
              </CookieConsentAccept>
            </div>
            <CookieConsentTrigger asChild>
              <Button variant="outline">Customize</Button>
            </CookieConsentTrigger>
          </div>
        </CookieConsentModal>
      )}
    </>
  );
};

export default CookieConsentDemoProvider;
