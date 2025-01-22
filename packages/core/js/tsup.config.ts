import { createConfig } from "@koroflow/tsup-config/react";
import { name, version } from "./package.json";

export default createConfig({
	name,
	version,
	disableTailwind: true,
	// Optional: override tailwind config path
	// tailwindConfigPath: path.join(__dirname, "src", "tailwind.config.ts"),
	// Optional: add additional tsup options
	// additionalOptions: { /* ... */ },
	// Optional: override post-build commands
	// postBuildCommands: ["pnpm run build:declarations", "custom-command"],
});
