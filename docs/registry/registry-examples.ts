import { Registry } from "@/registry/schema";

export const examples: Registry["items"] = [
  {
    name: "privacy-popup-demo",
    type: "registry:example",
    registryDependencies: ["privacy-popup"],
    dependencies: ["@koroflow/core-react"],
    files: [
      {
        path: "examples/privacy-popup-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "privacy-popup-minimal-demo",
    type: "registry:example",
    registryDependencies: ["privacy-popup"],
    dependencies: ["@koroflow/core-react"],
    files: [
      {
        path: "examples/privacy-popup-minimal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "privacy-popup-callback-demo",
    type: "registry:example",
    registryDependencies: ["privacy-popup"],
    dependencies: ["@koroflow/core-react"],
    files: [
      {
        path: "examples/privacy-popup-callback-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
