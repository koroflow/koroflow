import type { ReactNode } from 'react';
import { privacyRegulationsSource } from '~/lib/source';
import { SharedDocsLayout } from '../../_components/shared-docs-layout';

/**
 * Layout component that wraps all documentation pages.
 * Provides consistent navigation, sidebar and structure across doc pages.
 *
 * @param props - The component props
 * @param props.children - The page content to be wrapped by the layout
 * @returns The rendered layout with navigation and child content
 */
export default function Layout({
	children,
}: {
	children: ReactNode;
}) {
	// For doc pages, use SharedDocsLayout which includes DocsLayout
	return (
		<SharedDocsLayout source={privacyRegulationsSource}>
			{children}
		</SharedDocsLayout>
	);
}
