"use client";

import "./accordion.css";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	type ElementType,
	type HTMLAttributes,
	forwardRef,
} from "react";
import { Box } from "../../primitives/box";
import {
	type AllThemeKeys,
	type ClassNameStyle,
	type ExtendThemeKeys,
	type ThemeValue,
	useStyles,
} from "../../theme";
import type { PolymorphicComponentProps } from "../libs/polymorphic";

const ACCORDION_ROOT_NAME = "AccordionRoot";
const ACCORDION_ITEM_NAME = "AccordionItem";
const ACCORDION_ICON_NAME = "AccordionIcon";
const ACCORDION_ARROW_NAME = "AccordionArrow";
const ACCORDION_TRIGGER_NAME = "AccordionTrigger";
const ACCORDION_CONTENT_NAME = "AccordionContent";
const AccordionHeader = AccordionPrimitive.Header;

export type AccordionStylesKeys = {
	"accordion.root"?: ThemeValue;
	"accordion.item": ThemeValue;
	"accordion.trigger": ThemeValue;
	"accordion.icon": ThemeValue;
	"accordion.arrow.open": ThemeValue;
	"accordion.arrow.close": ThemeValue;
	"accordion.content": ThemeValue;
	"accordion.content-inner": ThemeValue;
};

const AccordionRoot = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Root>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & ExtendThemeKeys
>(
	(
		{ className, themeKey = "accordion.root", baseClassName, themeType, style, ...rest },
		forwardedRef,
	) => {
		const accordionStyle = useStyles(themeKey, {
			baseClassName: [baseClassName, "accordion"],
			className,
			themeType,
			style,
		});

		return <AccordionPrimitive.Root ref={forwardedRef} {...rest} {...accordionStyle} />;
	},
);

AccordionRoot.displayName = ACCORDION_ROOT_NAME;

const AccordionItem = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Item>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & ExtendThemeKeys
>(({ className, themeKey, baseClassName, themeType, style, ...rest }, forwardedRef) => {
	const accordionItemStyle = useStyles(themeKey ?? "accordion.item", {
		baseClassName: [baseClassName, "accordion-item"],
		className,
		themeType,
		style,
	});
	return <AccordionPrimitive.Item ref={forwardedRef} {...rest} {...accordionItemStyle} />;
});
AccordionItem.displayName = ACCORDION_ITEM_NAME;

const AccordionTrigger = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & ExtendThemeKeys
>(({ children, className, themeKey, baseClassName, themeType, style, ...rest }, forwardedRef) => {
	const accordionTriggerStyle = useStyles(themeKey ?? "accordion.trigger", {
		baseClassName: [baseClassName, "accordion-trigger"],
		className,
		themeType,
		style,
	});
	return (
		<AccordionPrimitive.Trigger ref={forwardedRef} {...rest} {...accordionTriggerStyle}>
			{children}
		</AccordionPrimitive.Trigger>
	);
});
AccordionTrigger.displayName = ACCORDION_TRIGGER_NAME;

function AccordionIcon<T extends ElementType>({
	className,
	themeKey,
	baseClassName,
	themeType,
	style,
	as,
	...rest
}: PolymorphicComponentProps<T> & ExtendThemeKeys) {
	const accordionIconStyle = useStyles(themeKey ?? "accordion.icon", {
		baseClassName: [baseClassName, "accordion-icon"],
		className,
		themeType,
		style,
	});

	const Component = as || "div";

	return <Component {...rest} {...accordionIconStyle} />;
}
AccordionIcon.displayName = ACCORDION_ICON_NAME;

type AccordionArrowProps = HTMLAttributes<HTMLDivElement> & {
	openIcon?: { Element: ElementType; themeKey: AllThemeKeys } & ClassNameStyle;
	closeIcon?: { Element: ElementType; themeKey: AllThemeKeys } & ClassNameStyle;
};

// open/close
function AccordionArrow({
	openIcon = { Element: Plus, themeKey: "accordion.arrow.open" },
	closeIcon = { Element: Minus, themeKey: "accordion.arrow.close" },
	...rest
}: AccordionArrowProps) {
	const accordionArrowOpenStyle = useStyles(openIcon.themeKey, {
		baseClassName: [openIcon.baseClassName, "accordion-arrow-open"],
		className: openIcon.className,
		themeType: openIcon.themeType,
		style: openIcon.style,
	});
	const accordionArrowClosedStyle = useStyles(closeIcon.themeKey, {
		baseClassName: [closeIcon.baseClassName, "accordion-arrow-close"],
		className: closeIcon.className,
		themeType: closeIcon.themeType,
		style: closeIcon.style,
	});

	return (
		<>
			<openIcon.Element {...rest} {...accordionArrowOpenStyle} />
			<closeIcon.Element {...rest} {...accordionArrowClosedStyle} />
		</>
	);
}
AccordionArrow.displayName = ACCORDION_ARROW_NAME;

const AccordionContent = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Content>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
		theme: { content: ExtendThemeKeys; contentInner: ExtendThemeKeys };
	}
>(({ children, className, theme, ...rest }, forwardedRef) => {
	const accordionContentStyle = useStyles(theme?.content?.themeKey ?? "accordion.content", {
		baseClassName: [theme?.content?.baseClassName, "accordion-content"],
		className,
		themeType: theme?.content?.themeType,
		style: theme?.content?.style,
	});

	return (
		<AccordionPrimitive.Content ref={forwardedRef} {...rest} {...accordionContentStyle}>
			<Box
				{...{
					...theme?.contentInner,
					baseClassName: [theme?.content?.baseClassName, "accordion-content-inner"],
					themeKey: theme?.contentInner?.themeKey ?? "accordion.content-inner",
				}}
			>
				{children}
			</Box>
		</AccordionPrimitive.Content>
	);
});
AccordionContent.displayName = ACCORDION_CONTENT_NAME;

export {
	AccordionRoot as Root,
	AccordionHeader as Header,
	AccordionItem as Item,
	AccordionTrigger as Trigger,
	AccordionIcon as Icon,
	AccordionArrow as Arrow,
	AccordionContent as Content,
};
