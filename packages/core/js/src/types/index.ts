// Import and export all types from compliance.ts
import {
  ConsentState,
  ComplianceRegion,
  ComplianceSettings,
  PrivacySettings,
  HasConsentedProps,
} from "./compliance";

export type {
  ConsentState,
  ComplianceRegion,
  ComplianceSettings,
  PrivacySettings,
  HasConsentedProps,
};

// Import and export all types from gdpr.ts
import { AllConsentNames, ConsentType, consentTypes } from "./gdpr";

export { consentTypes };
export type { AllConsentNames, ConsentType };

// Import and export all types from callbacks.ts
import { CallbackFunction, Callbacks } from "./callbacks";

export type { CallbackFunction, Callbacks };
