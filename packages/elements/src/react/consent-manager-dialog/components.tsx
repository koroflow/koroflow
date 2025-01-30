/**
 * @packageDocumentation
 * Provides the core components for building privacy consent management interfaces.
 * Implements compound component pattern with accessibility and customization support.
 */

import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	type FC,
	type Ref,
	forwardRef,
	useCallback,
} from "react";
import { type AllConsentNames, useConsentManager } from "../common";
import { Box, type BoxProps } from "../primitives/box";
import { ConsentButton } from "../primitives/button";
import type { ConsentButtonProps } from "../primitives/button.types";
import type { ThemeContextValue } from "../theme";
import { Item as AccordionItem } from "../ui/components/accordion";
import * as Accordion from "../ui/components/accordion";
import * as Switch from "../ui/components/switch";

import type { ConsentManagerWidgetRoot } from "../consent-manager-widget/atoms/root";
import type { ConsentManagerDialogTheme } from "./theme";

/**
 * Accordion sub-group component for organizing consent options.
 *
 * @remarks
 * - Provides visual grouping for related consent options
 * - Supports theme customization
 * - Maintains accessibility structure
 */
const ConsentManagerWidgetAccordionSubGroup = forwardRef<
	HTMLDivElement,
	Omit<BoxProps, "themeKey">
>(({ children, ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="accordion-trigger-sub-group"
			themeKey={"consent-manager-widget.accordion.trigger-sub-group"}
			{...props}
		>
			{children}
		</Box>
	);
});

const ConsentManagerWidgetAccordionTrigger = Accordion.Trigger;
const ConsentManagerWidgetAccordionContent = Accordion.Content;
const ConsentManagerWidgetAccordionArrow = Accordion.Arrow;
const ConsentManagerWidgetAccordion = Accordion.Root;
const ConsentManagerWidgetSwitch = Switch.Root;

/**
 * Renders a list of consent options as accordion items.
 *
 * @remarks
 * Key features:
 * - Automatically generates items from consent configuration
 * - Handles consent state management
 * - Implements accessible toggle controls
 * - Supports keyboard navigation
 *
 * @example
 * ```tsx
 * <ConsentManagerWidgetAccordion>
 *   <ConsentManagerWidgetAccordionItems />
 * </ConsentManagerWidgetAccordion>
 * ```
 */
export const ConsentManagerWidgetAccordionItems = () => {
	const { consents, setConsent, getDisplayedConsents } = useConsentManager();
	const handleConsentChange = useCallback(
		(name: AllConsentNames, checked: boolean) => {
			setConsent(name, checked);
		},
		[setConsent],
	);
	return getDisplayedConsents().map((consent) => (
		<ConsentManagerWidgetAccordionItem
			value={consent.name}
			key={consent.name}
			themeKey="consent-manager-widget.accordion.item"
		>
			<ConsentManagerWidgetAccordionTrigger themeKey="consent-manager-widget.accordion.trigger">
				<ConsentManagerWidgetAccordionSubGroup>
					<ConsentManagerWidgetAccordionArrow />
					{consent.name.replace("_", " ").charAt(0).toUpperCase() +
						consent.name.replace("_", " ").slice(1)}
				</ConsentManagerWidgetAccordionSubGroup>

				<ConsentManagerWidgetSwitch
					checked={consents[consent.name]}
					onClick={(e) => e.stopPropagation()}
					onKeyUp={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					onCheckedChange={(checked) => handleConsentChange(consent.name, checked)}
					disabled={consent.disabled}
					theme={{
						root: { themeKey: "consent-manager-widget.switch" },
						thumb: { themeKey: "consent-manager-widget.switch.thumb" },
						track: { themeKey: "consent-manager-widget.switch.track" },
					}}
				/>
			</ConsentManagerWidgetAccordionTrigger>
			<ConsentManagerWidgetAccordionContent
				theme={{
					content: { themeKey: "consent-manager-widget.accordion.content" },
					contentInner: { themeKey: "consent-manager-widget.accordion.content" },
				}}
			>
				{consent.description}
			</ConsentManagerWidgetAccordionContent>
		</ConsentManagerWidgetAccordionItem>
	));
};
const ConsentManagerWidgetAccordionItem = forwardRef<
	ComponentRef<typeof AccordionItem>,
	ComponentPropsWithoutRef<typeof AccordionItem>
>(({ className, ...rest }, forwardedRef) => {
	return <AccordionItem ref={forwardedRef} {...rest} />;
});

/**
 * Footer component for consent management actions.
 *
 * @remarks
 * - Contains primary action buttons
 * - Supports customization through theme
 * - Maintains consistent layout
 */
const ConsentManagerWidgetFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="consent-manager-widget-footer"
				{...props}
				themeKey="consent-manager-widget.footer"
			>
				{children}
			</Box>
		);
	},
);

const ConsentManagerWidgetFooterSubGroup = forwardRef<HTMLDivElement, BoxProps>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="consent-manager-widget-footer-sub-group"
				{...props}
				themeKey="consent-manager-widget.footer.sub-group"
			>
				{children}
			</Box>
		);
	},
);

/**
 * Button to reject all non-essential cookies.
 *
 * @remarks
 * - Sets all optional consents to false
 * - Maintains required consents
 * - Closes dialog after action
 */
const ConsentManagerWidgetRejectButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				variant="neutral"
				mode="stroke"
				size="small"
				action="reject-consent"
				{...props}
				themeKey="consent-manager-widget.footer.reject-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

/**
 * Button to accept all available cookies.
 *
 * @remarks
 * - Enables all consent options
 * - Closes dialog after action
 * - Triggers necessary callbacks
 */
const ConsentManagerWidgetAcceptAllButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				variant="neutral"
				mode="stroke"
				size="small"
				action="accept-consent"
				{...props}
				themeKey="consent-manager-widget.footer.accept-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

const ConsentManagerWidgetCustomizeButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				action="open-consent-dialog"
				{...props}
				themeKey="consent-manager-widget.footer.customize-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

const ConsentManagerWidgetSaveButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				action="custom-consent"
				variant="primary"
				closeCustomizeDialog
				{...props}
				themeKey="consent-manager-widget.footer.save-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

/**
 * Component type definition for the ConsentManagerWidget with its compound components.
 *
 * @remarks
 * This interface defines the complete API surface of the consent manager widget,
 * including all sub-components needed to build the interface.
 *
 * @public
 */
export interface ConsentManagerWidgetComponent
	extends FC<ThemeContextValue<ConsentManagerDialogTheme>> {
	/** Root container component */
	Root: typeof ConsentManagerWidgetRoot;
	/** Accordion item for individual consent options */
	AccordionItem: typeof ConsentManagerWidgetAccordionItem;
	/** Visual grouping for related consent options */
	AccordionSubGroup: typeof ConsentManagerWidgetAccordionSubGroup;
	/** Renders all consent options */
	AccordionItems: typeof ConsentManagerWidgetAccordionItems;
	/** Container for action buttons */
	Footer: typeof ConsentManagerWidgetFooter;
	/** Groups related footer elements */
	FooterSubGroup: typeof ConsentManagerWidgetFooter;
	/** Button to reject optional consents */
	RejectButton: typeof ConsentManagerWidgetRejectButton;
	/** Button to open detailed settings */
	CustomizeButton: typeof ConsentManagerWidgetCustomizeButton;
	/** Button to save current selections */
	SaveButton: typeof ConsentManagerWidgetSaveButton;
}

export {
	ConsentManagerWidgetAccordionSubGroup,
	ConsentManagerWidgetFooter,
	ConsentManagerWidgetFooterSubGroup,
	ConsentManagerWidgetAccordionItem,
	ConsentManagerWidgetRejectButton,
	ConsentManagerWidgetCustomizeButton,
	ConsentManagerWidgetSaveButton,
	ConsentManagerWidgetAcceptAllButton,
	ConsentManagerWidgetAccordion,
	ConsentManagerWidgetAccordionTrigger,
	ConsentManagerWidgetAccordionContent,
	ConsentManagerWidgetAccordionArrow,
	ConsentManagerWidgetSwitch,
};
