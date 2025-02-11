import { createFromSource } from 'fumadocs-core/search/server';
import {
	frameworkSource,
	gettingStartedSource,
	releaseNotesSource,
} from '~/lib/source';

export const { GET } = createFromSource({
	...gettingStartedSource,
	...frameworkSource,
	...releaseNotesSource,
});
