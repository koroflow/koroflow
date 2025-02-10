import type { PrivacyConsentState } from '@koroflow/core-js';
import type { ThemeContextValue } from '../../theme';

type ThemeContextValueWithConsent = PrivacyConsentState &
	(() => PrivacyConsentState) &
	ThemeContextValue;

/**
 * Creates a theme context value that satisfies both function and object requirements
 */
export function createThemeContextValue(
	consentManager: PrivacyConsentState,
	themeProps: ThemeContextValue
): ThemeContextValueWithConsent {
	return Object.assign(() => ({ ...consentManager, ...themeProps }), {
		...consentManager,
		...themeProps,
	}) as ThemeContextValueWithConsent;
}
