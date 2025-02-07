import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({
	configPath: './source.config.ts',
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
	// biome-ignore lint/suspicious/useAwait: <explanation>
	async redirects() {
		return [
			{
				source: '/discord',
				destination: 'https://discord.gg/3NbHyKB94u',
				permanent: true,
			},
			{
				source: '/docs/framework/react/consent-solution',
				destination: '/docs/framework/react/index',
				permanent: true,
			},
		];
	},
};

export default withMDX(config);
