"use client";

import * as React from "react";

import * as Accordion from "../common/primitives/accordion";
import * as Button from "../common/primitives/button";
import * as Switch from "../common/primitives/switch";

import type { AllConsentNames } from "@koroflow/core-js";
import { useConsentManager } from "../common";
import "./consent-manager-widget.css";

interface ConsentCustomizationWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
	hideBranding?: boolean;
}

export const ConsentCustomizationWidget = React.forwardRef<
	HTMLDivElement,
	ConsentCustomizationWidgetProps
>(({ onSave, hideBranding, ...props }, ref) => {
	const { consents, setConsent, saveConsents, getDisplayedConsents, resetConsents } =
		useConsentManager();
	const [openItems, setOpenItems] = React.useState<string[]>([]);

	const handleSaveConsents = React.useCallback(() => {
		saveConsents("custom");
		if (onSave) {
			onSave();
		}
	}, [saveConsents, onSave]);

	const handleDenyConsents = React.useCallback(() => {
		saveConsents("necessary");
		if (onSave) {
			onSave();
		}
	}, [saveConsents, onSave]);

	const handleAcceptAllConsents = React.useCallback(() => {
		saveConsents("all");
		if (onSave) {
			onSave();
		}
	}, [saveConsents, onSave]);

	const handleConsentChange = React.useCallback(
		(name: AllConsentNames, checked: boolean) => {
			setConsent(name, checked);
		},
		[setConsent],
	);

	return (
		<div className="consent-manager-widget" ref={ref} {...props}>
			<Accordion.Root type="multiple" value={openItems} onValueChange={setOpenItems}>
				{getDisplayedConsents().map((consent) => (
					<Accordion.Item value={consent.name} key={consent.name}>
						<Accordion.Trigger>
							<div className="accordion-trigger-sub-group">
								<Accordion.Arrow />
								{consent.name.replace("_", " ").charAt(0).toUpperCase() +
									consent.name.replace("_", " ").slice(1)}
							</div>

							<Switch.Root
								slot="div"
								asChild
								checked={consents[consent.name]}
								onClick={(e) => e.stopPropagation()}
								onKeyUp={(e) => e.stopPropagation()}
								onKeyDown={(e) => e.stopPropagation()}
								onCheckedChange={(checked) => handleConsentChange(consent.name, checked)}
								disabled={consent.disabled}
							/>
						</Accordion.Trigger>
						<Accordion.Content>{consent.description}</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion.Root>
			<div className="consent-manager-widget-footer">
				<div className="consent-manager-widget-footer-sub-group">
					<Button.Root
						onClick={handleDenyConsents}
						variantStyle="neutral"
						mode="lighter"
						size="small"
					>
						Deny
					</Button.Root>
					<Button.Root
						onClick={handleAcceptAllConsents}
						variantStyle="neutral"
						mode="lighter"
						size="small"
					>
						Accept All
					</Button.Root>
				</div>
				<Button.Root
					onClick={handleSaveConsents}
					variantStyle="primary"
					mode="lighter"
					size="small"
				>
					Save
				</Button.Root>
			</div>
			{!hideBranding && (
				<div className="consent-manager-widget-branding">
					<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
						Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
					</a>
				</div>
			)}
		</div>
	);
});

ConsentCustomizationWidget.displayName = "ConsentCustomizationWidget";
