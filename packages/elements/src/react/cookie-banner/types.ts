import type { ThemeValue } from '../theme';

/**
 * Configuration object for styling different parts of the CookieBanner component.
 * @public
 */
export type CookieBannerTheme = {
	/** @remarks Styles for the root container element */
	'cookie-banner.root'?: ThemeValue;
	'cookie-banner.card'?: ThemeValue;
	/** @remarks Styles for the main content wrapper */
	'cookie-banner.header.root': ThemeValue;
	/** @remarks Styles for the banner title */
	'cookie-banner.header.title': ThemeValue;
	/** @remarks Styles for the banner description text */
	'cookie-banner.header.description': ThemeValue;
	/** @remarks Styles for the actions container */
	'cookie-banner.footer': ThemeValue;
	'cookie-banner.footer.sub-group': ThemeValue;
	/** @remarks Styles for the overlay background */
	'cookie-banner.overlay': ThemeValue;
	'cookie-banner.footer.reject-button': ThemeValue;
	'cookie-banner.footer.customize-button': ThemeValue;
	'cookie-banner.footer.accept-button': ThemeValue;
};
