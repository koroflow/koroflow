import PrivacyPopup from "@/registry/default/components/consent/privacy-popup";
import { PrivacyConsentProvider, usePrivacyConsent } from "@koroflow/core-react";
import { useEffect } from "react";

export default function PrivacyPopupMinimalDemo() {
  return (
    <PrivacyConsentProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
    >
      <ConsentCallbacks />
    </PrivacyConsentProvider>
  );
}

function ConsentCallbacks() {
  const { setCallback } = usePrivacyConsent()
 
  useEffect(() => {
    setCallback("onBannerShown", () => {
      console.log("Banner displayed")
    })
 
    setCallback("onConsentGiven", () => {
      console.log("User gave consent")
    })
 
    setCallback("onConsentRejected", () => {
      console.log("User rejected consent")
    })
 
    setCallback("onBannerClosed", () => {
      console.log("Banner closed")
    })
  }, [setCallback])
 
  return       <PrivacyPopup />
}