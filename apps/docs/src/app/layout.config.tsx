import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { GithubIcon } from '~/components/icons/github';
import { XIcon } from '~/components/icons/x';
import logo from '../../public/logo.svg';

import {
	Book,
	Cookie,
	MessageSquare,
	MessageSquareCode,
	Palette,
} from 'lucide-react';
import GetStarted from '../../public/cookie-banner.png';

export const linkItems: LinkItemType[] = [
	{
		type: 'icon',
		url: 'https://github.com/koroflow/consent-management',
		text: 'Github',
		icon: <GithubIcon className="h-5 w-5" />,
		external: true,
	},
	{
		type: 'icon',
		url: 'https://x.com/koroflow',
		text: 'X',
		icon: <XIcon className="h-5 w-5" />,
		external: true,
	},
];

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const docsOptions: BaseLayoutProps = {
	nav: {
		title: (
			<>
				<Image
					src={logo}
					alt="Koroflow"
					width={93}
					height={16}
					className="h-4 w-auto dark:invert"
				/>
				<span className="inline-flex items-center rounded-full border bg-fd-primary/10 px-2.5 py-0.5 font-semibold text-fd-primary text-xs">
					Beta
				</span>
			</>
		),
		// transparentMode: 'top',
		component: undefined,
	},
	links: [...linkItems],
};

export const homePageOptions: BaseLayoutProps = {
	nav: {
		title: (
			<>
				<Image
					src={logo}
					alt="Koroflow"
					width={93}
					height={16}
					className="h-4 w-auto dark:invert"
				/>
				<span className="inline-flex items-center rounded-full border bg-fd-primary/10 px-2.5 py-0.5 font-semibold text-fd-primary text-xs">
					Beta
				</span>
			</>
		),
		transparentMode: 'top',
	},
	links: [
		{
			type: 'menu',
			text: 'Documentation',
			url: '/docs/react',
			items: [
				{
					menu: {
						banner: (
							<div className="-mx-3 -mt-3">
								<Image
									src={GetStarted}
									alt="Perview"
									className="rounded-t-lg object-cover"
									style={{
										maskImage:
											'linear-gradient(to bottom,white 60%,transparent)',
									}}
								/>
							</div>
						),
						className: 'md:row-span-2',
					},
					icon: <Book />,
					text: 'Getting Started',
					description:
						'Our plug-and-play components handle compliance so you can focus on your product',
					url: '/docs/react',
				},
				{
					icon: <Cookie />,
					text: 'Cookie Banner',
					description:
						'A customizable cookie consent banner that handles privacy compliance with zero configuration required.',
					url: '/docs/frameowkr/react/cookie-banner',
					menu: {
						className: 'lg:col-start-2',
					},
				},

				{
					icon: <MessageSquare />,
					text: 'Consent Dialog',
					description:
						'An accessible, animated modal interface that wraps the Consent Manager Widget for a focused privacy customization experience.',
					url: '/docs/frameowkr/react/consent-manager-dialog',
					menu: {
						className: 'lg:col-start-2',
					},
				},
				{
					icon: <MessageSquareCode />,
					text: 'Consent Widget',
					description:
						'A flexible, composable widget for building custom privacy consent interfaces.',
					url: '/docs/frameowkr/react/consent-manager-widget',
					menu: {
						className: 'lg:col-start-3 lg:row-start-1',
					},
				},
				{
					icon: <Palette />,
					text: 'Styling',
					description:
						'Learn how to customize the appearance of @consent-management/react components through our flexible theming system.',
					url: '/docs/frameowkr/react/guides/customization',
					menu: {
						className: 'lg:col-start-3',
					},
				},
			],
		},
	],
};
