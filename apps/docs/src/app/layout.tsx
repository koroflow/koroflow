import './global.css';
import { cn } from '@consent-management/shadcn/libs';
import { RootProvider } from 'fumadocs-ui/provider';
import { Fira_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '@consent-management/react/globals.css';
import {
	ConsentManagerDialog,
	ConsentManagerProvider,
	CookieBanner,
} from '@consent-management/react';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const firaMono = Fira_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-fira-mono',
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={cn(inter.variable, firaMono.variable)}
			suppressHydrationWarning
		>
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
