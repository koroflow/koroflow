import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import logo from "../public/logo.svg";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<Image src={logo} alt="Koroflow" width={93} height={16} className="h-4 w-auto dark:invert" />
		),
	},
	links: [
		{
			text: "Get Started",
			url: "docs/elements",
			active: "nested-url",
		},
	],
};
