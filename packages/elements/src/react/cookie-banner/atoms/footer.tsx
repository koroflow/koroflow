"use client";

import { Slot } from "@radix-ui/react-slot";
import { type HTMLAttributes, forwardRef } from "react";
import type { ComponentRef } from "react";

import { useStyles } from "../hooks/use-styles";

type CookieBannerFooterElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerFooterProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;
	/**
	 * @remarks
	 * When true, the component will not apply any styles.
	 */
	noStyle?: boolean;
}

/**
 * Container component for CookieBanner action buttons.
 *
 * @remarks
 * This component provides the layout container for the cookie banner's action buttons
 * (accept, reject, customize). It handles proper spacing and alignment of the buttons.
 *
 * @example
 * ```tsx
 * <CookieBannerFooter>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerFooter>
 * ```
 *
 * @public
 */
export const CookieBannerFooter = forwardRef<CookieBannerFooterElement, CookieBannerFooterProps>(
	({ asChild, className, noStyle, style, ...props }, ref) => {
		const actionsStyle = useStyles({
			baseClassName: "flex flex-col sm:flex-row justify-between gap-3 px-5 py-4 bg-bg-weak-50",
			componentStyle: className,
			styleKey: "actions",
			noStyle,
		});

		const Comp = asChild ? Slot : "div";

		return (
			<Comp ref={ref} {...actionsStyle} style={{ ...style, ...actionsStyle.style }} {...props} />
		);
	},
);

CookieBannerFooter.displayName = "CookieBannerFooter";

type CookieBannerFooterSubGroupElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerFooterSubGroupProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;
	/**
	 * @remarks
	 * When true, the component will not apply any styles.
	 */
	noStyle?: boolean;
}

/**
 * Container component for CookieBanner action buttons.
 *
 * @remarks
 * This component provides the layout container for the cookie banner's action buttons
 * (accept, reject, customize). It handles proper spacing and alignment of the buttons.
 *
 * @example
 * ```tsx
 * <CookieBannerFooter>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerFooter>
 * ```
 *
 * @public
 */
export const CookieBannerFooterSubGroup = forwardRef<
	CookieBannerFooterSubGroupElement,
	CookieBannerFooterSubGroupProps
>(({ asChild, className, style, noStyle, ...props }, ref) => {
	const actionsStyle = useStyles({
		baseClassName: "flex flex-col sm:flex-row justify-between gap-4",
		componentStyle: className,
		styleKey: "actions",
		noStyle,
	});

	const Comp = asChild ? Slot : "div";

	return (
		<Comp ref={ref} {...actionsStyle} style={{ ...style, ...actionsStyle.style }} {...props} />
	);
});

CookieBannerFooterSubGroup.displayName = "CookieBannerFooterSubGroup";
