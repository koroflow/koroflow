import { Button } from '@koroflow/shadcn/components';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BorderIcon } from '~/components/marketing/border-icon';
import { Section } from '~/components/marketing/section';

export function CTA() {
	return (
		<Section id="cta" className="my-12">
			<div className="relative mx-auto border py-16 text-center">
				<p className="mx-auto mb-6 max-w-3xl text-balance font-medium text-4xl text-foreground">
					Make your next project compliant. Start today.
				</p>

				<div className="flex justify-center space-x-4">
					<Button
						className="flex items-center gap-2"
						variant={'outline'}
						asChild
					>
						<Link href="/docs/getting-started">
							Get Started <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
						</Link>
					</Button>

					<Button className="flex items-center gap-2" variant={'ghost'} asChild>
						<Link href="https://cal.com/christopherburns/koroflow">
							Book A demo
						</Link>
					</Button>
				</div>
				<BorderIcon className="-top-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
				<BorderIcon className="-bottom-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
				<BorderIcon className="-top-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
				<BorderIcon className="-bottom-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
			</div>
		</Section>
	);
}
