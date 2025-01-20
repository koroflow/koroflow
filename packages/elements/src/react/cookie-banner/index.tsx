/**
 * A customizable cookie consent banner component with compound components pattern.
 *
 * @packageDocumentation
 */

import {
	CookieBannerAcceptButton,
	CookieBannerActions,
	CookieBannerActionsSubGroup,
	CookieBannerCustomizeButton,
	CookieBannerRejectButton,
} from "./atoms/actions";
import { CookieBannerCard } from "./atoms/card";
import { CookieBannerContent } from "./atoms/content";
import { CookieBannerDescription } from "./atoms/description";
import { CookieBannerRoot } from "./atoms/root";
import { CookieBannerTitle } from "./atoms/title";
import CookieBanner, {
	type CookieBannerProps,
	type CookieBannerComponent,
} from "./cookie-banner";
import type { CookieBannerStyles } from "./types";

/**
 * Enhanced CookieBanner component with compound components attached.
 *
 * @remarks
 * This is the main export that provides access to all CookieBanner components.
 * It follows the compound components pattern, allowing for flexible composition
 * of the banner's parts.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import CookieBanner from '@your-org/elements';
 *
 * function App() {
 *   return (
 *     <CookieBanner
 *       title="Privacy Notice"
 *       description="We use cookies to enhance your experience."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * Using compound components:
 * ```tsx
 * import CookieBanner from '@your-org/elements';
 *
 * function App() {
 *   return (
 *     <CookieBanner.Root>
 *       <CookieBanner.Content>
 *         <CookieBanner.Title>Cookie Settings</CookieBanner.Title>
 *         <CookieBanner.Description>
 *           Please choose your cookie preferences
 *         </CookieBanner.Description>
 *         <CookieBanner.Actions>
 *           <CookieBanner.RejectButton>Decline</CookieBanner.RejectButton>
 *           <CookieBanner.CustomizeButton>Customize</CookieBanner.CustomizeButton>
 *           <CookieBanner.AcceptButton>Accept All</CookieBanner.AcceptButton>
 *         </CookieBanner.Actions>
 *       </CookieBanner.Content>
 *     </CookieBanner.Root>
 *   );
 * }
 */
const EnhancedCookieBanner = CookieBanner as CookieBannerComponent;
EnhancedCookieBanner.Root = CookieBannerRoot;
EnhancedCookieBanner.Content = CookieBannerContent;
EnhancedCookieBanner.Title = CookieBannerTitle;
EnhancedCookieBanner.Description = CookieBannerDescription;
EnhancedCookieBanner.Actions = CookieBannerActions;
EnhancedCookieBanner.RejectButton = CookieBannerRejectButton;
EnhancedCookieBanner.AcceptButton = CookieBannerAcceptButton;
EnhancedCookieBanner.CustomizeButton = CookieBannerCustomizeButton;
EnhancedCookieBanner.ActionsSubGroup = CookieBannerActionsSubGroup;
EnhancedCookieBanner.Card = CookieBannerCard;

export {
	EnhancedCookieBanner as default,
	CookieBannerRoot,
	CookieBannerContent,
	CookieBannerDescription,
	CookieBannerActions,
	CookieBannerRejectButton,
	CookieBannerAcceptButton,
	CookieBannerCustomizeButton,
	CookieBannerTitle,
};

/**
 * Types for configuring and extending the CookieBanner component.
 *
 * @remarks
 * These types provide TypeScript support for:
 * - Component props and configuration
 * - Style customization
 * - Component composition
 */
export type {
	/**
	 * Configuration options for the CookieBanner component.
	 * Includes styling, content, and behavior options.
	 */
	CookieBannerProps,
	/**
	 * Style configuration for the CookieBanner and its sub-components.
	 * Supports both class names and inline styles.
	 */
	CookieBannerStyles,
	/**
	 * Type definition for the enhanced CookieBanner component with its
	 * compound components attached.
	 */
	CookieBannerComponent,
};
