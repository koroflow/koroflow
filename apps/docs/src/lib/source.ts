import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import {
	components,
	componentsMeta,
	docs,
	docsMeta,
	privacyRegulations,
	privacyRegulationsMeta,
	releaseNotes,
	releaseNotesMeta,
} from '../../.source';

export const source = loader({
	baseUrl: '/docs',
	source: createMDXSource(docs, docsMeta),
});

export const releaseNotesSource = loader({
	baseUrl: '/docs/release-notes',
	source: createMDXSource(releaseNotes, releaseNotesMeta),
});

export const componentsSource = loader({
	baseUrl: '/docs/components',
	source: createMDXSource(components, componentsMeta),
});

export const privacyRegulationsSource = loader({
	baseUrl: '/docs/privacy-regulations',
	source: createMDXSource(privacyRegulations, privacyRegulationsMeta),
});
