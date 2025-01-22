import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { type VariantProps, tv } from "tailwind-variants";
import type { PolymorphicComponentProps } from "../libs/polymorphic";
import { recursiveCloneChildren } from "../libs/recursive-clone-children";
import "./button.css";
/**
 * Constants for component display names
 * @internal
 */
const BUTTON_ROOT_NAME = "ButtonRoot";
const BUTTON_ICON_NAME = "ButtonIcon";

/**
 * Button component variant styles using tailwind-variants
 * @remarks
 * Defines the core styling variants for the Button component including:
 * - Base styles for the button and icon
 * - Variant styles (primary, neutral, error)
 * - Mode styles (filled, stroke, lighter, ghost)
 * - Size variants (medium, small, xsmall, xxsmall)
 *
 * @internal
 */
export const buttonVariants = tv({
	slots: {
		root: ["button"],
		icon: ["button-icon"],
	},
	variants: {
		variantStyle: {
			primary: {},
			neutral: {},
			error: {},
		},
		mode: {
			filled: {},
			stroke: {},
			lighter: {},
			ghost: {},
		},
		size: {
			medium: { root: "button-medium" },
			small: { root: "button-small" },
			xsmall: { root: "button-xsmall" },
			xxsmall: { root: "button-xxsmall" },
		},
	},
	compoundVariants: [
		// Primary variants
		{
			variantStyle: "primary",
			mode: "filled",
			class: { root: "button-primary-filled" },
		},
		{
			variantStyle: "primary",
			mode: "stroke",
			class: { root: "button-primary-stroke" },
		},
		{
			variantStyle: "primary",
			mode: "lighter",
			class: { root: "button-primary-lighter" },
		},
		{
			variantStyle: "primary",
			mode: "ghost",
			class: { root: "button-primary-ghost" },
		},

		// Neutral variants
		{
			variantStyle: "neutral",
			mode: "filled",
			class: { root: "button-neutral-filled" },
		},
		{
			variantStyle: "neutral",
			mode: "stroke",
			class: { root: "button-neutral-stroke" },
		},
		{
			variantStyle: "neutral",
			mode: "lighter",
			class: { root: "button-neutral-lighter" },
		},
		{
			variantStyle: "neutral",
			mode: "ghost",
			class: { root: "button-neutral-ghost" },
		},

		// Error variants
		{
			variantStyle: "error",
			mode: "filled",
			class: { root: "button-error-filled" },
		},
		{
			variantStyle: "error",
			mode: "stroke",
			class: { root: "button-error-stroke" },
		},
		{
			variantStyle: "error",
			mode: "lighter",
			class: { root: "button-error-lighter" },
		},
		{
			variantStyle: "error",
			mode: "ghost",
			class: { root: "button-error-ghost" },
		},
	],
	defaultVariants: {
		variantStyle: "primary",
		mode: "filled",
		size: "medium",
	},
});

/**
 * Type definitions for button props
 * @internal
 */
type ButtonSharedProps = VariantProps<typeof buttonVariants>;

/**
 * Props interface for the ButtonRoot component
 * @public
 */
type ButtonRootProps = VariantProps<typeof buttonVariants> &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		/**
		 * When true, the component will render its children directly without wrapping them in a button element
		 */
		asChild?: boolean;
	};

/**
 * The root component for the Button compound component
 *
 * @remarks
 * ButtonRoot is the main container component that provides the core button functionality.
 * It supports various style variants, modes, and sizes through the buttonVariants configuration.
 *
 * @example
 * ```tsx
 * <ButtonRoot variantStyle="primary" mode="filled" size="medium">
 *   <ButtonIcon as={IconComponent} />
 *   Click me
 * </ButtonRoot>
 * ```
 *
 * @param props - Component props including variant styles, mode, size, and standard button attributes
 * @param ref - Forward ref to access the underlying button element
 *
 * @public
 */
const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
	({ children, variantStyle, mode, size, asChild, className, ...rest }, forwardedRef) => {
		const uniqueId = React.useId();
		const Component = asChild ? Slot : "button";
		const { root } = buttonVariants({ variantStyle, mode, size });

		const sharedProps: ButtonSharedProps = {
			variantStyle,
			mode,
			size,
		};

		const extendedChildren = recursiveCloneChildren(
			children as React.ReactElement[],
			sharedProps,
			[BUTTON_ICON_NAME],
			uniqueId,
			asChild,
		);

		return (
			<Component ref={forwardedRef} className={root({ class: className })} {...rest}>
				{extendedChildren}
			</Component>
		);
	},
);
ButtonRoot.displayName = BUTTON_ROOT_NAME;

/**
 * The icon component for the Button compound component
 *
 * @remarks
 * ButtonIcon is a polymorphic component that can render any icon component while maintaining
 * consistent styling with the parent button. It inherits variant properties from ButtonRoot.
 *
 * @example
 * ```tsx
 * <ButtonRoot>
 *   <ButtonIcon as={MyIcon} />
 *   Button with Icon
 * </ButtonRoot>
 * ```
 *
 * @typeParam T - The element type to render the icon as
 * @param props - Component props including the polymorphic 'as' prop and shared button variant props
 *
 * @public
 */
function ButtonIcon<T extends React.ElementType>({
	variantStyle,
	mode,
	size,
	as,
	className,
	...rest
}: PolymorphicComponentProps<T, ButtonSharedProps>) {
	const Component = as || "div";
	const { icon } = buttonVariants({ mode, variantStyle, size });

	return <Component className={icon({ class: className })} {...rest} />;
}
ButtonIcon.displayName = BUTTON_ICON_NAME;

/**
 * Export the compound components
 * @public
 */
export { ButtonRoot as Root, ButtonIcon as Icon };
