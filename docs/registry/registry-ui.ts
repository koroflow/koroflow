import { Registry } from "@/registry/schema";

export const ui: Registry["items"] = [
  {
    name: "consent-solution",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["@koroflow/core-react"],
    files: [
      {
        path: "components/consent/cookie-banner.tsx",
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
