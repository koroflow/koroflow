import Link from "next/link";
import { FeaturesSection } from "./_components/features";
import { Hero } from "./_components/hero";

import { Footer } from "./_components/footer";
import type { Metadata } from "next";
import { CTA } from "./_components/cta";
import { Examples } from "./_components/examples";

export default function HomePage() {
	return (
		<>
			<Hero />
			<FeaturesSection />
			<Examples />
			<CTA />
			<Footer />
		</>
	);
}
