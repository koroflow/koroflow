import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Koroflow",
	description: siteConfig.description,
	authors: [{ name: "Christopher Burns" }],
};

export default function Page() {
	return (
		<main>
			<Hero />
			<Features />
			<Footer />
		</main>
	);
}
