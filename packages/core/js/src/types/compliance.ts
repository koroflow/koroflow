import { AllConsentNames } from "./gdpr";

/**
 * Represents the state of consents for different types of data processing.
 * Each key is a consent type, and the value is a boolean indicating whether consent has been given.
 */
export type ConsentState = Record<AllConsentNames, boolean>;

/**
 * Enumerates the different compliance regions that the application may need to adhere to.
 * These regions dictate the privacy regulations that apply to the user's data.
 */
export type ComplianceRegion = 'gdpr' | 'ccpa' | 'lgpd' | 'usStatePrivacy';

/**
 * Defines the settings related to compliance with privacy regulations.
 * 
 * @property enabled - Indicates if the compliance regulation is active.
 * @property appliesGlobally - Determines if the regulation applies globally.
 * @property applies - Specifies if the regulation applies to the current context.
 */
export type ComplianceSettings = {
  enabled: boolean;
  appliesGlobally: boolean;
  applies: boolean | undefined;
};

/**
 * Contains settings related to user privacy preferences.
 * 
 * @property honorDoNotTrack - Indicates whether the application should respect the user's Do Not Track setting.
 */
export type PrivacySettings = {
  honorDoNotTrack: boolean;
};

/**
 * Represents the information about a user's consent action.
 * 
 * @property time - The timestamp when the consent was given.
 * @property type - The type of consent given, which can be 'all', 'custom', or 'necessary'.
 * This type can also be `null` if no consent information is available.
 */
export type HasConsentedProps = {
  time: number; 
  type: 'all' | 'custom' | 'necessary';
} | null;