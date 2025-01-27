import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
	dir: "src/content/docs",
});

export default defineConfig();
