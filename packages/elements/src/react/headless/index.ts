export { ConsentManagerProvider } from "./store/consent-manager";
export { useConsentManager } from "./store/use-consent-manager";

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
