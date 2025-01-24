"use client";

import "./consent-manager-widget.css";
import { Box } from "../primitives/box";

import { type FC, type HTMLAttributes, forwardRef, useCallback, useState } from "react";
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
import { ConsentManagerWidgetRoot } from "./root";
import type { ConsentManagerWidgetStyles } from "./types";

export interface ConsentManagerWidgetProps extends HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
	hideBranding?: boolean;
	styles?: ConsentManagerWidgetStyles;
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
				styleKey="accordion"
				type="multiple"
				value={openItems}
				onValueChange={setOpenItems}
			>
				<ConsentManagerWidgetAccordionItems />
			</ConsentManagerWidgetAccordion>
			<ConsentManagerWidgetFooter>
				<ConsentManagerWidgetFooterSubGroup>
					<ConsentManagerWidgetRejectButton>Deny</ConsentManagerWidgetRejectButton>
					<ConsentManagerWidgetAcceptAllButton>Accept All</ConsentManagerWidgetAcceptAllButton>
				</ConsentManagerWidgetFooterSubGroup>
				<ConsentManagerWidgetSaveButton>Save</ConsentManagerWidgetSaveButton>
			</ConsentManagerWidgetFooter>
			{!hideBranding && (
				<Box baseClassName="consent-manager-widget-branding" styleKey="branding">
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
