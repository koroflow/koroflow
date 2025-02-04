import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { docsOptions } from '~/app/layout.config';
import ArticleLayout from '~/components/docs/side-bar';
import { privacyRegulationsSource } from '~/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			tree={privacyRegulationsSource.pageTree}
			{...docsOptions}
			sidebar={{
				component: <ArticleLayout tree={privacyRegulationsSource.pageTree} />,
			}}
		>
			{children}
		</DocsLayout>
	);
}
