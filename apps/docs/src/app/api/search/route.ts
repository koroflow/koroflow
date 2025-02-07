import { createFromSource } from 'fumadocs-core/search/server';
import {
	frameworkSource,
	privacyRegulationsSource,
	releaseNotesSource,
	source,
} from '~/lib/source';

export const { GET } = createFromSource({
	...source,
	...frameworkSource,
	...privacyRegulationsSource,
	...releaseNotesSource,
});
