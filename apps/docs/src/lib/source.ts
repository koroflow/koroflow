import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { docs, meta, releaseNotes } from '../../.source';

export const source = loader({
	baseUrl: '/docs',
	source: createMDXSource(docs, meta),
});

export const releaseNotesSource = loader({
	baseUrl: '/release-notes',
	source: createMDXSource(releaseNotes),
});
