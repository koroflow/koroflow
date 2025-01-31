import type { ConsentManagerWidgetTheme } from "../consent-manager-widget/theme";
import type { ThemeValue } from "../theme";

/**
 * Configuration object for styling different parts of the ConsentManagerWidget component.
 * @public
 */
export type ConsentManagerDialogTheme = Partial<
	{
		/** @remarks Styles for the root container element */
		"consent-manager-dialog": ThemeValue;
		/** @remarks Styles for the root container element */
		"consent-manager-dialog.root": ThemeValue;
		"consent-manager-dialog.header": ThemeValue;
		"consent-manager-dialog.title": ThemeValue;
		"consent-manager-dialog.description": ThemeValue;
		"consent-manager-dialog.content": ThemeValue;
		"consent-manager-dialog.footer": ThemeValue;
		"consent-manager-dialog.overlay": ThemeValue;
	} & ConsentManagerWidgetTheme
>;
