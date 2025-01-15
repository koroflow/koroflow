/**
 * Enumerates all possible consent types that can be managed within the application.
 * These consent types are used to categorize and manage user consents for various data processing activities.
 */
export type AllConsentNames =
  | "experience"
  | "functionality"
  | "marketing"
  | "measurement"
  | "necessary";

/**
 * Defines the structure for each type of consent that can be managed.
 * 
 * @remarks
 * - `defaultValue`: Indicates the default state of the consent (true if consent is given by default).
 * - `description`: Provides a detailed explanation of what the consent entails.
 * - `disabled`: (Optional) Specifies if the consent type is disabled and cannot be changed by the user.
 * - `display`: Determines if the consent type should be displayed to the user.
 * - `gdprType`: A numeric identifier for the consent type, often used for GDPR categorization.
 * - `name`: The name of the consent type, which must be one of the predefined `AllConsentNames`.
 */
export type ConsentType = {
  defaultValue: boolean;
  description: string;
  disabled?: boolean;
  display: boolean;
  gdprType: number;
  name: AllConsentNames;
};

/**
 * An array of `ConsentType` objects, each representing a specific type of consent that can be managed.
 * 
 * @remarks
 * This array can be extended to include additional consent types as needed. Ensure that any additions align with your privacy policy and applicable laws.
 */
export const consentTypes: ConsentType[] = [
  {
    defaultValue: true,
    description:
      "These trackers are used for activities that are strictly necessary to operate or deliver the service you requested from us and, therefore, do not require you to consent.",
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
      "These trackers help us to improve the quality of your user experience and enable interactions with external content, networks, and platforms.",
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
];