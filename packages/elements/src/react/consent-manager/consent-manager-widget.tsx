/**
 * @packageDocumentation
 * Provides the main widget component for privacy consent management.
 * Implements a compound component pattern for flexible consent interface building.
 */

"use client";

import "./consent-manager-widget.css";
import "../ui/components/card.css";
import { Box } from "../primitives/box";

import { type FC, type HTMLAttributes, useState } from "react";
import type { ThemeContextValue } from "../theme";
import { ConsentManagerWidgetRoot } from "./atoms/root";
import {
	ConsentManagerWidgetAcceptAllButton,
	ConsentManagerWidgetAccordion,
	ConsentManagerWidgetAccordionArrow,
	ConsentManagerWidgetAccordionContent,
	ConsentManagerWidgetAccordionItem,
	ConsentManagerWidgetAccordionItems,
	ConsentManagerWidgetAccordionSubGroup,
	ConsentManagerWidgetAccordionTrigger,
	ConsentManagerWidgetFooter,
	ConsentManagerWidgetFooterSubGroup,
	ConsentManagerWidgetRejectButton,
	ConsentManagerWidgetSaveButton,
	ConsentManagerWidgetSwitch,
} from "./components";
import type { ConsentManagerWidgetTheme } from "./theme";

/**
 * Props for the ConsentManagerWidget component
 * 
 * @remarks
 * Extends ThemeContextValue to provide comprehensive theming support
 * while maintaining type safety for consent management specific features.
 */
interface ConsentManagerWidgetProps extends ThemeContextValue<ConsentManagerWidgetTheme> {
	/** Hides the Koroflow branding when true */
	hideBrading?: boolean;
}

/**
 * The main consent management widget component.
 * Provides a pre-configured interface for managing privacy consents.
 * 
 * @remarks
 * Key features:
 * - Implements compound component pattern for flexible composition
 * - Manages consent state and user interactions
 * - Provides accessible controls for consent management
 * - Supports comprehensive theming
 * - Handles accordion state management
 * 
 * @example
 * Basic usage:
 * ```tsx
 * <ConsentManagerWidget>
 *   <ConsentManagerWidget.AccordionItems />
 *   <ConsentManagerWidget.Footer>
 *     <ConsentManagerWidget.RejectButton>
 *       Deny
 *     </ConsentManagerWidget.RejectButton>
 *     <ConsentManagerWidget.AcceptAllButton>
 *       Accept All
 *     </ConsentManagerWidget.AcceptAllButton>
 *   </ConsentManagerWidget.Footer>
 * </ConsentManagerWidget>
 * ```
 * 
 * @example
 * With custom styling:
 * ```tsx
 * <ConsentManagerWidget
 *   theme={{
 *     root: "custom-root-class",
 *     accordion: "custom-accordion-class",
 *     footer: "custom-footer-class"
 *   }}
 *   hideBrading={true}
 * />
 * ```
 */
const SingaltonConsentManagerWidget = ({
	hideBrading,
	...props
}: ConsentManagerWidgetProps) => {
	const [openItems, setOpenItems] = useState<string[]>([]);

	return (
		<ConsentManagerWidgetRoot {...props}>
			<ConsentManagerWidgetAccordion
				themeKey="consent-manager-widget.accordion"
				type="multiple"
				value={openItems}
				onValueChange={setOpenItems}
			>
				<ConsentManagerWidgetAccordionItems />
			</ConsentManagerWidgetAccordion>
			<ConsentManagerWidgetFooter>
				<ConsentManagerWidgetFooterSubGroup themeKey="consent-manager-widget.footer.sub-group">
					<ConsentManagerWidgetRejectButton themeKey="consent-manager-widget.footer.reject-button">
						Deny
					</ConsentManagerWidgetRejectButton>
					<ConsentManagerWidgetAcceptAllButton themeKey="consent-manager-widget.footer.accept-button">
						Accept All
					</ConsentManagerWidgetAcceptAllButton>
				</ConsentManagerWidgetFooterSubGroup>
				<ConsentManagerWidgetSaveButton themeKey="consent-manager-widget.footer.save-button">
					Save
				</ConsentManagerWidgetSaveButton>
			</ConsentManagerWidgetFooter>
			{!hideBrading && (
				<Box
					baseClassName="consent-manager-widget-branding"
					themeKey="consent-manager-widget.branding"
				>
					<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
						Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
					</a>
				</Box>
			)}
		</ConsentManagerWidgetRoot>
	);
};

SingaltonConsentManagerWidget.displayName = "ConsentManagerWidget";

/**
 * Interface defining the compound components available in ConsentManagerWidget
 * 
 * @remarks
 * Provides type definitions for all sub-components that can be used
 * to build custom consent management interfaces.
 * 
 * @public
 */
export interface ConsentManagerWidgetComponent
	extends FC<ConsentManagerWidgetProps> {
	/** Root container component */
	AccordionItems: typeof ConsentManagerWidgetAccordionItems;
	/** Button to accept all consent options */
	AcceptAllButton: typeof ConsentManagerWidgetAcceptAllButton;
	/** Accordion container for consent options */
	Accordion: typeof ConsentManagerWidgetAccordion;
	/** Visual indicator for expandable sections */
	AccordionArrow: typeof ConsentManagerWidgetAccordionArrow;
	/** Container for accordion item content */
	AccordionContent: typeof ConsentManagerWidgetAccordionContent;
	/** Individual accordion item */
	AccordionItem: typeof ConsentManagerWidgetAccordionItem;
	/** Groups related accordion items */
	AccordionSubGroup: typeof ConsentManagerWidgetAccordionSubGroup;
	/** Trigger for expanding/collapsing accordion items */
	AccordionTrigger: typeof ConsentManagerWidgetAccordionTrigger;
	/** Footer container */
	Footer: typeof ConsentManagerWidgetFooter;
	/** Groups related footer elements */
	FooterSubGroup: typeof ConsentManagerWidgetFooterSubGroup;
	/** Button to reject optional consents */
	RejectButton: typeof ConsentManagerWidgetRejectButton;
	/** Button to save current selections */
	SaveButton: typeof ConsentManagerWidgetSaveButton;
	/** Toggle switch for individual consents */
	Switch: typeof ConsentManagerWidgetSwitch;
}

/**
 * The main ConsentManagerWidget component with all its compound components.
 * 
 * @remarks
 * This is the primary export that combines the base widget with all its
 * sub-components for building custom consent management interfaces.
 */
const ConsentManagerWidget = SingaltonConsentManagerWidget as ConsentManagerWidgetComponent;

// Attach all sub-components
ConsentManagerWidget.AccordionItems = ConsentManagerWidgetAccordionItems;
ConsentManagerWidget.AcceptAllButton = ConsentManagerWidgetAcceptAllButton;
ConsentManagerWidget.Accordion = ConsentManagerWidgetAccordion;
ConsentManagerWidget.AccordionArrow = ConsentManagerWidgetAccordionArrow;
ConsentManagerWidget.AccordionContent = ConsentManagerWidgetAccordionContent;
ConsentManagerWidget.AccordionItem = ConsentManagerWidgetAccordionItem;
ConsentManagerWidget.AccordionSubGroup = ConsentManagerWidgetAccordionSubGroup;
ConsentManagerWidget.AccordionTrigger = ConsentManagerWidgetAccordionTrigger;
ConsentManagerWidget.Footer = ConsentManagerWidgetFooter;
ConsentManagerWidget.FooterSubGroup = ConsentManagerWidgetFooterSubGroup;
ConsentManagerWidget.RejectButton = ConsentManagerWidgetRejectButton;
ConsentManagerWidget.SaveButton = ConsentManagerWidgetSaveButton;
ConsentManagerWidget.Switch = ConsentManagerWidgetSwitch;

export default ConsentManagerWidget;
