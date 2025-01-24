import type { ConsentManagerWidgetTheme } from "../consent-manager/theme";
import type { CookieBannerTheme } from "../cookie-banner";

export type NestedKeys<T> = {
	[P in keyof T]: T[P] extends object ? `${string & P}.${NestedKeys<T[P]>}` : string & P;
}[keyof T];

export type StyleKeys =
	| `consentManager.${keyof ConsentManagerWidgetTheme}`
	| `cookieBanner.${keyof CookieBannerTheme}`;

export const getNestedValue = <K extends StyleKeys>(
	obj: Record<string, unknown>,
	key: K,
): unknown => {
	const [root, ...path] = key.split(".");
	return path.reduce((acc, part) => acc?.[part as keyof typeof acc], obj[root as keyof typeof obj]);
};
