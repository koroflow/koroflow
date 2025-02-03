import type { Registry } from '~/schema';

export const ui: Registry['items'] = [
	{
		name: 'consent-solution',
		type: 'registry:ui',
		registryDependencies: [],
		dependencies: ['@koroflow/elements'],
		files: [
			{
				path: 'components/consent/cookie-banner.tsx',
				target: 'components/consent/cookie-banner.tsx',
				type: 'registry:ui',
			},
			{
				path: 'components/consent/overlay.tsx',
				target: 'components/consent/overlay.tsx',
				type: 'registry:ui',
			},
			{
				path: 'components/consent/consent-manager-dialog.tsx',
				target: 'components/consent/consent-manager-dialog.tsx',
				type: 'registry:ui',
			},
			{
				path: 'components/consent/consent-manager-widget.tsx',
				target: 'components/consent/consent-manager-widget.tsx',
				type: 'registry:ui',
			},
		],
	},
];
