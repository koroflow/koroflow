import { cn } from '@koroflow/shadcn/libs';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Installer } from '~/components/docs/installer';
import { PoweredBy } from '~/components/docs/powered-by';
import { Preview } from '~/components/docs/preview';
import { releaseNotesSource } from '~/lib/source';

const components = {
	...defaultMdxComponents,
	Tabs,
	Tab,
	Installer,
	Preview,
	PoweredBy,
};

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = releaseNotesSource.getPage(params.slug);

	if (!page) {
		notFound();
	}

	const MDX = page.data.body;

	return (
		// <div className="relative z-10 grid xl:grid-cols-[1fr_268px]">
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{ style: 'clerk' }}
		>
			<DocsTitle className="tracking-tighter lg:text-4xl">
				{page.data.title}
			</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody
				className={cn(
					// 'prose-h2:tracking-tighter',
					// 'prose-a:border-fd-primary prose-a:border-b-px prose-a:font-semibold prose-a:text-foreground prose-a:decoration-none prose-a:transition-all hover:prose-a:border-b-2'
				)}
			>
				<MDX components={{ ...components }} />
			</DocsBody>
		</DocsPage>
		// </div>
	);
}

export const generateStaticParams = async () =>
	releaseNotesSource.generateParams();

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
	const params = await props.params;
	const page = releaseNotesSource.getPage(params.slug);

	if (!page) {
		notFound();
	}

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			title: page.data.title,
			description: page.data.description,
			type: 'website',
			images: [
				{
					url: `/og?slug=${params.slug?.join('/') ?? ''}`,
					width: 1200,
					height: 630,
				},
			],
		},
	};
}
