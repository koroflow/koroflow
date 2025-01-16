import { Registry } from "@/registry/schema";

export const ui: Registry["items"] = [
  {
    name: "privacy-popup",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@koroflow/core-react"],
    files: [
      {
        path: "components/consent/privacy-popup.tsx",
        type: "registry:ui",
      },
      {
        path: "components/consent/overlay.tsx",
        type: "registry:ui",
      },
      {
        path: "components/consent/consent-customization-modal.tsx",
        type: "registry:ui",
      },
      {
        path: "components/consent/consent-customization-widget.tsx",
        type: "registry:ui",
      },
    ],
  },
];
