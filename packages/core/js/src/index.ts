// Re-export store
export { store } from "./store";
export type {PrivacyConsentState} from "./store.type";
// Re-export all utilities
export * from "./libs/consent-utils";

// Re-export types and constants
export { consentTypes } from "./types";
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
} from "./types";