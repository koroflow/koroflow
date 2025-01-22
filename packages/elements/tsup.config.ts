import fs from "node:fs";
import path from "node:path";
import { generateStylesheet, transform } from "@koroflow/tailwindcss-transformer";
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

const tailwindcssTransformerCode = {
	name: "tailwindcss-transformer-code",
	setup(build) {
		const outDir = path.join(process.cwd(), build.initialOptions.outdir);
		const styleCache = new Map();
		build.onLoad({ filter: /.*/ }, async (args) => {
			const code = await fs.promises.readFile(args.path, "utf8");
			const transformedCode = transform(code, { styleCache });
			return {
				contents: transformedCode,
				resolveDir: path.dirname(args.path),
				loader: "tsx",
			};
		});

		build.onEnd(async () => {
			const styleSheet = await generateStylesheet(styleCache, {
				tailwindConfig: path.join(process.cwd(), "src", "tailwind.config.ts"),
			});
			await fs.promises.mkdir(outDir, { recursive: true });
			await fs.promises.writeFile(path.join(outDir, "styles.css"), styleSheet);
		});
	},
};

export default defineConfig((overrideOptions) => {
	const isProd = overrideOptions.env?.NODE_ENV === "production";

	const common: Options = {
		name: "⚛️ core/react",
		entry: ["./src/**/*.{ts,tsx,js,jsx}", "!./src/**/*.{spec,test}.{ts,tsx}"],
		// We want to preserve original file structure
		// so that the "use client" directives are not lost
		// and make debugging easier via node_modules easier
		bundle: false,
		clean: true,
		minify: false,
		sourcemap: true,
		legacyOutput: true,
		esbuildPlugins: [tailwindcssTransformerCode],

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
