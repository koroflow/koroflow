export { ConsentManagerProvider } from './store/consent-manager';
export { useConsentManager } from './store/use-consent-manager';

// Re-export types and constants
export { consentTypes } from '@consent-management/core';
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
} from '@consent-management/core';
