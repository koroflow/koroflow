"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { AllConsentNames } from "@koroflow/core-js";

import { useConsentManager } from "../hooks/use-consent-manager";
import {
	Disclosure,
	DisclosureGroup,
	DisclosureHeader,
	DisclosurePanel,
} from "./primitives/disclosure";
import { Switch } from "./primitives/switch";
import { Button } from "./primitives/button";

interface ConsentCustomizationWidgetProps
	extends React.HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
}

export const ConsentCustomizationWidget = React.forwardRef<
	HTMLDivElement,
	ConsentCustomizationWidgetProps
>(({ onSave, ...props }, ref) => {
	const {
		consents,
		setConsent,
		saveConsents,
		getDisplayedConsents,
		resetConsents,
	} = useConsentManager();
	const [openItems, setOpenItems] = React.useState<string[]>([]);

	const toggleDisclosure = React.useCallback((value: string) => {
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
			<DisclosureGroup defaultExpandedKeys={openItems}>
				{getDisplayedConsents().map((consent) => (
					<Disclosure key={consent.name}>
						<DisclosureHeader className="flex items-center justify-between py-4">
							<div
								className="flex-grow cursor-pointer"
								onClick={() => toggleDisclosure(consent.name)}
								onKeyUp={() => toggleDisclosure(consent.name)}
								onKeyDown={() => toggleDisclosure(consent.name)}
							>
								<div className="flex items-center justify-between">
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
						</DisclosureHeader>
						<DisclosurePanel>
							<p className="text-sm text-muted-foreground pb-4">
								{consent.description}
							</p>
						</DisclosurePanel>
					</Disclosure>
				))}
			</DisclosureGroup>
			<div className="flex justify-between">
				<Button onPress={resetConsents} variant="outline">
					Reset
				</Button>
				<Button onPress={handleSaveConsents}>Save Preferences</Button>
			</div>
		</div>
	);
});

ConsentCustomizationWidget.displayName = "ConsentCustomizationWidget";
