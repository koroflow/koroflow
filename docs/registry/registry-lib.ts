import { Registry } from "@/registry/schema";

export const lib: Registry["items"] = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "gdpr-consent-types",
    type: "registry:lib",
    files: [
      {
        path: "lib/gdpr-consent-types.ts",
        type: "registry:lib",
      },
    ],
  },
];
