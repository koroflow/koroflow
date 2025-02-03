import type { ThemeValue } from '..';
import type { ConsentManagerWidgetTheme } from '../../consent-manager/theme';
import type { CookieBannerTheme } from '../../cookie-banner';
import type { AccordionStylesKeys } from '../../ui/components/accordion';
import type { SwitchStylesKeys } from '../../ui/components/switch';

type NestedKeys<T> = {
	[K in keyof T & (string | number)]: T[K] extends object
		? `${K & string}` | `${K & string}.${NestedKeys<T[K]>}`
		: `${K & string}`;
}[keyof T & (string | number)];

export type AllThemeKeys =
	// elements
	| NestedKeys<CookieBannerTheme>
	| NestedKeys<ConsentManagerWidgetTheme>
	// primitives
	| NestedKeys<AccordionStylesKeys>
	| NestedKeys<SwitchStylesKeys>
	| NestedKeys<{ button: ThemeValue }>;
