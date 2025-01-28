import { Button } from "@koroflow/shadcn/components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BorderIcon } from "~/components/marketing/border-icon";
import { Section } from "~/components/marketing/section";

export function CTA() {
	return (
		<Section id="cta" className="my-12">
			<div className="border relative text-center py-16 mx-auto">
				<p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-4xl">
					Make your next project compliant. Start today.
				</p>

				<div className="flex justify-center space-x-4">
					<Button className="flex items-center gap-2" variant={"outline"} asChild>
						<Link href="/docs/elements">Get Started <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" /></Link>
					</Button>

					<Button className="flex items-center gap-2" variant={"ghost"} asChild>
						<Link href="https://cal.com/christopherburns/koroflow">Book A demo</Link>
					</Button>
				</div>
				<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
			</div>
		</Section>
	);
}
