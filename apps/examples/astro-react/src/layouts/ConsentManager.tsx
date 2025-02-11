import {
	ConsentManagerDialog,
	ConsentManagerProvider,
	CookieBanner,
} from '@consent-management/react';
import type { ReactNode } from 'react';

export const ConsentManagerLayout = ({ children }: { children: ReactNode }) => {
	return (
		<ConsentManagerProvider initialGdprTypes={['necessary', 'marketing']}>
			{children}
			<CookieBanner />
			<ConsentManagerDialog />
		</ConsentManagerProvider>
	);
};
