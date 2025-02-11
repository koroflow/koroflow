import type { ReactNode } from 'react';
import { gettingStartedSource } from '~/lib/source';
import { SharedDocsLayout } from '../_components/shared-docs-layout';

/**
 * Layout component that wraps all documentation pages.
 * Provides consistent navigation, sidebar and structure across doc pages.
 *
 * @param props - The component props
 * @param props.children - The page content to be wrapped by the layout
 * @returns The rendered layout with navigation and child content
 */
export default function Layout({ children }: { children: ReactNode }) {
	return (
		<SharedDocsLayout source={gettingStartedSource}>
			{children}
		</SharedDocsLayout>
	);
}
