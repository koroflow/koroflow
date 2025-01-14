import { Registry } from "@/registry/schema";

export const examples: Registry["items"] = [
  {
    name: "cookie-consent-modal-demo",
    type: "registry:example",
    registryDependencies: ["cookie-consent-modal", "cookie-popup"],
    files: [
      {
        path: "example/cookie-consent-modal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "cookie-consent-modal-demo-custom-components",
    type: "registry:example",
    registryDependencies: ["cookie-consent-modal", "cookie-popup"],
    files: [
      {
        path: "example/cookie-consent-modal-demo-custom-components.tsx",
        type: "registry:example",
      },
    ],
  },
];
