import { config } from "@koroflow/tailwind-config/config";
import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const fumadocs = createPreset({
	preset: "vitepress",
});

const tailwindConfig: Config = {
	...config,
	content: [
		// App
		"./src/**/*.{ts,tsx,mdx}",

		// Fumadocs UI
		"./node_modules/fumadocs-ui/dist/**/*.js",

		// Repo packages
		"./node_modules/@koroflow/shadcn/dist/**/*.js",
	],
	presets: [fumadocs],
};

export default tailwindConfig;
