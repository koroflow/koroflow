import { defineConfig } from "tsup";
import { runAfterLast } from "./shared.mjs";

/**
 * Creates a tsup configuration for React packages with tailwind support
 * @param {CreateConfigOptions} options - Configuration options
 * @param {string} options.name - Package name
 * @param {string} options.version - Package version
 * @param {string} [options.tailwindConfigPath] - Optional path to tailwind config
 * @param {Partial<Options>} [options.additionalOptions={}] - Additional tsup options
 * @param {(false|string)[]} [options.postBuildCommands=["pnpm run build:declarations"]] - Post-build commands
 * @returns {ReturnType<typeof defineConfig>} Tsup configuration
 *
 * @example
 * ```ts
 * // tsup.config.ts
 * import { createConfig } from "@koroflow/tsup-config/react";
 * import { name, version } from "./package.json";
 *
 * export default createConfig({
 *   name,
 *   version,
 *   // Optional overrides
 *   tailwindConfigPath: "./src/tailwind.config.ts",
 *   postBuildCommands: ["pnpm run build:declarations"]
 * });
 * ```
 */
export const createConfig = ({
	name,
	version,
	additionalOptions = {},
	postBuildCommands = ["pnpm run build:declarations"],
}) => {
	return defineConfig((overrideOptions) => {
		const isProd = overrideOptions.env?.NODE_ENV === "production";

		const common = {
			name,
			entry: ["./src/**/*.{ts,tsx,js,jsx}", "!./src/**/*.{spec,test}.{ts,tsx}"],
			bundle: false,
			clean: true,
			minify: false,
			sourcemap: true,
			legacyOutput: true,
			define: {
				PACKAGE_NAME: `"${name}"`,
				PACKAGE_VERSION: `"${version}"`,
				__DEV__: `${!isProd}`,
			},
			...additionalOptions,
		};

		const esm = {
			...common,
			format: "esm",
		};

		const cjs = {
			...common,
			format: "cjs",
			outDir: "./dist/cjs",
		};

		return runAfterLast(postBuildCommands)(esm, cjs);
	});
};
