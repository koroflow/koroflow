"use client";

/**
 * @packageDocumentation
 * A collection of components for building privacy consent management dialogs.
 * Built with accessibility and customization in mind, following GDPR, CCPA, and other privacy regulation requirements.
 */

import { type Ref, forwardRef } from "react";
import { Box, type BoxProps } from "../../primitives/box";
import type { ClassNameStyle } from "../../theme";
import ConsentManagerWidget from "../consent-manager-widget";

/**
 * Props for the DialogCard and related components
 * @public
 */
type DialogCardProps = {
	/** The content to be rendered inside the dialog card */
	children?: React.ReactNode;
} & ClassNameStyle;

/**
 * The root component for creating a privacy consent dialog card.
 * Provides the main container and styling for the consent interface.
 *
 * @example
 * ```tsx
 * <DialogCard>
 *   <DialogHeader>
 *     <DialogHeaderTitle>Privacy Settings</DialogHeaderTitle>
 *   </DialogHeader>
 *   <DialogContent>
 *     <ConsentManagerWidget />
 *   </DialogContent>
 * </DialogCard>
 * ```
 */
const DialogCard = forwardRef<HTMLDivElement, DialogCardProps>(({ children, ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="card consent-manager-dialog-card"
			{...props}
			themeKey="consent-manager-widget.dialog.root"
		>
			{children}
		</Box>
	);
});

/**
 * The header section of the privacy dialog.
 * Should contain the DialogHeaderTitle and optionally DialogHeaderDescription.
 *
 * @remarks
 * - Provides semantic structure for accessibility
 * - Should be the first child of DialogCard
 * - Styled according to the theme configuration
 */
const DialogHeader = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-header consent-manager-dialog-card"
				{...props}
				themeKey="consent-manager-widget.dialog.header"
			>
				{children}
			</Box>
		);
	},
);

/**
 * The title component for the privacy dialog header.
 * Displays the main heading of the consent management interface.
 *
 * @remarks
 * - Uses proper heading semantics for accessibility
 * - Should be used within DialogHeader
 * - Supports theme customization
 */
const DialogHeaderTitle = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-title"
				themeKey="consent-manager-widget.dialog.title"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

/**
 * The description component for the privacy dialog header.
 * Provides additional context about privacy settings and consent choices.
 *
 * @remarks
 * - Should be used after DialogHeaderTitle
 * - Supports theme customization
 * - Important for explaining privacy choices to users
 */
const DialogHeaderDescription = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-description"
				themeKey="consent-manager-widget.dialog.description"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

/**
 * The main content area of the privacy dialog.
 * Contains the consent management interface and privacy controls.
 *
 * @remarks
 * - Typically contains ConsentManagerWidget
 * - Supports custom content and styling
 * - Handles user interactions with privacy settings
 */
const DialogContent = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-content"
				themeKey="consent-manager-widget.dialog.content"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

/**
 * The footer section of the privacy dialog.
 * Contains branding and additional privacy-related links.
 *
 * @remarks
 * - Should be the last child of DialogCard
 * - Includes Koroflow branding by default
 * - Can be customized through theme configuration
 */
const DialogFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(({ ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="card-footer"
			themeKey="consent-manager-widget.dialog.footer"
			{...props}
		>
			<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
				Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
			</a>
		</Box>
	);
});

/**
 * A pre-configured privacy settings dialog card.
 * Combines all dialog components with default content for privacy customization.
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.noStyle] - When true, removes default styling
 *
 * @example
 * ```tsx
 * <ConsentCustomizationCard noStyle={false} />
 * ```
 *
 * @remarks
 * - Provides a complete privacy settings interface
 * - Follows GDPR and CCPA requirements
 * - Includes consent type management
 * - Built-in accessibility features
 */
export const ConsentCustomizationCard = ({ noStyle }: { noStyle?: boolean }) => (
	<DialogCard>
		<DialogHeader>
			<DialogHeaderTitle>Privacy Settings</DialogHeaderTitle>
			<DialogHeaderDescription>
				Customize your privacy settings here. You can choose which types of cookies and tracking
				technologies you allow.
			</DialogHeaderDescription>
		</DialogHeader>
		<DialogContent>
			<ConsentManagerWidget hideBrading noStyle={noStyle} useProvider={false} />
		</DialogContent>
		<DialogFooter>
			<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
				Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
			</a>
		</DialogFooter>
	</DialogCard>
);
