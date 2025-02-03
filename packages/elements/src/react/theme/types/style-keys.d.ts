import type { ConsentManagerDialogTheme } from '~/react/consent-manager-dialog/theme';
import type { ConsentManagerWidgetTheme } from '~/react/consent-manager-widget/theme';
import type { CookieBannerTheme } from '~/react/cookie-banner';
import type { ThemeValue } from '~/react/theme';
import type { AccordionStylesKeys } from '~/react/ui/components/accordion';
import type { SwitchStylesKeys } from '~/react/ui/components/switch';

type NestedKeys<T> = {
	[K in keyof T & (string | number)]: T[K] extends object
		? `${K & string}` | `${K & string}.${NestedKeys<T[K]>}`
		: `${K & string}`;
}[keyof T & (string | number)];

export type AllThemeKeys =
	// elements
	| NestedKeys<CookieBannerTheme>
	| NestedKeys<ConsentManagerWidgetTheme>
	| NestedKeys<ConsentManagerDialogTheme>
	// primitives
	| NestedKeys<AccordionStylesKeys>
	| NestedKeys<SwitchStylesKeys>
	| NestedKeys<{ button: ThemeValue }>;
