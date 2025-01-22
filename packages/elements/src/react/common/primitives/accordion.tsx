"use client";

import "./accordion.css";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus, Subscript } from "lucide-react";
import * as React from "react";
import { cnExt } from "../libs/cn";
import type { PolymorphicComponentProps } from "../libs/polymorphic";

const ACCORDION_ROOT_NAME = "AccordionRoot";
const ACCORDION_ITEM_NAME = "AccordionItem";
const ACCORDION_ICON_NAME = "AccordionIcon";
const ACCORDION_ARROW_NAME = "AccordionArrow";
const ACCORDION_TRIGGER_NAME = "AccordionTrigger";
const ACCORDION_CONTENT_NAME = "AccordionContent";

const AccordionHeader = AccordionPrimitive.Header;

const AccordionRoot = React.forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...rest }, forwardedRef) => {
	return (
		<AccordionPrimitive.Root
			ref={forwardedRef}
			className={cnExt("accordion", className)}
			{...rest}
		/>
	);
});

AccordionRoot.displayName = ACCORDION_ROOT_NAME;

const AccordionItem = React.forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...rest }, forwardedRef) => {
	return (
		<AccordionPrimitive.Item
			ref={forwardedRef}
			className={cnExt("accordion-item", className)}
			{...rest}
		/>
	);
});
AccordionItem.displayName = ACCORDION_ITEM_NAME;

const AccordionTrigger = React.forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...rest }, forwardedRef) => {
	return (
		<AccordionPrimitive.Trigger
			ref={forwardedRef}
			className={cnExt("accordion-trigger", className)}
			{...rest}
		>
			{children}
		</AccordionPrimitive.Trigger>
	);
});
AccordionTrigger.displayName = ACCORDION_TRIGGER_NAME;

function AccordionIcon<T extends React.ElementType>({
	className,
	as,
	...rest
}: PolymorphicComponentProps<T>) {
	const Component = as || "div";

	return <Component className={cnExt("accordion-icon", className as string)} {...rest} />;
}
AccordionIcon.displayName = ACCORDION_ICON_NAME;

type AccordionArrowProps = React.HTMLAttributes<HTMLDivElement> & {
	openIcon?: React.ElementType;
	closeIcon?: React.ElementType;
};

// open/close
function AccordionArrow({
	className,
	openIcon: OpenIcon = Plus,
	closeIcon: CloseIcon = Minus,
	...rest
}: AccordionArrowProps) {
	return (
		<>
			<OpenIcon className={cnExt("accordion-arrow-open", className)} {...rest} />
			<CloseIcon className={cnExt("accordion-arrow-close", className)} {...rest} />
		</>
	);
}
AccordionArrow.displayName = ACCORDION_ARROW_NAME;

const AccordionContent = React.forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...rest }, forwardedRef) => {
	return (
		<AccordionPrimitive.Content ref={forwardedRef} className={"accordion-content"} {...rest}>
			<div className={cnExt("accordion-content-inner", className)}>{children}</div>
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
