
import { FeaturesSection } from "./_components/features";
import { Hero } from "./_components/hero";

import { CTA } from "./_components/cta";
import { Examples } from "./_components/examples";
import { Footer } from "./_components/footer";
// import { ComponentsSection } from "./_components/components";
export default function HomePage() {
	return (
		<>
			<Hero />
			{/* <ComponentsSection /> */}
			<FeaturesSection />
			<Examples />
			<CTA />
			<Footer />
		</>
	);
}
