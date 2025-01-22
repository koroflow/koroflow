import { Icons } from "@/components/icons";

import { ActivityIcon, BoxIcon, GlobeIcon, ServerIcon, SparklesIcon, ZapIcon } from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
	hero: {
		cta: "Get Started",
		ctaDescription: "Open Source",
		description:
			"An open-source privacy infrastructure that unifies analytics, consent tracking, and privacy controls into a performant solution. Built for modern development teams who prioritize both user privacy and developer experience.",
		title: "Koroflow",
		subtitle: "Privacy Infrastructure for Developers",
	},
	keywords: [
		"Privacy Infrastructure",
		"Consent Management",
		"Analytics",
		"GDPR Compliance",
		"Developer Tools",
		"Privacy Controls",
	],
	cta: "Get Started",
	secondaryCta: "View on GitHub",
	description:
		"Transform privacy consent from a compliance checkbox into a fully observable system",
	features: [
		{
			name: "Privacy-First Architecture",
			description:
				"Server-side relay system with built-in privacy controls, eliminating client-side bloat and tracking issues.",
			icon: <ServerIcon className="h-6 w-6" />,
			highlight: "Zero third-party scripts",
		},
		{
			name: "Modern Consent Management",
			description:
				"Beautiful, customizable consent UI built with shadcn/ui. Full support for GDPR, CCPA, and emerging privacy regulations.",
			icon: <SparklesIcon className="h-6 w-6" />,
			highlight: "Automatic compliance",
		},
		{
			name: "Developer Experience",
			description:
				"TypeScript-first with full type safety. Clean APIs that feel natural to use. Comprehensive documentation and examples.",
			icon: <BoxIcon className="h-6 w-6" />,
			highlight: "Type-safe APIs",
		},
		{
			name: "Universal Analytics",
			description:
				"Route events to multiple destinations through a single, privacy-aware API. Built-in support for popular analytics platforms.",
			icon: <ActivityIcon className="h-6 w-6" />,
			highlight: "Single source of truth",
		},
		{
			name: "Performance Focused",
			description:
				"Minimal bundle impact with efficient batching and processing. No impact on Core Web Vitals or page load times.",
			icon: <ZapIcon className="h-6 w-6" />,
			highlight: "Zero performance cost",
		},
		{
			name: "Complete Observability",
			description:
				"Full visibility into your privacy and consent infrastructure. Monitor compliance, track consent changes, and analyze patterns.",
			icon: <GlobeIcon className="h-6 w-6" />,
			highlight: "Real-time monitoring",
		},
	],
	testimonials: [
		{
			quote: "Finally, a privacy solution that puts developer experience first.",
			author: "Jane Developer",
			role: "Senior Engineer",
			company: "Tech Co",
		},
	],
	stats: {
		bundle: "~5kb",
		performance: "Zero Impact",
		satisfaction: "Type Safe",
	},
	footer: {
		bottomText: "All rights reserved.",
		brandText: "Koroflow",
		links: [
			{ text: "Blog", url: "/blog" },
			{ text: "Docs", url: "/docs" },
		],
		socialLinks: [
			{
				icon: <Icons.x className="h-5 w-5" />,
				url: "https://x.com/burnedchris",
			},
			{
				icon: <Icons.bluesky className="h-5 w-5" />,
				url: "https://bsky.app/profile/burnedchris.com",
			},
			{
				icon: <Icons.github className="h-5 w-5" />,
				url: "https://github.com/koroflow/koroflow",
			},
		],
	},
	links: {
		github: "https://github.com/koroflow/koroflow",
		twitter: "https://x.com/burnedchris",
	},
	name: "Koroflow",
	url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;
