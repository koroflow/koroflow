import { type Options, defineConfig } from "tsup";
import { name, version } from "./package.json";

export const runAfterLast =
	(commands: (false | string)[]) =>
	(...configs: Options[]) => {
		const [last, ...rest] = configs.reverse();
		return [
			...rest.reverse(),
			{
				...last,
				onSuccess: [last.onSuccess, ...commands].filter(Boolean).join(" && "),
			},
		];
	};

export default defineConfig((overrideOptions) => {
	const isProd = overrideOptions.env?.NODE_ENV === "production";

	const common: Options = {
		name: "⚛️ elements",
		entry: ["./src/**/*.{ts,tsx,js,jsx}", "!./src/**/*.{spec,test}.{ts,tsx}"],
		// We want to preserve original file structure
		// so that the "use client" directives are not lost
		// and make debugging easier via node_modules easier
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
	};

	const esm: Options = {
		...common,
		format: "esm",
	};

	const cjs: Options = {
		...common,
		format: "cjs",
		outDir: "./dist/cjs",
	};

	// take src/tailwind.css and build it into dist/tailwind.css
	return runAfterLast(["pnpm run build:declarations"])(esm, cjs);
});
