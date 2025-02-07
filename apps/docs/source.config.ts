import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta: docsMeta } = defineDocs({
	dir: ['src/content/docs'],
});

export const { docs: releaseNotes, meta: releaseNotesMeta } = defineDocs({
	dir: 'src/content/release-notes',
});
export const { docs: framework, meta: frameworkMeta } = defineDocs({
	dir: 'src/content/framework',
});

export const { docs: core, meta: coreMeta } = defineDocs({
	dir: 'src/content/core',
});

export const { docs: privacyRegulations, meta: privacyRegulationsMeta } =
	defineDocs({
		dir: 'src/content/privacy-regulations',
	});

export default defineConfig();
