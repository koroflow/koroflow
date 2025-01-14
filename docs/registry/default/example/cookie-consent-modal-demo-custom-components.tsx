import { type ReactNode, useState, useCallback } from "react";
import { Button } from "@/registry/default/components/button";
import {
  CookieConsentModal,
  CookieConsentTrigger,
  CookieConsentAccept,
  CookieConsentDecline,
} from "@/registry/default/components/cookie-consent-modal";
import type {
  allConsentNames,
  consentType,
} from "@/registry/default/lib/gdpr-consent-types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import type { Control } from "react-hook-form";

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

// Custom consent item renderer
const CustomConsentItem = ({
  cookie,
  control,
}: {
  cookie: consentType;
  control: Control<Record<allConsentNames, boolean>>;
}) => (
  <FormField
    control={control}
    name={cookie.name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{cookie.name}</FormLabel>
          <FormDescription>{cookie.description}</FormDescription>
        </div>
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={cookie.disabled}
            aria-readonly={cookie.disabled}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

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
          renderConsentItem={CustomConsentItem}
          customSections={
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold">Privacy Policy</h3>
              <p className="mt-2">
                Please read our privacy policy for more information on how we
                handle your data.
              </p>
              <Button className="mt-2" variant="link">
                Read Privacy Policy
              </Button>
            </div>
          }
          dialogTitle={
            <span className="text-2xl font-bold text-primary">
              Customize Your Cookie Settings
            </span>
          }
          dialogDescription={
            <span className="text-muted-foreground">
              We use cookies and similar technologies to enhance your browsing
              experience, personalize content and ads, and analyze our traffic.
              By clicking "Accept All", you consent to our use of cookies. You
              can manage your preferences by clicking "Customize".
            </span>
          }
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
