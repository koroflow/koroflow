"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import { useConsentManager } from "../hooks/use-consent-manager";
import { cn } from "../libs/utils";

import { ConsentCustomizationDialog } from "./consent-customization-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./primitives/card";
import { Overlay } from "./primitives/overlay";
import { Button } from "./primitives/button";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

interface PrivacyPopupProps extends React.HTMLAttributes<HTMLDivElement> {
  bannerDescription?: string;
  bannerTitle?: string;
  horizontalPosition?: HorizontalPosition;
  verticalPosition?: VerticalPosition;
  showCloseButton?: boolean;
}

export const CookieBanner = React.forwardRef<HTMLDivElement, PrivacyPopupProps>(
  (
    {
      bannerDescription = "This site uses cookies and similar technologies to measure and improve your experience and show you personalized content and ads.",
      bannerTitle = "We value your privacy",
      className,
      horizontalPosition = "left",
      verticalPosition = "bottom",
      showCloseButton = false,
      ...props
    },
    ref
  ) => {
    const {
      showPopup,
      setShowPopup,
      saveConsents,
      setConsent,
      callbacks,
      complianceSettings,
      isPrivacyDialogOpen,
      hasConsented,
      consents,
    } = useConsentManager();

    const bannerShownRef = React.useRef(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);

    React.useEffect(() => {
      if (!isMounted) return;

      if (showPopup && !bannerShownRef.current && !hasConsented()) {
        callbacks.onBannerShown?.();
        bannerShownRef.current = true;
        if (typeof document !== "undefined") {
          document.body.style.overflow = "hidden";
        }
      }

      return () => {
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
      };
    }, [showPopup, callbacks, hasConsented, isMounted]);

    const acceptAll = React.useCallback(() => {
      const allConsents = Object.keys(consents) as (keyof typeof consents)[];
      for (const consentName of allConsents) {
        setConsent(consentName, true);
      }
      saveConsents("all");
    }, [consents, setConsent, saveConsents]);

    const rejectAll = React.useCallback(() => {
      saveConsents("necessary");
    }, [saveConsents]);

    const handleClose = React.useCallback(() => {
      setShowPopup(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      callbacks.onBannerClosed?.();
    }, [setShowPopup, callbacks]);

    const positionClasses = cn(
      "fixed z-50 max-w-md",
      {
        "left-4": horizontalPosition === "left",
        "right-4": horizontalPosition === "right",
        "left-1/2 -translate-x-1/2": horizontalPosition === "center",
        "top-4": verticalPosition === "top",
        "bottom-4": verticalPosition === "bottom",
      },
      className
    );

    // Early return for SSR and when user has consented
    if (!isMounted || (hasConsented() && !showPopup)) {
      return null;
    }

    const BannerContent = () => (
      <AnimatePresence>
        {showPopup && !isPrivacyDialogOpen && (
          <>
            <Overlay show={showPopup} />
            <motion.dialog
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-modal="true"
              aria-labelledby="cookie-consent-title"
            >
              <motion.div
                className={positionClasses}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                ref={ref}
              >
                <Card className="w-full">
                  <CardHeader className="space-y-2 p-4 sm:p-6">
                    {showCloseButton && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={handleClose}
                        onKeyUp={(e) => e.key === "Enter" && handleClose()}
                        onKeyDown={(e) => e.key === "Enter" && handleClose()}
                        aria-label="Close cookie consent banner"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <CardTitle
                      id="cookie-consent-title"
                      className="text-lg sm:text-xl"
                    >
                      {bannerTitle}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {bannerDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 w-full sm:w-auto">
                      {complianceSettings.gdpr.enabled && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={rejectAll}
                          onKeyUp={(e) => e.key === "Enter" && rejectAll()}
                          onKeyDown={(e) => e.key === "Enter" && rejectAll()}
                          className="w-full sm:w-auto"
                        >
                          Reject All
                        </Button>
                      )}
                      <ConsentCustomizationDialog>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Customise Consent
                        </Button>
                      </ConsentCustomizationDialog>
                    </div>
                    <Button
                      size="sm"
                      onClick={acceptAll}
                      onKeyUp={(e) => e.key === "Enter" && acceptAll()}
                      onKeyDown={(e) => e.key === "Enter" && acceptAll()}
                      className="w-full sm:w-auto"
                    >
                      Accept All
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.dialog>
          </>
        )}
      </AnimatePresence>
    );

    return isMounted && createPortal(<BannerContent />, document.body);
  }
);
