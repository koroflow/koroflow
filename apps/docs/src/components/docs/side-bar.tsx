'use client';

import type { PageTree } from 'fumadocs-core/server';

import {
	Sidebar,
	SidebarPageTree,
	SidebarViewport,
} from 'fumadocs-ui/layouts/docs/sidebar';

export default function ArticleLayout({ tree }: { tree: PageTree.Root }) {
	return (
		<Sidebar className="fixed top-[calc(var(--fd-banner-height)+var(--fd-nav-height))] z-30 md:sticky md:h-[var(--fd-sidebar-height)] md:ps-[var(--fd-layout-offset)]">
			<SidebarViewport>
				<SidebarPageTree />
			</SidebarViewport>
		</Sidebar>
	);
}
