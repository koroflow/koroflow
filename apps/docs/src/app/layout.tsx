import './global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '@koroflow/elements/globals.css';
import {
	ConsentManagerDialog,
	ConsentManagerProvider,
	CookieBanner,
} from '@koroflow/elements';

const inter = Inter({
	subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<RootProvider>
					<ConsentManagerProvider initialGdprTypes={['necessary', 'marketing']}>
						<CookieBanner />
						<ConsentManagerDialog />
						{children}
					</ConsentManagerProvider>
				</RootProvider>
			</body>
		</html>
	);
}
