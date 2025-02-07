import { Card } from '~/components/docs/card';
import { HeaderBg } from '~/components/docs/header-bg';
import { AustraliaIcon } from '~/components/icons/countries/australia';
import { BrazilIcon } from '~/components/icons/countries/brazil';
import { CaliforniaIcon } from '~/components/icons/countries/ca';
import { CanadaIcon } from '~/components/icons/countries/canada';
import { ColoradoIcon } from '~/components/icons/countries/co';
import { ConnecticutIcon } from '~/components/icons/countries/ct';
import { EUIcon } from '~/components/icons/countries/eu';
import { QuebecIcon } from '~/components/icons/countries/quebec';
import { SaudiArabiaIcon } from '~/components/icons/countries/saudi-arabia';
import { SingaporeIcon } from '~/components/icons/countries/singapore';
import { SouthAfricaIcon } from '~/components/icons/countries/south-africa';
import { ThailandIcon } from '~/components/icons/countries/thailand';
import { UKIcon } from '~/components/icons/countries/uk';
import { UtahIcon } from '~/components/icons/countries/ut';
import { VirginiaIcon } from '~/components/icons/countries/va';

export const laws = [
	{
		icon: <CaliforniaIcon />,
		title: 'California Consumer Privacy Act (CCPA)',
		description:
			'Comprehensive privacy law establishing data rights for California residents.',
		href: '/docs/privacy-regulations/usa/ccpa',
	},
	{
		icon: <CaliforniaIcon />,
		title: 'California Privacy Rights Act (CPRA)',
		description:
			'Expansion of CCPA providing enhanced privacy protections and establishing a dedicated privacy agency.',
		href: '/docs/privacy-regulations/usa/cpra',
	},
	{
		icon: <ColoradoIcon />,
		title: 'Colorado Privacy Act (CPA)',
		description:
			'Comprehensive data privacy framework protecting Colorado residents and regulating data controllers.',
		href: '/docs/privacy-regulations/usa/cpa',
	},
	{
		icon: <ConnecticutIcon />,
		title: 'Connecticut Data Privacy Act (CTDPA)',
		description:
			'Framework establishing consumer privacy rights and business obligations in Connecticut.',
		href: '/docs/privacy-regulations/usa/ctdpa',
	},
	{
		icon: <UtahIcon />,
		title: 'Utah Consumer Privacy Act (UCPA)',
		description:
			'Law establishing data privacy rights for Utah residents and requirements for businesses.',
		href: '/docs/privacy-regulations/usa/ucpa',
	},
	{
		icon: <VirginiaIcon />,
		title: 'Virginia Consumer Data Protection Act (VCDPA)',
		description:
			'Comprehensive privacy framework protecting Virginia residents and regulating data processing.',
		href: '/docs/privacy-regulations/usa/vcdpa',
	},
	{
		icon: <CanadaIcon />,
		title:
			'Personal Information Protection and Electronic Documents Act (PIPEDA)',
		description:
			'Federal privacy law governing how private sector organizations collect, use and disclose personal information.',
		href: '/docs/privacy-regulations/canada/pipeda',
	},
	{
		icon: <QuebecIcon />,
		title: 'Act to Modernize Privacy Laws (Quebec Law 25)',
		description:
			"Modernized privacy framework strengthening data protection requirements in Quebec's private sector.",
		href: '/docs/privacy-regulations/canada/quebec-law-25',
	},
	{
		icon: <EUIcon />,
		title: 'General Data Protection Regulation (GDPR)',
		description:
			'Comprehensive data protection and privacy regulation for individuals within the European Union.',
		href: '/docs/privacy-regulations/europe/gdpr',
	},
	{
		icon: <UKIcon />,
		title: 'United Kingdom General Data Protection Regulation (UK GDPR)',
		description:
			"UK's post-Brexit adaptation of GDPR establishing data protection standards.",
		href: '/docs/privacy-regulations/europe/gdpr-uk',
	},
	{
		icon: <AustraliaIcon />,
		title: 'Australian Privacy Act (APA)',
		description:
			'National law regulating the handling of personal information by government agencies and organizations.',
		href: '/docs/privacy-regulations/australia/australian-privacy-act',
	},
	{
		icon: <SingaporeIcon />,
		title: 'Personal Data Protection Act (Singapore PDPA)',
		description:
			'Framework governing collection, use, disclosure and care of personal data in Singapore.',
		href: '/docs/privacy-regulations/asia/singapore-pdpa',
	},
	{
		icon: <ThailandIcon />,
		title: 'Personal Data Protection Act (Thailand PDPA)',
		description:
			'Comprehensive data protection law establishing privacy rights and compliance requirements in Thailand.',
		href: '/docs/privacy-regulations/asia/thailand-pdpa',
	},
	{
		icon: <BrazilIcon />,
		title: 'Brazil Lei Geral de Proteção de Dados (LGPD)',
		description:
			"Brazil's general data protection law establishing rights and obligations for personal data processing.",
		href: '/docs/privacy-regulations/south-america/lgpd',
	},
	{
		icon: <SaudiArabiaIcon />,
		title: 'Saudi Arabia Personal Data Protection Law (PDPL)',
		description:
			'Framework regulating the collection and processing of personal data in Saudi Arabia.',
		href: '/docs/privacy-regulations/middle-east/pdpl',
	},
	{
		icon: <SouthAfricaIcon />,
		title: 'South Africa Protection of Personal Information Act (POPIA)',
		description:
			'Comprehensive data protection law promoting the protection of personal information in South Africa.',
		href: '/docs/privacy-regulations/africa/popia',
	},
];

export const Laws = () => {
	return (
		<>
			<HeaderBg className="top-[calc(var(--fd-banner-height)+var(--fd-nav-height))]" />
			<div className="container mt-8 flex flex-col gap-y-5 rounded-lg px-7 py-5">
				<h1 className="mb-4 font-bold text-4xl tracking-tighter">
					Privacy Regulations
				</h1>
				<p className="mb-8 text-fd-muted-foreground text-xl">
					Comprehensive guide to global privacy laws and data protection
					regulations, including requirements, compliance guidelines, and
					implementation best practices.
				</p>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{laws.map((prompt, index) => (
						<Card
							key={index}
							title={prompt.title}
							description={prompt.description}
							href={prompt.href}
							icon={prompt.icon}
							className="group relative overflow-hidden hover:shadow-lg"
						/>
					))}
				</div>
			</div>
		</>
	);
};
