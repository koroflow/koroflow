// src/index.ts
export { ConsentManagerProvider } from "./consent-Manager";
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

export { CookieBanner } from "./components/cookie-banner";
export { ConsentCustomizationDialog } from "./components/consent-customization-dialog";
export { ConsentCustomizationWidget } from "./components/consent-customization-widget";
