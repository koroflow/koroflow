import { describe, expect, it } from "vitest";
import { generateStylesheet, transform } from "../index";

describe("generateStylesheet", () => {
	it("should transform className with cn and generate correct stylesheet", async () => {
		const styleCache = new Map();
		transform(
			`const Button: React.FC<ButtonProps> = ({ children, className }) => {
      return <button className={cn('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}>{children}</button>
    }`,
			{
				styleCache,
			},
		);
		const styleSheet = await generateStylesheet(styleCache, {
			tailwindConfig: {
				corePlugins: {
					preflight: false,
					backgroundOpacity: false,
				},
				content: ["./src/**/*.{js,jsx,ts,tsx}"],
				theme: {
					extend: {
						colors: {
							primary: {
								DEFAULT: "hsl(var(--cl-color-primary))",
								foreground: "hsl(var(--cl-color-primary-foreground))",
							},
						},
					},
				},
			},
			globalCss: `:where(:root) {
    --cl-color-primary: 233 8% 20%;
    --cl-color-primary-foreground: 0 0% 100%;
  }`,
		});
		expect(styleSheet).toMatchSnapshot();
	});
});
