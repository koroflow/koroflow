import { test } from 'vitest';
import { CookieBanner } from '../../../index';
import testComponentStyles from './utils';

test('Theme prop applies classnames to components', async () => {
	const testCases: { testId: string; themeKey: string; className: string }[] = [
		{
			testId: 'cookie-banner-root',
			themeKey: 'cookie-banner.root',
			className: 'custom-root',
		},
		{
			testId: 'cookie-banner-card',
			themeKey: 'cookie-banner.card',
			className: 'custom-card',
		},
		{
			testId: 'cookie-banner-header',
			themeKey: 'cookie-banner.header.root',
			className: 'custom-header',
		},
		{
			testId: 'cookie-banner-title',
			themeKey: 'cookie-banner.header.title',
			className: 'custom-title',
		},
		{
			testId: 'cookie-banner-description',
			themeKey: 'cookie-banner.header.description',
			className: 'custom-description',
		},
		{
			testId: 'cookie-banner-footer',
			themeKey: 'cookie-banner.footer',
			className: 'custom-footer',
		},
		{
			testId: 'cookie-banner-footer-sub-group',
			themeKey: 'cookie-banner.footer.sub-group',
			className: 'custom-footer-sub-group',
		},
		{
			testId: 'cookie-banner-overlay',
			themeKey: 'cookie-banner.overlay',
			className: 'custom-overlay',
		},
		{
			testId: 'cookie-banner-reject-button',
			themeKey: 'cookie-banner.footer.reject-button',
			className: 'custom-reject-button',
		},
		{
			testId: 'cookie-banner-customize-button',
			themeKey: 'cookie-banner.footer.customize-button',
			className: 'custom-customize-button',
		},
		{
			testId: 'cookie-banner-accept-button',
			themeKey: 'cookie-banner.footer.accept-button',
			className: 'custom-accept-button',
		},
	];

	const test = (
		<CookieBanner
			theme={testCases.reduce(
				(acc, { themeKey, className }) => {
					acc[themeKey] = className;
					return acc;
				},
				{} as Record<string, string>
			)}
		/>
	);

	await testComponentStyles({
		component: test,
		testCases: testCases,
	});
});

test('No style prop removes all classNames except for custom classNames', async () => {
	const testCases: { testId: string; themeKey: string; className: string }[] = [
		{
			testId: 'cookie-banner-root',
			themeKey: 'cookie-banner.root',
			className: 'custom-root',
		},
		{
			testId: 'cookie-banner-card',
			themeKey: 'cookie-banner.card',
			className: 'custom-card',
		},
		{
			testId: 'cookie-banner-header',
			themeKey: 'cookie-banner.header.root',
			className: 'custom-header',
		},
		{
			testId: 'cookie-banner-title',
			themeKey: 'cookie-banner.header.title',
			className: 'custom-title',
		},
		{
			testId: 'cookie-banner-description',
			themeKey: 'cookie-banner.header.description',
			className: 'custom-description',
		},
		{
			testId: 'cookie-banner-footer',
			themeKey: 'cookie-banner.footer',
			className: 'custom-footer',
		},
		{
			testId: 'cookie-banner-footer-sub-group',
			themeKey: 'cookie-banner.footer.sub-group',
			className: 'custom-footer-sub-group',
		},
		{
			testId: 'cookie-banner-overlay',
			themeKey: 'cookie-banner.overlay',
			className: 'custom-overlay',
		},
		{
			testId: 'cookie-banner-reject-button',
			themeKey: 'cookie-banner.footer.reject-button',
			className: 'custom-reject-button',
		},
		{
			testId: 'cookie-banner-customize-button',
			themeKey: 'cookie-banner.footer.customize-button',
			className: 'custom-customize-button',
		},
		{
			testId: 'cookie-banner-accept-button',
			themeKey: 'cookie-banner.footer.accept-button',
			className: 'custom-accept-button',
		},
	];

	const test = (
		<CookieBanner
			noStyle
			theme={testCases.reduce(
				(acc, { themeKey, className }) => {
					acc[themeKey] = className;
					return acc;
				},
				{} as Record<string, string>
			)}
		/>
	);

	await testComponentStyles({
		component: test,
		testCases: testCases,
	});
});
