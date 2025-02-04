import { Card } from '~/components/docs/card';
import { HeaderBg } from '~/components/docs/header-bg';
import { AustraliaIcon } from '~/components/icons/countries/australia';
import { BrazilIcon } from '~/components/icons/countries/brazil';
import { CaliforniaIcon } from '~/components/icons/countries/ca';
import { CanadaIcon } from '~/components/icons/countries/canada';
import { ColoradoIcon } from '~/components/icons/countries/co';
import { ConnecticutIcon } from '~/components/icons/countries/ct';
import { EUIcon } from '~/components/icons/countries/eu';
import { QubecIcon } from '~/components/icons/countries/qubec';
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
		title: 'CCPA',
		description:
			'California Consumer Privacy Act - Key requirements and compliance guidelines.',
		href: '/docs/privacy-regulations/usa/ccpa',
	},
	{
		icon: <CaliforniaIcon />,
		title: 'CPRA',
		description:
			'California Privacy Rights Act - Updated privacy requirements for California.',
		href: '/docs/privacy-regulations/usa/cpra',
	},
	{
		icon: <ColoradoIcon />,
		title: 'CPA',
		description:
			'Colorado Privacy Act - Privacy requirements for businesses operating in Colorado.',
		href: '/docs/privacy-regulations/usa/cpa',
	},
	{
		icon: <ConnecticutIcon />,
		title: 'CTDPA',
		description:
			'Connecticut Data Privacy Act - Privacy regulations for Connecticut businesses.',
		href: '/docs/privacy-regulations/usa/ctdpa',
	},
	{
		icon: <UtahIcon />,
		title: 'UCPA',
		description:
			'Utah Consumer Privacy Act - Privacy requirements for Utah businesses.',
		href: '/docs/privacy-regulations/usa/ucpa',
	},
	{
		icon: <VirginiaIcon />,
		title: 'VCDPA',
		description:
			'Virginia Consumer Data Protection Act - Virginia privacy regulations.',
		href: '/docs/privacy-regulations/usa/vcdpa',
	},
	{
		icon: <CanadaIcon />,
		title: 'PIPEDA',
		description:
			'Personal Information Protection and Electronic Documents Act - Canadian federal privacy law.',
		href: '/docs/privacy-regulations/canada/pipeda',
	},
	{
		icon: <QubecIcon />,
		title: 'Quebec Law 25',
		description:
			'Quebec privacy law modernizing private sector privacy requirements.',
		href: '/docs/privacy-regulations/canada/qubec-law-25',
	},
	{
		icon: <EUIcon />,
		title: 'GDPR',
		description:
			'General Data Protection Regulation - EU privacy and data protection law.',
		href: '/docs/privacy-regulations/europe/gdpr',
	},
	{
		icon: <UKIcon />,
		title: 'UK GDPR',
		description:
			'UK General Data Protection Regulation - Post-Brexit privacy requirements.',
		href: '/docs/privacy-regulations/europe/gdpr-uk',
	},
	{
		icon: <AustraliaIcon />,
		title: 'APA',
		description:
			'Australia Privacy Act - Privacy requirements for Australian organizations.',
		href: '/docs/privacy-regulations/australia/australian-privacy-act',
	},
	{
		icon: <SingaporeIcon />,
		title: 'Singapore PDPA',
		description:
			'Personal Data Protection Act - Singapore privacy regulations.',
		href: '/docs/privacy-regulations/asia/singapore-pdpa',
	},
	{
		icon: <ThailandIcon />,
		title: 'Thailand PDPA',
		description:
			'Personal Data Protection Act - Thailand privacy requirements.',
		href: '/docs/privacy-regulations/asia/thailand-pdpa',
	},
	{
		icon: <BrazilIcon />,
		title: 'LGPD',
		description:
			'Lei Geral de Proteção de Dados - Brazilian data protection law.',
		href: '/docs/privacy-regulations/south-america/lgpd',
	},
	{
		icon: <SaudiArabiaIcon />,
		title: 'Saudi Arabia PDPL',
		description:
			'Personal Data Protection Law - Saudi Arabian privacy regulations.',
		href: '/docs/privacy-regulations/middle-east/pdpl',
	},
	{
		icon: <SouthAfricaIcon />,
		title: 'POPIA',
		description:
			'Protection of Personal Information Act - South African privacy law.',
		href: '/docs/privacy-regulations/africa/popia',
	},
];

export const Laws = () => {
	return (
		<>
			<HeaderBg className="top-[calc(var(--fd-banner-height)+var(--fd-nav-height))]" />
			<div className="container mt-8 flex flex-col gap-y-5 rounded-lg px-7 py-5">
				<h1 className="mb-4 font-bold text-4xl tracking-tighter">
					Privacy Laws
				</h1>
				<p className="mb-8 text-fd-muted-foreground text-xl">
					Explore privacy laws for different regions and countries.
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
