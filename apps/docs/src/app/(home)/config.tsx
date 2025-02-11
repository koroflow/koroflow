import {
	Bolt,
	Brain,
	CodeIcon,
	EyeIcon,
	Server,
	ShieldIcon,
	ZapIcon,
} from 'lucide-react';
import { ReactIcon } from '~/components/icons/react';

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
	name: 'Consent Management',
	description:
		'Transform privacy consent from a compliance checkbox into a fully observable system. Built for modern development teams, c15t unifies analytics, consent tracking, and privacy controls into a single performant solution',
	cta: 'Get Started',
	url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	keywords: [
		'Privacy Management',
		'GDPR Compliance',
		'Consent Management',
		'Privacy Infrastructure',
		'Consent Infrastructure',
	],
	links: {
		email: 'support@c15t.com',
		twitter: 'https://x.com/koroflow',
		github: 'https://github.com/koroflow/consent-management',
	},
	hero: {
		title: 'Consent infrastructure for the modern web',
		description:
			'Transform privacy consent from a compliance checkbox into a fully observable system. Built for developers who care about performance, privacy, and clean code.',
		cta: { text: 'Get Started', href: '/docs/framework/react' },
		demo: {
			text: 'Book A Demo',
			href: 'https://cal.com/christopherburns/koroflow',
		},
	},
	features: [
		{
			name: 'Developer Experience',
			description: 'TypeScript-first APIs that feel natural to use.',
			icon: <CodeIcon className="h-6 w-6" />,
		},
		{
			name: 'React Components',
			description:
				'Beautiful UI components built on Radix Primitives. Ready to go.',
			icon: <ReactIcon className="h-6 w-6" />,
		},
		{
			name: 'Headless Options',
			description: 'No UI, no bloat, just the tools you need.',
			icon: <Brain className="h-6 w-6" />,
		},
		{
			name: 'Performance First',
			description: 'Minimal bundle impact, tree-shakable.',
			icon: <ZapIcon className="h-6 w-6" />,
		},
		{
			name: 'Privacy by Design',
			description: 'Built-in GDPR compliance and privacy best practices.',
			icon: <ShieldIcon className="h-6 w-6" />,
		},
		{
			name: 'Open Source',
			description: 'GNU3 license and open source from day one.',
			icon: <Server className="h-6 w-6" />,
		},
		{
			name: 'Complete Observability',
			comingSoon: true,
			description: 'Track and analyze privacy consent patterns.',
			icon: <EyeIcon className="h-6 w-6" />,
		},
		{
			name: 'Event Relay System',
			comingSoon: true,
			description: 'Real-time privacy event streaming with zero latency.',
			icon: <Bolt className="h-6 w-6" />,
		},
	],
	footer: {
		links: [
			{
				title: 'Product',
				items: [
					{ text: 'Documentation', url: '/docs' },
					{ text: 'Components', url: '/docs/framework/react' },
					{ text: 'Privacy Regulations', url: '/docs/privacy-regulations' },
				],
			},
			{
				title: 'Company',
				items: [
					{
						text: 'GitHub',
						url: 'https://github.com/koroflow/consent-management',
						external: true,
					},
					{ text: 'Twitter', url: 'https://x.com/koroflow', external: true },
					{
						text: 'Contact',
						url: 'mailto:support@c15t.com',
						external: true,
					},
				],
			},
			{
				title: 'Legal',
				items: [
					{ text: 'Privacy Policy', url: '/privacy' },
					{ text: 'Terms of Service', url: '/terms' },
				],
			},
		],
		bottomText: 'Open source privacy infrastructure.',
		brandText: 'KOROFLOW',
	},
};

export type SiteConfig = typeof siteConfig;
