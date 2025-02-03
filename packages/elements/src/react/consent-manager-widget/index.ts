'use client';

/**
 * A customizable cookie consent banner component with compound components pattern.
 *
 * @packageDocumentation
 */

export {
	ConsentManagerWidgetAccordionSubGroup,
	ConsentManagerWidgetAccordionTrigger,
	ConsentManagerWidgetAccordionContent,
	ConsentManagerWidgetAccordionArrow,
	ConsentManagerWidgetAccordion,
	ConsentManagerWidgetSwitch,
	ConsentManagerWidgetAccordionItems,
	ConsentManagerWidgetAccordionItem,
	AccordionSubGroup,
	AccordionTrigger,
	AccordionContent,
	AccordionArrow,
	Accordion,
	Switch,
	AccordionItems,
	AccordionItem,
} from './atoms/accordion';

export {
	Root,
	ConsentManagerWidgetRoot,
} from './atoms/root';

export {
	AcceptAllButton,
	CustomizeButton,
	SaveButton,
	ConsentManagerWidgetAcceptAllButton,
	ConsentManagerWidgetCustomizeButton,
	ConsentManagerWidgetSaveButton,
} from './atoms/button';

export type { ConsentManagerWidgetTheme } from './theme';
