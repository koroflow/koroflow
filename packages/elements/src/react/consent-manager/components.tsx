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
import { Item as AccordionItem } from "../ui/components/accordion";
import * as Accordion from "../ui/components/accordion";
import * as Switch from "../ui/components/switch";
import type { ConsentManagerWidgetProps } from "./consent-manager-widget";
import type { ConsentManagerWidgetRoot } from "./root";

const ConsentManagerWidgetAccordionSubGroup = forwardRef<
	HTMLDivElement,
	Omit<BoxProps, "styleKey">
>(({ children, ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="accordion-trigger-sub-group"
			styleKey={["accordion", "trigger-sub-group"]}
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
			styleKey="accordion-item"
		>
			<ConsentManagerWidgetAccordionTrigger>
				<ConsentManagerWidgetAccordionSubGroup>
					<ConsentManagerWidgetAccordionArrow />
					{consent.name.replace("_", " ").charAt(0).toUpperCase() +
						consent.name.replace("_", " ").slice(1)}
				</ConsentManagerWidgetAccordionSubGroup>

				<ConsentManagerWidgetSwitch
					slot="div"
					asChild
					checked={consents[consent.name]}
					onClick={(e) => e.stopPropagation()}
					onKeyUp={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					onCheckedChange={(checked) => handleConsentChange(consent.name, checked)}
					disabled={consent.disabled}
				/>
			</ConsentManagerWidgetAccordionTrigger>
			<ConsentManagerWidgetAccordionContent styleKey="accordion-content">
				{consent.description}
			</ConsentManagerWidgetAccordionContent>
		</ConsentManagerWidgetAccordionItem>
	));
};
const ConsentManagerWidgetAccordionItem = forwardRef<
	ComponentRef<typeof AccordionItem>,
	ComponentPropsWithoutRef<typeof AccordionItem>
>(({ className, ...rest }, forwardedRef) => {
	return <AccordionItem ref={forwardedRef} baseClassName="accordion-item" {...rest} />;
});

const ConsentManagerWidgetFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="consent-manager-widget-footer"
				styleKey={["footer"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const ConsentManagerWidgetFooterSubGroup = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="consent-manager-widget-footer-sub-group"
				styleKey={["footer", "subgroup"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const ConsentManagerWidgetRejectButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"reject-button">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			variant="neutral"
			mode="stroke"
			size="small"
			action="reject-consent"
			styleKey={["footer", "reject-button"]}
			{...props}
		>
			{children}
		</ConsentButton>
	);
});
const ConsentManagerWidgetAcceptAllButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"accept-button">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			variant="neutral"
			mode="stroke"
			size="small"
			action="accept-consent"
			styleKey={["footer", "accept-button"]}
			{...props}
		>
			{children}
		</ConsentButton>
	);
});

const ConsentManagerWidgetCustomizeButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"customize-button">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			action="open-consent-dialog"
			styleKey={["footer", "customize-button"]}
			{...props}
		>
			{children}
		</ConsentButton>
	);
});

const ConsentManagerWidgetSaveButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"save-button">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			action="custom-consent"
			variant="primary"
			closeCustomizeDialog
			styleKey={["footer", "save-button"]}
			{...props}
		>
			{children}
		</ConsentButton>
	);
});

/**
 * Component type definition for the ConsentManagerWidget with its compound components.
 *
 * @remarks
 * This interface extends the base ConsentManagerWidget component with additional sub-components
 * that can be used to compose the banner's structure.
 *
 * @public
 */
export interface ConsentManagerWidgetComponent extends FC<ConsentManagerWidgetProps> {
	/** Root container component */
	Root: typeof ConsentManagerWidgetRoot;
	/** Content wrapper component */
	AccordionItem: typeof ConsentManagerWidgetAccordionItem;
	/** Title component */
	AccordionSubGroup: typeof ConsentManagerWidgetAccordionSubGroup;
	/** Accordion items component */
	AccordionItems: typeof ConsentManagerWidgetAccordionItems;
	/** Actions container component */
	Footer: typeof ConsentManagerWidgetFooter;
	/** Actions sub group component */
	FooterSubGroup: typeof ConsentManagerWidgetFooter;
	/** Reject button component */
	RejectButton: typeof ConsentManagerWidgetRejectButton;
	/** Customize button component */
	CustomizeButton: typeof ConsentManagerWidgetCustomizeButton;
	/** Accept button component */
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
