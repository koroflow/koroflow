"use client";

import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import { type HTMLAttributes, forwardRef, useCallback } from "react";
import type { ComponentRef } from "react";
import { useConsentManager } from "../../common";
import * as Button from "../../common/primitives/button";
import { useStyles } from "../hooks/use-styles";
type CookieBannerHeaderElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerHeaderProps extends HTMLAttributes<HTMLDivElement> {
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

	/**
	 * @remarks
	 * When true, the component will show the close button.
	 */
	showCloseButton?: boolean;
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
 * <CookieBannerHeader>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerHeader>
 * ```
 *
 * @public
 */
export const CookieBannerHeader = forwardRef<CookieBannerHeaderElement, CookieBannerHeaderProps>(
	({ asChild, className, style, noStyle, showCloseButton, children, ...props }, ref) => {
		const { setShowPopup, callbacks } = useConsentManager();
		const actionsStyle = useStyles({
			baseClassName:
				"flex flex-col space-y-2 px-4 sm:px-6 py-4 sm:py-6 bg-bg-white-0 text-text-strong-950",
			componentStyle: className,
			styleKey: "actions",
			noStyle,
		});
		const handleClose = useCallback(() => {
			setShowPopup(false);
			if (typeof document !== "undefined") {
				document.body.style.overflow = "";
			}
			callbacks.onBannerClosed?.();
		}, [setShowPopup, callbacks]);

		const Comp = asChild ? Slot : "div";

		return (
			<Comp ref={ref} {...actionsStyle} style={{ ...style, ...actionsStyle.style }} {...props}>
				{showCloseButton && (
					<Button.Root
						variantStyle="neutral"
						mode="ghost"
						className="absolute right-2 top-2"
						onClick={handleClose}
						aria-label="Close cookie consent banner"
					>
						<Button.Icon as={X} />
					</Button.Root>
				)}
				{children}
			</Comp>
		);
	},
);

CookieBannerHeader.displayName = "CookieBannerHeader";
