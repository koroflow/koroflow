"use client";

import "./accordion.css";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	type ElementType,
	type HTMLAttributes,
	type Ref,
	forwardRef,
} from "react";
import { Box, type BoxProps } from "../../primitives/box";
import type { ClassNameStyleWithKey } from "../../theme/types";
import { useStyles } from "../../theme/useStyle";
import type { PolymorphicComponentProps } from "../libs/polymorphic";

const ACCORDION_ROOT_NAME = "AccordionRoot";
const ACCORDION_ITEM_NAME = "AccordionItem";
const ACCORDION_ICON_NAME = "AccordionIcon";
const ACCORDION_ARROW_NAME = "AccordionArrow";
const ACCORDION_TRIGGER_NAME = "AccordionTrigger";
const ACCORDION_CONTENT_NAME = "AccordionContent";
const AccordionHeader = AccordionPrimitive.Header;

const AccordionRoot = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Root>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & ClassNameStyleWithKey
>(
	(
		{ className, styleKey = ["accordion", "root"], baseClassName, styleType, style, ...rest },
		forwardedRef,
	) => {
		const accordionStyle = useStyles(styleKey, {
			baseClassName: [baseClassName, "accordion"],
			className,
			styleType,
			style,
		});

		return <AccordionPrimitive.Root ref={forwardedRef} {...rest} {...accordionStyle} />;
	},
);

AccordionRoot.displayName = ACCORDION_ROOT_NAME;

const AccordionItem = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Item>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & ClassNameStyleWithKey
>(
	(
		{ className, styleKey = ["accordion", "item"], baseClassName, styleType, style, ...rest },
		forwardedRef,
	) => {
		const accordionItemStyle = useStyles(styleKey, {
			baseClassName: [baseClassName, "accordion-item"],
			className,
			styleType,
			style,
		});
		return <AccordionPrimitive.Item ref={forwardedRef} {...rest} {...accordionItemStyle} />;
	},
);
AccordionItem.displayName = ACCORDION_ITEM_NAME;

const AccordionTrigger = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Trigger>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & ClassNameStyleWithKey
>(
	(
		{
			children,
			className,
			styleKey = ["accordion", "trigger"],
			baseClassName,
			styleType,
			style,
			...rest
		},
		forwardedRef,
	) => {
		const accordionTriggerStyle = useStyles(styleKey, {
			baseClassName: [baseClassName, "accordion-trigger"],
			className,
			styleType,
			style,
		});
		return (
			<AccordionPrimitive.Trigger ref={forwardedRef} {...rest} {...accordionTriggerStyle}>
				{children}
			</AccordionPrimitive.Trigger>
		);
	},
);
AccordionTrigger.displayName = ACCORDION_TRIGGER_NAME;

function AccordionIcon<T extends ElementType>({
	className,
	styleKey = ["accordion", "icon"],
	baseClassName,
	styleType,
	style,
	as,
	...rest
}: PolymorphicComponentProps<T> & ClassNameStyleWithKey) {
	const accordionIconStyle = useStyles(styleKey, {
		baseClassName: [baseClassName, "accordion-icon"],
		className,
		styleType,
		style,
	});

	const Component = as || "div";

	return <Component {...rest} {...accordionIconStyle} />;
}
AccordionIcon.displayName = ACCORDION_ICON_NAME;

type AccordionArrowProps = HTMLAttributes<HTMLDivElement> & {
	openIcon?: ElementType;
	closeIcon?: ElementType;
};

// open/close
function AccordionArrow({
	className,
	baseClassName,
	styleType,
	style,
	openIcon: OpenIcon = Plus,
	closeIcon: CloseIcon = Minus,
	...rest
}: AccordionArrowProps & Omit<ClassNameStyleWithKey, "styleKey">) {
	const accordionArrowOpenStyle = useStyles(["accordion", "arrow", "open"], {
		baseClassName: [baseClassName, "accordion-arrow-open"],
		className,
		styleType,
		style,
	});
	const accordionArrowClosedStyle = useStyles(["accordion", "arrow", "close"], {
		baseClassName: [baseClassName, "accordion-arrow-close"],
		className,
		styleType,
		style,
	});

	return (
		<>
			<OpenIcon {...rest} {...accordionArrowOpenStyle} />
			<CloseIcon {...rest} {...accordionArrowClosedStyle} />
		</>
	);
}
AccordionArrow.displayName = ACCORDION_ARROW_NAME;

const AccordionContent = forwardRef<
	ComponentRef<typeof AccordionPrimitive.Content>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & ClassNameStyleWithKey
>(
	(
		{
			children,
			className,
			styleKey = ["accordion", "content"],
			baseClassName,
			styleType,
			style,
			...rest
		},
		forwardedRef,
	) => {
		const accordionContentStyle = useStyles(styleKey, {
			baseClassName: [baseClassName, "accordion-content"],
			className,
			styleType,
			style,
		});

		return (
			<AccordionPrimitive.Content ref={forwardedRef} {...rest} {...accordionContentStyle}>
				<Box baseClassName="accordion-content-inner" styleKey={["accordion", "content-inner"]}>
					{children}
				</Box>
			</AccordionPrimitive.Content>
		);
	},
);
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
