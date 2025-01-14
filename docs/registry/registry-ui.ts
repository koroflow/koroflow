import { Registry } from "@/registry/schema";

export const ui: Registry["items"] = [
  {
    name: "cookie-consent-modal",
    type: "registry:ui",
    registryDependencies: [
      "button",
      "accordion",
      "dialog",
      "form",
      "switch",
      "cookie-popup",
      "gdpr-consent",
      "use-cookie-consent",
      "utils",
    ],
    files: [
      {
        path: "components/cookie-consent-modal.tsx",
        type: "registry:page",
      },
    ],
  },
  {
    name: "cookie-popup",
    type: "registry:ui",
    files: [
      {
        path: "components/cookie-popup.tsx",
        type: "registry:page",
      },
    ],
  },
];
