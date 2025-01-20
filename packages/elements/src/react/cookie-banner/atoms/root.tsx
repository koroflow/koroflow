"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { useConsentManager } from "../../common/store/consent-manager";
import { CookieBannerContext, type CookieBannerContextValue } from "../context";
import { useStyles } from "../hooks/use-styles";
import type { CookieBannerStyles } from "../types";

/**
 * Props for the root component of the CookieBanner.
 *
 * @remarks
 * The root component serves as the top-level container and context provider
 * for the cookie banner. It manages the consent state and styling configuration
 * for all child components.
 *
 * @public
 */
interface CookieBannerRootProps extends HTMLAttributes<HTMLDivElement> {
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
	 * These styles are made available through the CookieBanner context.
	 */
	styles?: CookieBannerStyles;

	/**
	 * @remarks
	 * When true, disables the entrance/exit animations.
	 * Useful for environments where animations are not desired.
	 */
	disableAnimation?: boolean;
}

/**
 * Root component of the CookieBanner that provides context and styling.
 *
 * @remarks
 * This component:
 * - Provides the CookieBanner context to all child components
 * - Manages consent state through the consent manager
 * - Handles style distribution to child components
 * - Serves as the main container for the banner
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CookieBanner.Root>
 *   <CookieBanner.Content>
 *     {Banner content}
 *   </CookieBanner.Content>
 * </CookieBanner.Root>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <CookieBanner.Root
 *   styles={{
 *     root: "fixed bottom-0 w-full bg-white shadow-lg",
 *     content: "max-w-4xl mx-auto p-4",
 *     title: "text-xl font-bold",
 *     description: "mt-2 text-gray-600"
 *   }}
 * >
 *   { Banner content}
 * </CookieBanner.Root>
 * ```
 *
 * @public
 */
export const CookieBannerRoot: FC<CookieBannerRootProps> = ({
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
	const contextValue: CookieBannerContextValue = {
		...consentManager,
		disableAnimation,
		noStyle,
		styles,
	};

	return (
		<CookieBannerContext.Provider value={contextValue}>
			<CookieBannerRootChildren className={className} {...props}>
				{children}
			</CookieBannerRootChildren>
		</CookieBannerContext.Provider>
	);
};

/**
 * Internal component that handles style application for the root element.
 *
 * @remarks
 * This component is separated from the main root component to avoid circular
 * dependencies when accessing the CookieBanner context. It handles the actual
 * DOM rendering and style application.
 *
 * @internal
 */
const CookieBannerRootChildren: FC<CookieBannerRootProps> = ({
	children,
	className,
	...props
}) => {
	/**
	 * Apply styles from the CookieBanner context and merge with local styles.
	 * Uses the 'root' style key for consistent theming.
	 */
	const rootStyle = useStyles({
		baseClassName: "bg-gray-2 ring-gray-a3 rounded-xl ring-1",
		componentStyle: className,
		styleKey: "root",
	});

	return (
		<div {...rootStyle} {...props}>
			{children}
		</div>
	);
};
