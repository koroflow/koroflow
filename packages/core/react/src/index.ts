// src/index.ts
export {
  PrivacyConsentProvider,
  usePrivacyConsent,
} from "./privacy-consent-widget";

// Re-export types and constants
export { consentTypes } from "@koroflow/core-js";
export type {
  CallbackFunction,
  Callbacks,
  AllConsentNames,
  ConsentType,
  ConsentState,
  ComplianceRegion,
  ComplianceSettings,
  PrivacySettings,
  HasConsentedProps,
} from "@koroflow/core-js";