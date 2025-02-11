import type { PrivacyConsentState } from '@c15t/core';
import type { ThemeContextValue } from '../../theme';

interface ThemeContextValueWithConsent
	extends PrivacyConsentState,
		ThemeContextValue {
	(): PrivacyConsentState & ThemeContextValue;
}

export function createThemeContextValue(
	consentManager: PrivacyConsentState,
	themeProps: ThemeContextValue
): ThemeContextValueWithConsent {
	const fn = () => ({ ...consentManager, ...themeProps });

	const result = Object.assign(fn, {
		...consentManager,
		...themeProps,
	});

	// Type guard to ensure type safety
	if (typeof result !== 'function' || !('theme' in result)) {
		throw new Error('Invalid theme context value');
	}

	return result;
}
