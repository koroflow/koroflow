import type { StyleValue } from "../theme/types";

/**
 * Configuration object for styling different parts of the CookieBanner component.
 * @public
 */
export interface ConsentManagerWidgetStyles {
	/** @remarks Styles for the root container element */
	root?: StyleValue;
	footer?: {
		root?: StyleValue;
		subgroup?: StyleValue;
		"reject-button"?: StyleValue;
		"accept-button"?: StyleValue;
		"customize-button"?: StyleValue;
		"save-button"?: StyleValue;
	};
	accordion?: {
		root?: StyleValue;
		trigger?: StyleValue;
		"trigger-sub-group"?: StyleValue;
		item?: StyleValue;
		icon?: StyleValue;
		arrow?: {
			open?: StyleValue;
			close?: StyleValue;
		};
		content?: StyleValue;
		"content-inner"?: StyleValue;
	};
	switch?: StyleValue & {
		root?: StyleValue;
		track?: StyleValue;
		thumb?: StyleValue;
	};
	dialog?: {
		root?: StyleValue;
		header?:StyleValue
		title?: StyleValue;
		description?: StyleValue;
		content?: StyleValue;
		footer?: StyleValue;
	};
}
