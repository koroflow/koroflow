import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
	configPath: "./source.config.ts",
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
};

export default withMDX(config);
