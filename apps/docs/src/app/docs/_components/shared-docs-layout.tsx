import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
	Sidebar,
	SidebarPageTree,
	SidebarViewport,
} from 'fumadocs-ui/layouts/docs/sidebar';
import type { ReactNode } from 'react';
import { docsOptions } from '~/app/layout.config';
import type { source } from '~/lib/source';

/**
 * Props for the SharedDocsLayout component
 *
 * @interface SharedDocsLayoutProps
 * @property {ReactNode} children - The content to be rendered within the layout
 * @property {Source} source - The documentation source containing page tree and content
 */
interface SharedDocsLayoutProps {
	children: ReactNode;
	source: typeof source;
}

/**
 * A shared layout component for documentation pages that provides consistent structure
 * and navigation across different documentation sections.
 *
 * @component
 * @param {SharedDocsLayoutProps} props - The component props
 * @param {ReactNode} props.children - The content to be rendered within the layout
 * @param {Source} props.source - The documentation source containing page tree and content
 * @returns {JSX.Element} The rendered layout with navigation and content
 *
 * @example
 * ```tsx
 * <SharedDocsLayout source={myDocsSource}>
 *   <MyDocContent />
 * </SharedDocsLayout>
 * ```
 */
export function SharedDocsLayout({ children, source }: SharedDocsLayoutProps) {
	return (
		<DocsLayout
			tree={source.pageTree}
			{...docsOptions}
			sidebar={{
				component: (
					<Sidebar
						aria-label="Documentation navigation"
						className="fixed top-[calc(var(--fd-banner-height)+var(--fd-nav-height))] z-30 md:sticky md:h-[var(--fd-sidebar-height)] md:ps-[var(--fd-layout-offset)]"
					>
						<SidebarViewport>
							<SidebarPageTree />
						</SidebarViewport>
					</Sidebar>
				),
			}}
		>
			{children}
		</DocsLayout>
	);
}
