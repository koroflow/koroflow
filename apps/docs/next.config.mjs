import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
	configPath: "./source.config.ts",
});

/** @type {import('next').NextConfig} */
const config = {
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
		  {
			hostname: 'img.logo.dev',
			protocol: 'https',
		  },
		],
	  },
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/r",
				destination: "/r/index.json",
				permanent: true,
			},
			{
				source: "/r/index",
				destination: "/r/index.json",
				permanent: true,
			},
			{
				source: "/docs/elements",
				destination: "/docs/getting-started",
				permanent: true,
			},
			{
				source: "/r/:name((?!index\\.json|styles/).*)",
				destination: "/r/styles/default/:name.json",
				permanent: true,
				missing: [
					{
						type: "query",
						key: "_redirected",
						value: undefined,
					},
				],
			},
		];
	},
};

export default withMDX(config);
