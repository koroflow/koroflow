import type { CSSProperties } from "react";

/**
 * Represents a class name string or undefined value.
 * @public
 */
export type ClassName = string | undefined;

/**
 * Represents a style configuration that can include both inline styles and class names.
 * @public
 */
export type ClassNameStyle = {
	/** @remarks CSS properties to be applied inline to the component */
	style?: CSSProperties;
	/** @remarks CSS class names to be applied to the component */
	className?: ClassName;
};

/**
 * Represents a style value that can be either a class name string or a {@link ClassNameStyle} object.
 * @public
 */
export type StyleValue = ClassName | ClassNameStyle;

/**
 * Configuration object for styling different parts of the CookieBanner component.
 * @public
 */
export interface CookieBannerStyles {
	/** @remarks Styles for the root container element */
	root?: StyleValue;
	/** @remarks Styles for the main content wrapper */
	content?: StyleValue;
	/** @remarks Styles for the banner title */
	title?: StyleValue;
	/** @remarks Styles for the banner description text */
	description?: StyleValue;
	/** @remarks Styles for the actions container */
	actions?: StyleValue;
	/** @remarks Styles for the reject button */
	rejectButton?: StyleValue;
	/** @remarks Styles for the customize button */
	customizeButton?: StyleValue;
	/** @remarks Styles for the accept button */
	acceptButton?: StyleValue;
	/** @remarks Styles for the overlay background */
	overlay?: StyleValue;
}

/**
 * Result of style application containing computed className and optional style object.
 * @public
 */
export interface StyleResult {
	/** @remarks The final computed class name after processing */
	className: string;
	/** @remarks The final computed inline styles after processing */
	style?: CSSProperties;
}

/**
 * Keys of the CookieBannerStyles interface
 */
export type StyleKey = keyof CookieBannerStyles;
