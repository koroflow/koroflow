"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { useConsentManager } from "../../common";
import { Box } from "../../primitives/box";
import { ThemeContext, type ThemeContextValue } from "../../theme";
import type { ConsentManagerWidgetTheme } from "../theme";

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
export const ConsentManagerWidgetRoot: FC<
	ThemeContextValue<ConsentManagerWidgetTheme> & {
		children: ReactNode;
	}
> = ({ children, noStyle = false, disableAnimation = false, theme = {}, ...props }) => {
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
		theme,
	}; /**
	 * Apply styles from the ConsentManagerWidget context and merge with local styles.
	 * Uses the 'content' style key for consistent theming.
	 */

	return (
		<ThemeContext.Provider value={contextValue}>
			<Box baseClassName="consent-manager-widget" themeKey="consent-manager-widget.root" {...props}>
				{children}
			</Box>
		</ThemeContext.Provider>
	);
};
