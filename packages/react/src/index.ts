// src/index.ts
export { usePrivacyConsentStore } from "./store/privacy-consent-store";

export type {
  ConsentInfo,
  PrivacyConsentState,
} from "./store/privacy-consent-store";

export type {
  allConsentNames,
  ConsentState,
  consentType,
  ComplianceRegion,
  ComplianceSettings,
  Callbacks,
} from "./types/privacy";

export {
  PrivacyConsentProvider,
  usePrivacyConsent,
} from "./context/privacy-consent-widget";
