/**
 * privacy.ts
 * 
 * This file contains type definitions and constants related to privacy consents and compliance.
 * These types are used throughout the application to ensure consistency in handling consent and compliance data.
 * 
 * Key definitions:
 * - Consent types (necessary, marketing, analytics, etc.)
 * - Compliance regions (GDPR, CCPA, LGPD, etc.)
 * - Callback function types for various consent-related events
 * 
 * Understanding these types is crucial for properly implementing and extending the consent management system.
 */

export type allConsentNames =
  | "experience"
  | "functionality"
  | "marketing"
  | "measurement"
  | "necessary"
  | "ad_user_data"
  | "ad_personalization";

/**
 * consentType
 * 
 * This interface defines the structure for each type of consent that can be managed.
 * It includes properties like default value, description, and whether it's required by GDPR.
 */
export type consentType = {
  defaultValue: boolean;
  description: string;
  disabled?: boolean;
  display: boolean;
  gdprType: number;
  name: allConsentNames;
};

/**
 * consentTypes
 * 
 * Defines the different types of consents that can be managed.
 * Each consent type has properties like default value, description, and GDPR type.
 * 
 * Note: This array can be extended to include additional consent types as needed.
 * Ensure that any additions align with your privacy policy and applicable laws.
 */
export const consentTypes: consentType[] = [
  {
    defaultValue: true,
    description:
      "These trackers are used for activities that are strictly necessary to operate or deliver the service you requested from us and, therefore, do not require you to consent",
    disabled: true,
    display: true,
    gdprType: 1,
    name: "necessary",
  },
  {
    defaultValue: false,
    description:
      "These trackers enable basic interactions and functionalities that allow you to access selected features of our service and facilitate your communication with us.",
    display: false,
    gdprType: 2,
    name: "functionality",
  },
  {
    defaultValue: false,
    description:
      "These trackers help us to measure traffic and analyze your behavior to improve our service.",
    display: false,
    gdprType: 4,
    name: "measurement",
  },
  {
    defaultValue: false,
    description:
      "These trackers help us to improve the quality of your user experience and enable interactions with external content, networks and platforms",
    display: false,
    gdprType: 3,
    name: "experience",
  },
  {
    defaultValue: false,
    description:
      "These trackers help us to deliver personalized ads or marketing content to you, and to measure their performance.",
    display: false,
    gdprType: 5,
    name: "marketing",
  },
  {
    defaultValue: false,
    description: "This consent allows us to use your data for advertising purposes.",
    display: true,
    gdprType: 6,
    name: "ad_user_data",
  },
  {
    defaultValue: false,
    description: "This consent allows us to show you personalized ads based on your browsing behavior.",
    display: true,
    gdprType: 7,
    name: "ad_personalization",
  },
];

export type ConsentState = Record<allConsentNames, boolean>

export type ComplianceRegion = 'gdpr' | 'ccpa' | 'lgpd' | 'usStatePrivacy';

/**
 * ComplianceSettings
 * 
 * This interface defines the structure for compliance settings related to different privacy regulations.
 * It includes properties to determine if a regulation is enabled, if it applies globally, and its specific applicability.
 */
export interface ComplianceSettings {
  enabled: boolean;
  appliesGlobally: boolean;
  applies: boolean | undefined;
}

export type CallbackFunction = () => void;

/**
 * Callbacks
 * 
 * This interface defines the structure for callback functions that can be set to respond to various consent-related events.
 * These callbacks allow for custom actions to be performed at different stages of the consent management process.
 */
export interface Callbacks {
  onReady?: CallbackFunction;
  onBannerShown?: CallbackFunction;
  onBannerClosed?: CallbackFunction;
  onConsentGiven?: CallbackFunction;
  onConsentRejected?: CallbackFunction;
  onPreferenceExpressed?: CallbackFunction;
  onError?: (error: string) => void;
}

export interface PrivacySettings {
  honorDoNotTrack: boolean;
}

