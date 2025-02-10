import './global.css';
import { cn } from '@koroflow/shadcn/libs';
import { RootProvider } from 'fumadocs-ui/provider';
import { Fira_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '@koroflow/elements/globals.css';
import {
	ConsentManagerDialog,
	ConsentManagerProvider,
	CookieBanner,
} from '@koroflow/elements';

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
					<ConsentManagerProvider
						initialGdprTypes={['necessary', 'marketing']}
						translationConfig={{
							translations: {
								en: {
									cookieBanner: {
										title: 'We hate ur privacy',
									},
								},
								de: {
									cookieBanner: {
										title: 'Wir legen Wert auf Ihre Privatsphäre',
									},
								},
							},
						}}
					>
						<CookieBanner />
						<ConsentManagerDialog />
						{children}
					</ConsentManagerProvider>
				</RootProvider>
			</body>
		</html>
	);
}
