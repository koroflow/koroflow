"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";

import { useConsentManager } from "../common/store/consent-manager";
import { ThemeContext } from "../theme/context";

import { Box } from "../primitives/box";
import type { ConsentManagerWidgetStyles } from "./types";

/**
 * Props for the root component of the ConsentManagerWidget.
 *
 * @remarks
 * The root component serves as the top-level container and context provider
 * for the cookie banner. It manages the consent state and styling configuration
 * for all child components.
 *
 * @public
 */
interface ConsentManagerWidgetRootProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * React elements to be rendered within the cookie banner.
	 * Typically includes Content, Title, Description, and Actions components.
	 */
	children: ReactNode;

	/**
	 * @remarks
	 * When true, removes all default styling from the banner and its children.
	 * Useful when implementing completely custom styles.
	 */
	noStyle?: boolean;

	/**
	 * @remarks
	 * Custom styles to be applied to the banner and its child components.
	 * These styles are made available through the ConsentManagerWidget context.
	 */
	styles?: ConsentManagerWidgetStyles;

	/**
	 * @remarks
	 * When true, disables the entrance/exit animations.
	 * Useful for environments where animations are not desired.
	 */
	disableAnimation?: boolean;
}

/**
 * Root component of the ConsentManagerWidget that provides context and styling.
 *
 * @remarks
 * This component:
 * - Provides the ConsentManagerWidget context to all child components
 * - Manages consent state through the consent manager
 * - Handles style distribution to child components
 * - Serves as the main container for the banner
 *
 * @example
 * Basic usage:
 * ```tsx
 * <ConsentManagerWidget.Root>
 *   <ConsentManagerWidget.Content>
 *     {Banner content}
 *   </ConsentManagerWidget.Content>
 * </ConsentManagerWidget.Root>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <ConsentManagerWidget.Root
 *   styles={{
 *     root: "fixed bottom-0 w-full bg-white ",
 *     content: "max-w-4xl mx-auto p-4",
 *     title: "text-xl font-bold",
 *     description: "mt-2 text-gray-600"
 *   }}
 * >
 *   { Banner content}
 * </ConsentManagerWidget.Root>
 * ```
 *
 * @public
 */
export const ConsentManagerWidgetRoot: FC<ConsentManagerWidgetRootProps> = ({
	children,
	className,
	noStyle = false,
	disableAnimation = false,
	styles = {},
	...props
}) => {
	/** Access the consent manager for handling cookie preferences */
	const consentManager = useConsentManager();

	/**
	 * Combine consent manager state with styling configuration
	 * to create the context value for child components
	 */
	const contextValue = {
		...consentManager,
		disableAnimation,
		noStyle,
		styles,
	}; /**
	 * Apply styles from the ConsentManagerWidget context and merge with local styles.
	 * Uses the 'content' style key for consistent theming.
	 */

	return (
		<ThemeContext.Provider value={contextValue}>
			<Box baseClassName="consent-manager-widget" styleKey="root">
				{children}
			</Box>
		</ThemeContext.Provider>
	);
};
