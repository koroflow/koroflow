import { Registry } from "@/registry/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-cookie-consent",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-cookie-consent.ts",
        type: "registry:hook",
      },
    ],
  },
];
