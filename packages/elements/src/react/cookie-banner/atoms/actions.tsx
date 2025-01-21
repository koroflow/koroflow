"use client";

import { Slot } from "@radix-ui/react-slot";
import { type HTMLAttributes, forwardRef } from "react";
import type { ComponentRef } from "react";
import { buttonVariants } from "../../common/primitives/button";
import { useCookieBannerContext } from "../context";
import { useStyles } from "../hooks/use-styles";

type CookieBannerActionsElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerActionsProps extends HTMLAttributes<HTMLDivElement> {
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
 * <CookieBannerActions>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerActions>
 * ```
 *
 * @public
 */
export const CookieBannerActions = forwardRef<
	CookieBannerActionsElement,
	CookieBannerActionsProps
>(({ asChild, className, style, ...props }, ref) => {
	const actionsStyle = useStyles({
		baseClassName:
			"flex items-center justify-between gap-3 px-5 py-4 bg-bg-weak-50",
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

CookieBannerActions.displayName = "CookieBannerActions";

type CookieBannerActionsSubGroupElement = ComponentRef<"div">;

/**
 * Props for the actions container component of the CookieBanner.
 *
 * @public
 */
interface CookieBannerActionsSubGroupProps
	extends HTMLAttributes<HTMLDivElement> {
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
 * <CookieBannerActions>
 *   <CookieBannerRejectButton>Reject</CookieBannerRejectButton>
 *   <CookieBannerCustomizeButton>Customize</CookieBannerCustomizeButton>
 *   <CookieBannerAcceptButton>Accept</CookieBannerAcceptButton>
 * </CookieBannerActions>
 * ```
 *
 * @public
 */
export const CookieBannerActionsSubGroup = forwardRef<
	CookieBannerActionsSubGroupElement,
	CookieBannerActionsSubGroupProps
>(({ asChild, className, style, ...props }, ref) => {
	const actionsStyle = useStyles({
		baseClassName: "space-x-4",
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

CookieBannerActionsSubGroup.displayName = "CookieBannerActionsSubGroup";

type CookieBannerButtonElement = ComponentRef<"button">;

/**
 * Props for CookieBanner button components.
 *
 * @public
 */
interface CookieBannerButtonProps extends HTMLAttributes<HTMLButtonElement> {
	/**
	 * @remarks
	 * When true, the button will render its children directly without wrapping them in a button element.
	 * This enables better composition with custom button implementations.
	 */
	asChild?: boolean;
}

/**
 * Button component that allows users to reject non-essential cookies.
 *
 * @remarks
 * When clicked, this button saves only necessary cookie consents and closes the banner.
 *
 * @example
 * ```tsx
 * <CookieBannerRejectButton>
 *   Reject All Cookies
 * </CookieBannerRejectButton>
 * ```
 *
 * @public
 */
export const CookieBannerRejectButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, style, ...props }, ref) => {
	const { setShowPopup, saveConsents } = useCookieBannerContext();
	const buttonStyle = useStyles({
		baseClassName:
			"relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:ring-transparent ring-1 ring-inset h-10 gap-3 rounded-5 px-3.5 text-label-sm bg-bg-white-0 text-text-sub-600 shadow-regular-xs ring-stroke-sub-300 hover:bg-bg-soft-200 hover:text-text-strong-950 hover:shadow-none focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
		componentStyle: className,
		styleKey: "rejectButton",
	});

	const Comp = asChild ? Slot : "button";
	/**
	 * Handles the rejection of all non-essential cookies.
	 * Saves only necessary consents and closes the popup.
	 */
	const handleRejectAll = () => {
		saveConsents("necessary");
		setShowPopup(false);
	};

	return (
		<Comp
			ref={ref}
			{...buttonStyle}
			style={{ ...style, ...buttonStyle.style }}
			onClick={handleRejectAll}
			{...props}
		/>
	);
});

CookieBannerRejectButton.displayName = "CookieBannerRejectButton";

/**
 * Button component that allows users to accept all cookies.
 *
 * @remarks
 * When clicked, this button saves all cookie consents and closes the banner.
 *
 * @example
 * ```tsx
 * <CookieBannerAcceptButton>
 *   Accept All Cookies
 * </CookieBannerAcceptButton>
 * ```
 *
 * @public
 */
export const CookieBannerAcceptButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, style, ...props }, ref) => {
	const { setShowPopup, saveConsents } = useCookieBannerContext();
	const buttonStyle = useStyles({
		baseClassName:
			"relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:ring-transparent h-10 gap-3 rounded-5 px-3.5 text-label-sm bg-primary-base text-static-white hover:bg-primary-darker focus-visible:shadow-button-primary-focus",
		componentStyle: className,
		styleKey: "acceptButton",
	});
	const Comp = asChild ? Slot : "button";

	/**
	 * Handles the acceptance of all cookies.
	 * Saves all consents and closes the popup.
	 */
	const handleAcceptAll = () => {
		saveConsents("all");
		setShowPopup(false);
	};

	return (
		<Comp
			ref={ref}
			{...buttonStyle}
			style={{ ...style, ...buttonStyle.style }}
			onClick={handleAcceptAll}
			{...props}
		/>
	);
});

CookieBannerAcceptButton.displayName = "CookieBannerAcceptButton";

/**
 * Button component that opens the cookie customization dialog.
 *
 * @remarks
 * When clicked, this button opens a dialog that allows users to customize
 * their cookie preferences in detail.
 *
 * @example
 * ```tsx
 * <CookieBannerCustomizeButton>
 *   Customize Settings
 * </CookieBannerCustomizeButton>
 * ```
 *
 * @public
 */
export const CookieBannerCustomizeButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, style, ...props }, ref) => {
	const { setIsPrivacyDialogOpen } = useCookieBannerContext();
	const Comp = asChild ? Slot : "button";
	const buttonStyle = useStyles({
		baseClassName:
			"relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:ring-transparent ring-1 ring-inset h-10 gap-3 rounded-5 px-3.5 text-label-sm bg-bg-white-0 text-text-sub-600 shadow-regular-xs ring-stroke-sub-300 hover:bg-bg-soft-200 hover:text-text-strong-950 hover:shadow-none focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
		componentStyle: className,
		styleKey: "customizeButton",
	});

	/**
	 * Opens the cookie customization dialog.
	 */
	const openCustomizationDialog = () => {
		setIsPrivacyDialogOpen(true);
	};

	return (
		<Comp
			ref={ref}
			{...buttonStyle}
			style={{ ...style, ...buttonStyle.style }}
			onClick={openCustomizationDialog}
			{...props}
		/>
	);
});

CookieBannerCustomizeButton.displayName = "CookieBannerCustomizeButton";
