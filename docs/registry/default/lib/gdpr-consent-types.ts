export type consentType = {
  defaultValue: boolean;
  description: string;
  disabled?: boolean;
  display: boolean;
  gdprType: number;
  name: allConsentNames;
};

export type allConsentNames =
  | "experience"
  | "functionality"
  | "marketing"
  | "measurement"
  | "necessary";

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
];
