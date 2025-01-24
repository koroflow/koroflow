import type { ComponentRef, HTMLAttributes } from "react";
import type { ClassNameStyle, StyleKey, StyleValue } from "../theme/types";
import type { NestedStyleKey } from "../theme/useStyle";
import type { ButtonSharedProps } from "../ui/components/button";

export type ConsentButtonElement = ComponentRef<"button">;

/**
 * Props for CookieBanner button components.
 *
 * @public
 */
export interface ConsentButtonProps<T extends StyleKey>
	extends HTMLAttributes<HTMLButtonElement>,
		ClassNameStyle,
		ButtonSharedProps {
	/**
	 * @remarks
	 * When true, the button will not apply any styles.
	 */
	noStyle?: boolean;
	/**
	 * @remarks
	 * When true, the button will render its children directly without wrapping them in a button element.
	 * This enables better composition with custom button implementations.
	 */
	asChild?: boolean;
	/**
	 * @remarks
	 * Allows for custom click handling.
	 */
	onClick?: () => void;

	styleKey?: NestedStyleKey;
}

export interface ConsentButtonStyles {
	/** @remarks Styles for the root container element */
	acceptButton?: StyleValue & ButtonSharedProps;
	rejectButton?: StyleValue & ButtonSharedProps;
	customizeButton?: StyleValue & ButtonSharedProps;
}

export type ButtonStyleKeys =
	| "consentButtonAcceptAll"
	| "consentButtonSave"
	| "consentButtonNecessary";
