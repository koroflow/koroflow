"use client";

import * as React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "./primitives/accordion";

import type { AllConsentNames } from "@koroflow/core-js";
import { ChevronDown } from "lucide-react";

import { useConsentManager } from "../hooks/use-consent-manager";
import { Button } from "./primitives/button";
import { CardFooter } from "./primitives/card";
import { Switch } from "./primitives/switch";

interface ConsentCustomizationWidgetProps
	extends React.HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
	hideBranding?: boolean;
}

export const ConsentCustomizationWidget = React.forwardRef<
	HTMLDivElement,
	ConsentCustomizationWidgetProps
>(({ onSave, hideBranding, ...props }, ref) => {
	const {
		consents,
		setConsent,
		saveConsents,
		getDisplayedConsents,
		resetConsents,
	} = useConsentManager();
	const [openItems, setOpenItems] = React.useState<string[]>([]);

	const toggleAccordion = React.useCallback((value: string) => {
		setOpenItems((prev) =>
			prev.includes(value)
				? prev.filter((item) => item !== value)
				: [...prev, value],
		);
	}, []);

	const handleSaveConsents = React.useCallback(() => {
		saveConsents("custom");
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
		<div className="space-y-6" ref={ref} {...props}>
			<Accordion
				type="multiple"
				value={openItems}
				onValueChange={setOpenItems}
				className="w-full"
			>
				{getDisplayedConsents().map((consent) => (
					<AccordionItem value={consent.name} key={consent.name}>
						<div className="flex items-center justify-between py-4">
							<div
								className="flex-grow"
								onClick={() => toggleAccordion(consent.name)}
								onKeyUp={(e) => {
									if (e.key === "Enter") {
										toggleAccordion(consent.name);
									}
								}}
								onKeyDown={(e) => {
									if (e.key === " ") {
										e.preventDefault();
										toggleAccordion(consent.name);
									}
								}}
							>
								<div className="flex items-center justify-between cursor-pointer">
									<span className="font-medium capitalize">
										{consent.name.replace("_", " ")}
									</span>
									<ChevronDown
										className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
											openItems.includes(consent.name) ? "rotate-180" : ""
										}`}
									/>
								</div>
							</div>
							<Switch
								isSelected={consents[consent.name]}
								onChange={(checked) =>
									handleConsentChange(consent.name, checked)
								}
								isDisabled={consent.disabled}
								className="ml-4"
							/>
						</div>
						<AccordionContent>
							<p className="text-sm text-muted-foreground pb-4">
								{consent.description}
							</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<div className="flex justify-between">
				<Button onPress={resetConsents} variant="outline">
					Reset
				</Button>
				<Button onPress={handleSaveConsents}>Save Preferences</Button>
			</div>
			{!hideBranding && (
				<div className="flex justify-center w-full border-t py-4">
					<a
						href="https://koroflow.com"
						className="text-center text-xs text-neutral-500"
					>
						Secured by <span className="text-[#5C8BD6]">Koroflow</span>
					</a>
				</div>
			)}
		</div>
	);
});

ConsentCustomizationWidget.displayName = "ConsentCustomizationWidget";
