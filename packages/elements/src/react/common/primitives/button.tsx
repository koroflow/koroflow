import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import type { PolymorphicComponentProps } from "../libs/polymorphic";
import { recursiveCloneChildren } from "../libs/recursive-clone-children";
import { type VariantProps, tv } from "../libs/tv";

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
		root: [
			// base
			"relative inline-flex items-center justify-center whitespace-nowrap outline-none",
			"transition duration-200 ease-out",
			// focus
			"focus:outline-none",
			// disabled
			"disabled:pointer-events-none disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:ring-transparent",
		],
		icon: [
			// base
			"flex size-5 shrink-0 items-center justify-center",
		],
	},
	variants: {
		variantStyle: {
			primary: {},
			neutral: {},
			error: {},
		},
		mode: {
			filled: {},
			stroke: {
				root: "ring-1 ring-inset",
			},
			lighter: {
				root: "ring-1 ring-inset",
			},
			ghost: {
				root: "ring-1 ring-inset",
			},
		},
		size: {
			medium: {
				root: "h-10 gap-3 rounded-10 px-3.5 text-label-sm",
				icon: "-mx-1",
			},
			small: {
				root: "h-9 gap-3 rounded-lg px-3 text-label-sm",
				icon: "-mx-1",
			},
			xsmall: {
				root: "h-8 gap-2.5 rounded-lg px-2.5 text-label-sm",
				icon: "-mx-1",
			},
			xxsmall: {
				root: "h-7 gap-2.5 rounded-lg px-2 text-label-sm",
				icon: "-mx-1",
			},
		},
	},
	compoundVariants: [
		//#region variant=primary
		{
			variantStyle: "primary",
			mode: "filled",
			class: {
				root: [
					// base
					"bg-primary-base text-static-white",
					// hover
					"hover:bg-primary-darker",
					// focus
					"focus-visible:shadow-button-primary-focus",
				],
			},
		},
		{
			variantStyle: "primary",
			mode: "stroke",
			class: {
				root: [
					// base
					"bg-bg-white-0 text-primary-base ring-primary-base",
					// hover
					"hover:bg-primary-alpha-10 hover:ring-transparent",
					// focus
					"focus-visible:shadow-button-primary-focus",
				],
			},
		},
		{
			variantStyle: "primary",
			mode: "lighter",
			class: {
				root: [
					// base
					"bg-primary-alpha-10 text-primary-base ring-transparent",
					// hover
					"hover:bg-bg-white-0 hover:ring-primary-base",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base",
				],
			},
		},
		{
			variantStyle: "primary",
			mode: "ghost",
			class: {
				root: [
					// base
					"bg-transparent text-primary-base ring-transparent",
					// hover
					"hover:bg-primary-alpha-10",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base",
				],
			},
		},
		//#endregion

		//#region variant=neutral
		{
			variantStyle: "neutral",
			mode: "filled",
			class: {
				root: [
					// base
					"bg-bg-strong-950 text-text-white-0",
					// hover
					"hover:bg-bg-surface-800",
					// focus
					"focus-visible:shadow-button-important-focus",
				],
			},
		},
		{
			variantStyle: "neutral",
			mode: "stroke",
			class: {
				root: [
					// base
					"bg-bg-white-0 text-text-sub-600 shadow-regular-xs ring-stroke-soft-200",
					// hover
					"hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent",
					// focus
					"focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
				],
			},
		},
		{
			variantStyle: "neutral",
			mode: "lighter",
			class: {
				root: [
					// base
					"bg-bg-weak-50 text-text-sub-600 ring-transparent",
					// hover
					"hover:bg-bg-white-0 hover:text-text-strong-950 hover:shadow-regular-xs hover:ring-stroke-soft-200",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
				],
			},
		},
		{
			variantStyle: "neutral",
			mode: "ghost",
			class: {
				root: [
					// base
					"bg-transparent text-text-sub-600 ring-transparent",
					// hover
					"hover:bg-bg-weak-50 hover:text-text-strong-950",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
				],
			},
		},
		//#endregion

		//#region variant=error
		{
			variantStyle: "error",
			mode: "filled",
			class: {
				root: [
					// base
					"bg-error-base text-static-white",
					// hover
					"hover:bg-red-700",
					// focus
					"focus-visible:shadow-button-error-focus",
				],
			},
		},
		{
			variantStyle: "error",
			mode: "stroke",
			class: {
				root: [
					// base
					"bg-bg-white-0 text-error-base ring-error-base",
					// hover
					"hover:bg-red-alpha-10 hover:ring-transparent",
					// focus
					"focus-visible:shadow-button-error-focus",
				],
			},
		},
		{
			variantStyle: "error",
			mode: "lighter",
			class: {
				root: [
					// base
					"bg-red-alpha-10 text-error-base ring-transparent",
					// hover
					"hover:bg-bg-white-0 hover:ring-error-base",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base",
				],
			},
		},
		{
			variantStyle: "error",
			mode: "ghost",
			class: {
				root: [
					// base
					"bg-transparent text-error-base ring-transparent",
					// hover
					"hover:bg-red-alpha-10",
					// focus
					"focus-visible:bg-bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base",
				],
			},
		},
		//#endregion
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
