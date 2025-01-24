import type clsx from "clsx";
import type { CSSProperties } from "react";
import type { NestedStyleKey } from "./useStyle";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

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
	styleType?: "full" | "layout" | "none";

	/** @internal  used to pass default class names to the component */
	baseClassName?: clsx.ClassValue[] | string;
};

/**
 * Represents a style configuration that can include both inline styles and class names.
 * @public
 */
export type ClassNameStyleWithKey = ClassNameStyle & {
	styleKey?: NestedStyleKey;
};

/**
/**
 * Represents a style value that can be either a class name string or a {@link ClassNameStyle} object.
 * @public
 */
export type StyleValue = ClassName | ClassNameStyle;

export interface CookieBannerStyles {
	root: StyleValue;
	card: StyleValue;
	header: StyleValue;
	title: StyleValue;
	description: StyleValue;
	footer: {
		className?: string;
		style?: React.CSSProperties;
		subGroup: StyleValue;
	};
	button: {
		primary: StyleValue;
		secondary: StyleValue;
	};
}

export type NestedStyleValue =
	| StyleValue
	| {
			[key: string]: NestedStyleValue;
	  };

export type StyleKey = keyof CookieBannerStyles | string;
