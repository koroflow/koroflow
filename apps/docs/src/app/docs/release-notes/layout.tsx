import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { docsOptions } from '~/app/layout.config';
import ArticleLayout from '~/components/docs/side-bar';
import { releaseNotesSource } from '~/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			tree={releaseNotesSource.pageTree}
			{...docsOptions}
			sidebar={{
				component: <ArticleLayout tree={releaseNotesSource.pageTree} />,
			}}
		>
			{children}
		</DocsLayout>
	);
}
