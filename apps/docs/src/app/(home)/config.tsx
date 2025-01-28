// import { Icons } from "@/components/icons";
import {
	Bolt,
	BoxIcon,
	CodeIcon,
	EyeIcon,
	GaugeIcon,
	Server,
	ShieldIcon,
	ZapIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
	name: "Koroflow",
	description: "Privacy infrastructure for the modern web.",
	cta: "Get Started",
	url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	keywords: [
		"Privacy Management",
		"GDPR Compliance",
		"Consent Management",
		"Privacy Infrastructure",
	],
	links: {
		email: "support@koroflow.dev",
		twitter: "https://twitter.com/koroflow",
		github: "https://github.com/koroflow/koroflow",
	},
	hero: {
		title: "Privacy infrastructure for the modern web",
		description:
			"Transform privacy consent from a compliance checkbox into a fully observable system. Built for developers who care about performance, privacy, and clean code.",
		cta: { text: "Get Started", href: "/docs/elements" },
		demo: { text: "Book A Demo", href: "https://cal.com/christopherburns/koroflow" },
	},
	features: [
		{
			name: "Performance First",
			description: "Minimal bundle impact with zero external dependencies.",
			icon: <ZapIcon className="h-6 w-6" />,
		},
		{
			name: "Complete Observability",
			description: "Full visibility into user consent states and privacy choices.",
			icon: <EyeIcon className="h-6 w-6" />,
		},
		{
			name: "Developer Experience",
			description: "TypeScript-first APIs that feel natural to use.",
			icon: <CodeIcon className="h-6 w-6" />,
		},
		{
			name: "Privacy by Design",
			description: "Built-in GDPR compliance and privacy best practices.",
			icon: <ShieldIcon className="h-6 w-6" />,
		},
		{
			name: "Universal Components",
			description: "Beautiful UI components built on shadcn/ui.",
			icon: <BoxIcon className="h-6 w-6" />,
		},
		{
			name: "Real-time Metrics",
			description: "Track and analyze privacy consent patterns.",
			icon: <GaugeIcon className="h-6 w-6" />,
		},
		{
			name: "Event Relay System",
			description: "Real-time privacy event streaming with zero latency.",
			icon: <Bolt className="h-6 w-6" />,
		},
		{
			name: "Self-Hosted Control",
			description: "Full control over your infrastructure with GNU3 license.",
			icon: <Server className="h-6 w-6" />,
		},
	],
	footer: {
		socialLinks: [
			{
				// icon: <Icons.github className="h-5 w-5" />,
				url: "https://github.com/koroflow/koroflow",
			},
			{
				// icon: <Icons.twitter className="h-5 w-5" />,
				url: "https://twitter.com/koroflow",
			},
		],
		links: [
			{ text: "Documentation", url: "/docs" },
			{ text: "GitHub", url: "https://github.com/koroflow/koroflow" },
		],
		bottomText: "Open source privacy infrastructure.",
		brandText: "KOROFLOW",
	},
	testimonials: [
		{
			id: 1,
			text: "Koroflow transformed how we handle privacy consent. The performance impact is negligible and the developer experience is fantastic.",
			name: "Sarah Chen",
			company: "TechFlow",
			image:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
		},
		{
			id: 2,
			text: "Finally, a privacy solution that doesn't slow down our site. The TypeScript support and shadcn/ui components are exactly what we needed.",
			name: "James Rodriguez",
			company: "DevForge",
			image:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
		},
		{
			id: 3,
			text: "The observability features give us complete confidence in our privacy compliance. It's like having privacy infrastructure on autopilot.",
			name: "Emily Watson",
			company: "DataStack",
			image:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
		},
	],
};

export type SiteConfig = typeof siteConfig;
