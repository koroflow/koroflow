// src/index.ts
export { ConsentManagerProvider } from "./consent-manager";
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

export * as CookieBanner from "./components/cookie-banner";
export {ConsentCustomizationDialog} from './components/old/consent-customization-dialog'