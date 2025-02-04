import { createFromSource } from 'fumadocs-core/search/server';
import {
	componentsSource,
	privacyRegulationsSource,
	releaseNotesSource,
	source,
} from '~/lib/source';

export const { GET } = createFromSource({
	...source,
	...componentsSource,
	...privacyRegulationsSource,
	...releaseNotesSource,
});
