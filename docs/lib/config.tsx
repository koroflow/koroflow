import { Icons } from "@/components/icons";

import {
  ActivityIcon,
  BoxIcon,
  GlobeIcon,
  ServerIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  cta: "Get Started",
  description: "Privacy-first analytics framework with built-in consent management",
  features: [
    {
      description:
        "Server-side relay system eliminates frontend bloat and ad-blocker issues.",
      icon: <ServerIcon className="h-6 w-6" />,
      name: "Server-Side First",
    },
    {
      description:
        "Beautiful, customizable cookie consent UI components built with shadcn/ui.",
      icon: <SparklesIcon className="h-6 w-6" />,
      name: "Ready-to-Use Components",
    },
    {
      description:
        "Built-in GDPR compliance and granular consent management.",
      icon: <GlobeIcon className="h-6 w-6" />,
      name: "Privacy by Design",
    },
    {
      description:
        "Send events to multiple destinations through a single API.",
      icon: <ActivityIcon className="h-6 w-6" />,
      name: "Universal Analytics",
    },
    {
      description:
        "TypeScript-first with full type safety and excellent DX.",
      icon: <BoxIcon className="h-6 w-6" />,
      name: "Developer Experience",
    },
    {
      description:
        "Scale to millions of events with efficient batching and processing.",
      icon: <ZapIcon className="h-6 w-6" />,
      name: "Built for Scale",
    },
  ],
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
  hero: {
    cta: "Get Started",
    ctaDescription: "Open Source",
    description:
      "A server-side analytics relay that combines privacy controls with ready-to-use client components. Built for developers who care about user privacy and clean code.",
    title: "Koroflow",
  },
  keywords: [
    "Analytics",
    "Privacy",
    "GDPR Compliance",
    "Cookie Consent",
    "Developer Tools",
  ],
  links: {
    github: "https://github.com/koroflow/koroflow",
    twitter: "https://x.com/burnedchris",
  },
  name: "Koroflow",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;