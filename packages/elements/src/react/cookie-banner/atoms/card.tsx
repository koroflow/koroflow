"use client";

import { Slot } from "@radix-ui/react-slot";
import { type HTMLAttributes, forwardRef } from "react";
import type { ComponentRef } from "react";
import { useStyles } from "../hooks/use-styles";

type CookieBannerCardElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerCardProps extends HTMLAttributes<HTMLDivElement> {
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
 * <CookieBannerCard>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerCard>
 * ```
 *
 * @public
 */
export const CookieBannerCard = forwardRef<CookieBannerCardElement, CookieBannerCardProps>(
	({ asChild, className, style, noStyle, ...props }, ref) => {
		const actionsStyle = useStyles({
			baseClassName:
				"relative w-full rounded-5 border border-bg-soft-200 divide-y divide-bg-soft-200 bg-bg-white-0 rounded-20 overflow-hidden shadow-regular-md focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-w-[440px]",
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

CookieBannerCard.displayName = "CookieBannerCard";
