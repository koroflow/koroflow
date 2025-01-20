"use client";

import { Slot } from "@radix-ui/react-slot";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../libs/utils";
import { useCookieBannerContext } from "./context";

type CookieBannerActionsElement = React.ElementRef<"div">;
type CookieBannerActionsProps = {
	asChild?: boolean;
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const CookieBannerActions = forwardRef<
	CookieBannerActionsElement,
	CookieBannerActionsProps
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			ref={ref}
			className={cn("flex justify-end space-x-2", className)}
			{...props}
		/>
	);
});

CookieBannerActions.displayName = "CookieBannerActions";

type CookieBannerButtonElement = React.ElementRef<"button">;
type CookieBannerButtonProps = {
	asChild?: boolean;
	className?: string;
} & HTMLAttributes<HTMLButtonElement>;

export const CookieBannerRejectButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, ...props }, ref) => {
	const { setShowPopup, saveConsents } = useCookieBannerContext();
	const Comp = asChild ? Slot : "button";

	const handleRejectAll = () => {
		saveConsents("necessary");
		setShowPopup(false);
	};

	return (
		<Comp
			ref={ref}
			className={cn("", className)}
			onClick={handleRejectAll}
			{...props}
		/>
	);
});

CookieBannerRejectButton.displayName = "CookieBannerRejectButton";

export const CookieBannerAcceptButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, ...props }, ref) => {
	const { setShowPopup, saveConsents } = useCookieBannerContext();
	const Comp = asChild ? Slot : "button";

	const handleAcceptAll = () => {
		saveConsents("all");
		setShowPopup(false);
	};

	return (
		<Comp
			ref={ref}
			className={cn("", className)}
			onClick={handleAcceptAll}
			{...props}
		/>
	);
});

CookieBannerAcceptButton.displayName = "CookieBannerAcceptButton";

export const CookieBannerCustomizeButton = forwardRef<
	CookieBannerButtonElement,
	CookieBannerButtonProps
>(({ asChild, className, ...props }, ref) => {
	const { setIsPrivacyDialogOpen } = useCookieBannerContext();
	const Comp = asChild ? Slot : "button";

	const openCustomizationDialog = () => {
		setIsPrivacyDialogOpen(true);
	};

	return (
		<Comp
			ref={ref}
			className={cn("", className)}
			onClick={openCustomizationDialog}
			{...props}
		/>
	);
});

CookieBannerCustomizeButton.displayName = "CookieBannerCustomizeButton";
