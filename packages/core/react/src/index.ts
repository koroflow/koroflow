// src/index.ts
export {
  ConsentManagerProvider,

} from "./privacy-consent-widget";
export { useConsentManager } from "./hooks/use-consent-manager";

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