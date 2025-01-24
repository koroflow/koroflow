"use client";

import "./consent-manager-widget.css";
import "../ui/components/card.css";
import { Box } from "../primitives/box";

import { type FC, type HTMLAttributes, useState } from "react";
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

export interface ConsentManagerWidgetProps extends HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
	hideBranding?: boolean;
	styles?: ConsentManagerWidgetTheme;
}

const SingaltonConsentManagerWidget = ({
	onSave,
	hideBranding,
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
			{!hideBranding && (
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

export interface ConsentManagerWidgetComponent extends FC<ConsentManagerWidgetProps> {
	AccordionItems: typeof ConsentManagerWidgetAccordionItems;
	AcceptAllButton: typeof ConsentManagerWidgetAcceptAllButton;
	Accordion: typeof ConsentManagerWidgetAccordion;
	AccordionArrow: typeof ConsentManagerWidgetAccordionArrow;
	AccordionContent: typeof ConsentManagerWidgetAccordionContent;
	AccordionItem: typeof ConsentManagerWidgetAccordionItem;
	AccordionSubGroup: typeof ConsentManagerWidgetAccordionSubGroup;
	AccordionTrigger: typeof ConsentManagerWidgetAccordionTrigger;
	Footer: typeof ConsentManagerWidgetFooter;
	FooterSubGroup: typeof ConsentManagerWidgetFooterSubGroup;
	RejectButton: typeof ConsentManagerWidgetRejectButton;
	SaveButton: typeof ConsentManagerWidgetSaveButton;
	Switch: typeof ConsentManagerWidgetSwitch;
}

const ConsentManagerWidget = SingaltonConsentManagerWidget as ConsentManagerWidgetComponent;
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
