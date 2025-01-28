
import { Button } from "@/components/ui/button";
import { BorderIcon } from "~/components/marketing/border-icon";
import { Section } from "~/components/marketing/section";


export function CTA() {
	return (
		<Section id="cta" className="my-12">
			<div className="border relative text-center py-16 mx-auto">
				<p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-4xl">
					Get Legal. <br />
					Start today.
				</p>

				<div className="flex justify-center space-x-4">
					<Button className="flex items-center gap-2">Get Started</Button>

					<Button className="flex items-center gap-2" variant={"ghost"}>
						Book A demo
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
