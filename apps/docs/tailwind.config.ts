import { config } from "@koroflow/tailwind-config/config";
import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const fumadocs = createPreset({
	preset: "vitepress",
});

const tailwindConfig: Config = {
	...config,
	content: [
		// Shadcn UI
		"./node_modules/@koroflow/shadcn-ui/components/**/*.{ts,tsx}",
		"./node_modules/@koroflow/shadcn-ui/lib/**/*.{ts,tsx}",
		"./node_modules/@koroflow/shadcn-ui/index.tsx",

		// App
		"./components/**/*.{ts,tsx}",
		"./lib/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./providers/**/*.{ts,tsx}",
		"./content/**/*.mdx",

		// Fumadocs UI
		"./node_modules/fumadocs-ui/dist/**/*.js",

		// Repo packages
		"./node_modules/@koroflow/*/index.tsx",
	],
	presets: [fumadocs],
};

export default tailwindConfig;
