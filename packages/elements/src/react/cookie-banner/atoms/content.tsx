"use client";

import { Slot } from "@radix-ui/react-slot";
import { type HTMLAttributes, forwardRef } from "react";
import type { ComponentRef } from "react";
import { useStyles } from "../hooks/use-styles";

type CookieBannerContentElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerContentProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;
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
 * <CookieBannerContent>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerContent>
 * ```
 *
 * @public
 */
export const CookieBannerContent = forwardRef<
	CookieBannerContentElement,
	CookieBannerContentProps
>(({ asChild, className, style, ...props }, ref) => {
	const actionsStyle = useStyles({
		baseClassName:
			"flex flex-col space-y-2 px-4 sm:px-6 py-4 sm:py-6 bg-bg-white-0 text-text-strong-950",
		componentStyle: className,
		styleKey: "actions",
	});

	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			ref={ref}
			{...actionsStyle}
			style={{ ...style, ...actionsStyle.style }}
			{...props}
		/>
	);
});

CookieBannerContent.displayName = "CookieBannerContent";
