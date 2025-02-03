'use client';

/**
 * @packageDocumentation
 * Provides the main cookie banner component for privacy consent management.
 * Implements an accessible, customizable banner following GDPR and CCPA requirements.
 */

import type { FC, ReactNode } from 'react';

import { ErrorBoundary } from './error-boundary';
import type { CookieBannerTheme } from './types';
import './cookie-banner.css';

import {
	CookieBannerAcceptButton,
	CookieBannerCard,
	CookieBannerCustomizeButton,
	CookieBannerDescription,
	CookieBannerFooter,
	CookieBannerFooterSubGroup,
	CookieBannerHeader,
	CookieBannerRejectButton,
	CookieBannerTitle,
} from '.';
import { ConsentButton } from '../primitives/button';
import { CookieBannerRoot } from './atoms/root';

/**
 * Props for configuring and customizing the CookieBanner component.
 *
 * @remarks
 * Provides comprehensive customization options for the cookie banner's appearance
 * and behavior while maintaining compliance with privacy regulations.
 *
 * @public
 */
export interface CookieBannerProps {
	/**
	 * Custom styles to apply to the banner and its child components
	 * @remarks Allows for deep customization of the banner's appearance while maintaining accessibility
	 */
	theme?: Partial<CookieBannerTheme>;

	/**
	 * When true, removes all default styling from the component
	 * @remarks Useful for implementing completely custom designs
	 */
	noStyle?: boolean;

	/**
	 * Content to display as the banner's title
	 * @remarks Supports string or ReactNode for rich content
	 */
	title?: ReactNode;

	/**
	 * Content to display as the banner's description
	 * @remarks Supports string or ReactNode for rich content
	 */
	description?: ReactNode;

	/**
	 * Content to display on the reject button
	 * @remarks Required by GDPR for explicit consent rejection
	 */
	rejectButtonText?: ReactNode;

	/**
	 * Content to display on the customize button
	 * @remarks Opens detailed consent preferences
	 */
	customizeButtonText?: ReactNode;

	/**
	 * Content to display on the accept button
	 * @remarks Primary action for accepting cookie preferences
	 */
	acceptButtonText?: ReactNode;
}

/**
 * A customizable cookie consent banner component.
 *
 * @remarks
 * This component serves as the main entry point for rendering a cookie consent banner.
 * It provides a structured layout with customizable title, description, and action buttons
 * for accepting, rejecting, or customizing cookie preferences.
 *
 * Key features:
 * - Fully accessible by default
 * - GDPR and CCPA compliant
 * - Customizable appearance
 * - Responsive design
 * - Error boundary protection
 * - Compound component pattern support
 *
 * @example
 * Simple usage with default settings:
 * ```tsx
 * <CookieBanner />
 * ```
 *
 * @example
 * Customized usage with all props:
 * ```tsx
 * <CookieBanner
 *   theme={{
 *     root: "bg-white p-4",
 *     title: "text-xl font-bold",
 *     description: "text-gray-600",
 *     actions: "mt-4 flex gap-2"
 *   }}
 *   title="Cookie Settings"
 *   description="We use cookies to enhance your browsing experience"
 *   rejectButtonText="Decline"
 *   customizeButtonText="Preferences"
 *   acceptButtonText="Allow All"
 * />
 * ```
 *
 * @example
 * Using compound components for custom layout:
 * ```tsx
 * <CookieBanner.Root>
 *   <CookieBanner.Content>
 *     <CookieBanner.Title>Cookie Settings</CookieBanner.Title>
 *     <CookieBanner.Description>
 *       Choose your cookie preferences
 *     </CookieBanner.Description>
 *     <CookieBanner.Actions>
 *       <CookieBanner.RejectButton>Decline</CookieBanner.RejectButton>
 *       <CookieBanner.CustomizeButton>Customize</CookieBanner.CustomizeButton>
 *       <CookieBanner.AcceptButton>Accept</CookieBanner.AcceptButton>
 *     </CookieBanner.Actions>
 *   </CookieBanner.Content>
 * </CookieBanner.Root>
 * ```
 *
 * @public
 */
const SingaltonCookieBanner: FC<CookieBannerProps> = ({
	theme,
	noStyle,
	title = 'We value your privacy',
	description = 'This site uses cookies to improve your browsing experience, analyze site traffic, and show personalized content.',
	rejectButtonText = 'Reject All',
	customizeButtonText = 'Customize',
	acceptButtonText = 'Accept All',
}) => {
	return (
		<ErrorBoundary
			fallback={<div>Something went wrong with the Cookie Banner.</div>}
		>
			<CookieBannerRoot theme={theme} noStyle={noStyle}>
				<CookieBannerCard>
					<CookieBannerHeader>
						<CookieBannerTitle>{title}</CookieBannerTitle>
						<CookieBannerDescription>{description}</CookieBannerDescription>
					</CookieBannerHeader>
					<CookieBannerFooter>
						<CookieBannerFooterSubGroup>
							<ConsentButton
								action="reject-consent"
								closeCookieBanner
								themeKey="cookie-banner.footer.reject-button"
							>
								{rejectButtonText}
							</ConsentButton>
							<ConsentButton
								action="open-consent-dialog"
								closeCookieBanner
								themeKey="cookie-banner.footer.customize-button"
							>
								{customizeButtonText}
							</ConsentButton>
						</CookieBannerFooterSubGroup>
						<ConsentButton
							action="accept-consent"
							variant="primary"
							closeCookieBanner
							themeKey="cookie-banner.footer.accept-button"
						>
							{acceptButtonText}
						</ConsentButton>
					</CookieBannerFooter>
				</CookieBannerCard>
			</CookieBannerRoot>
		</ErrorBoundary>
	);
};

/**
 * Component type definition for the CookieBanner with its compound components.
 *
 * @remarks
 * This interface extends the base CookieBanner component with additional sub-components
 * that can be used to compose the banner's structure. Each component is designed to be
 * fully accessible and customizable while maintaining compliance with privacy regulations.
 *
 * @public
 */
export interface CookieBannerComponent extends FC<CookieBannerProps> {
	/** Root container component */
	Root: typeof CookieBannerRoot;
	/** Content wrapper component */
	Header: typeof CookieBannerHeader;
	/** Title component */
	Title: typeof CookieBannerTitle;
	/** Description component */
	Description: typeof CookieBannerDescription;
	/** Actions container component */
	Footer: typeof CookieBannerFooter;
	/** Reject button component */
	RejectButton: typeof CookieBannerRejectButton;
	/** Accept button component */
	AcceptButton: typeof CookieBannerAcceptButton;
	/** Customize button component */
	CustomizeButton: typeof CookieBannerCustomizeButton;
	/** Card component */
	Card: typeof CookieBannerCard;
	/** Actions sub group component */
	FooterSubGroup: typeof CookieBannerFooterSubGroup;
}

const CookieBanner = SingaltonCookieBanner as CookieBannerComponent;

// Attach all sub-components
CookieBanner.Root = CookieBannerRoot;
CookieBanner.Header = CookieBannerHeader;
CookieBanner.Title = CookieBannerTitle;
CookieBanner.Description = CookieBannerDescription;
CookieBanner.Footer = CookieBannerFooter;
CookieBanner.RejectButton = CookieBannerRejectButton;
CookieBanner.AcceptButton = CookieBannerAcceptButton;
CookieBanner.CustomizeButton = CookieBannerCustomizeButton;
CookieBanner.FooterSubGroup = CookieBannerFooterSubGroup;
CookieBanner.Card = CookieBannerCard;

export default CookieBanner;
