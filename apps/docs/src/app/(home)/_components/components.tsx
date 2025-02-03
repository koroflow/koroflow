import { Section } from '../../../components/marketing/section';

import { BorderIcon } from '~/components/marketing/border-icon';
import { EvervaultCard } from '~/components/marketing/evervault-card';
import { siteConfig } from '../config';

export function ComponentsSection() {
  const features = siteConfig.features;

  return (
    <Section id="components" title="Components">
      <div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12 ">
        <div className="relative col-span-4 row-span-4 border border-black/[0.2] bg-secondary p-6 text-secondary-foreground md:col-span-8 lg:col-span-6 dark:border-white/[0.2]">
          <BorderIcon className="-top-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-top-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />

          <EvervaultCard text="hover" />
          <h3 className="font-semibold text-lg">Cookie Banner</h3>
          <p>description.</p>
        </div>
        <div className="relative col-span-4 row-span-2 border border-black/[0.2] bg-secondary p-6 text-secondary-foreground md:col-span-8 lg:col-span-6 dark:border-white/[0.2]">
          <BorderIcon className="-top-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-top-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />

          <h3 className="font-semibold text-lg">Consent Dialog</h3>
          <p>description.</p>
        </div>
        <div className="relative col-span-4 row-span-2 border border-black/[0.2] bg-secondary p-6 text-secondary-foreground md:col-span-4.5 lg:col-span-3 dark:border-white/[0.2]">
          <BorderIcon className="-top-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-top-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />

          <h3 className="font-semibold text-lg">Consent Widget</h3>
          <p>Provide easy access to popular content.</p>
        </div>
        <div className="relative col-span-4 row-span-2 border border-black/[0.2] bg-secondary p-6 text-secondary-foreground md:col-span-4.5 lg:col-span-3 dark:border-white/[0.2]">
          <BorderIcon className="-top-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -left-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-top-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />
          <BorderIcon className="-bottom-3 -right-3 absolute h-6 w-6 text-black dark:text-white" />

          <h3 className="font-semibold text-lg">Headless</h3>
          <p>description.</p>
        </div>
      </div>
      {/* <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
				<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

				<EvervaultCard text="hover" />

				<h2 className="dark:text-white text-black mt-4 text-sm font-light">
					Hover over this card to reveal an awesome effect. Running out of copy here.
				</h2>
				<p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
					Watch me hover
				</p>
			</div> */}
    </Section>
  );
}
