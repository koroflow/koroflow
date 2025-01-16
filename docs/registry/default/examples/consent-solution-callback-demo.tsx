"use client";

import CookieBanner from "@/registry/default/components/consent/cookie-banner";
import {
  ConsentManagerProvider,
  useConsentManager,
} from "@koroflow/core-react";
import { useEffect } from "react";

export default function PrivacyPopupMinimalDemo() {
  return (
    <ConsentManagerProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
      // This namespace is used specifically for demonstration purposes,
      // allowing multiple instances of the consent manager to coexist on the same page.
      // It helps in isolating consent states for different demos or components.
      namespace="CallbackDemo"
    >
      <ConsentCallbacks />
    </ConsentManagerProvider>
  );
}

function ConsentCallbacks() {
  const { setCallback } = useConsentManager();

  useEffect(() => {
    setCallback("onBannerShown", () => {
      console.log("Banner displayed");
    });

    setCallback("onConsentGiven", () => {
      console.log("User gave consent");
    });

    setCallback("onConsentRejected", () => {
      console.log("User rejected consent");
    });

    setCallback("onBannerClosed", () => {
      console.log("Banner closed");
    });
  }, [setCallback]);

  return <CookieBanner />;
}
