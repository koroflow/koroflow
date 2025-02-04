import {
	defineCollections,
	defineConfig,
	defineDocs,
} from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
	dir: ['src/content/docs'],
});

// export const releaseNotes = defineDocs({
// 	dir: ['src/content/release-notes'],
// });

export const releaseNotes = defineCollections({
	type: 'doc',
	dir: 'src/content/release-notes',
	// add required frontmatter properties
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.string().date().or(z.date()),
	// }),
});

export default defineConfig();
