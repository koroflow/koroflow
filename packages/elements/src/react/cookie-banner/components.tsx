import { type FC, type ReactNode, type Ref, forwardRef } from "react";
import { Box, type BoxProps } from "../primitives/box";

import { useConsentManager } from "../common";
import { ConsentButton } from "../primitives/button";
import type { ConsentButtonProps } from "../primitives/button.types";

import { ThemeContext } from "../theme/context";
import type { CookieBannerStyles } from "./types";

interface CookieBannerRootProps {
	/** Custom styles to apply to the CookieBanner and its children */
	styles?: CookieBannerStyles;
	/** Whether to disable default styles */
	noStyle?: boolean;
	/** Whether to disable all animations */
	disableAnimation?: boolean;
	/** Children components */
	children: ReactNode;
}

const COOKIE_BANNER_ROOT_NAME = "CookieBannerRoot";
const COOKIE_BANNER_TITLE_NAME = "CookieBannerTitle";
const COOKIE_BANNER_DESCRIPTION_NAME = "CookieBannerDescription";
const COOKIE_BANNER_FOOTER_NAME = "CookieBannerFooter";
const COOKIE_BANNER_CARD_NAME = "CookieBannerCard";
const COOKIE_BANNER_HEADER_NAME = "CookieBannerHeader";
const COOKIE_BANNER_FOOTER_SUB_GROUP_NAME = "CookieBannerFooterSubGroup";
const COOKIE_BANNER_REJECT_BUTTON_NAME = "CookieBannerRejectButton";
const COOKIE_BANNER_CUSTOMIZE_BUTTON_NAME = "CookieBannerCustomizeButton";
const COOKIE_BANNER_ACCEPT_BUTTON_NAME = "CookieBannerAcceptButton";

export const CookieBannerRoot: FC<CookieBannerRootProps> = forwardRef(
	({ children, styles = {}, noStyle = false, disableAnimation = false }, ref) => {
		const consentManager = useConsentManager();

		return (
			<ThemeContext.Provider
				value={{
					...consentManager,
					styles,
					disableAnimation,
				}}
			>
				{children}
			</ThemeContext.Provider>
		);
	},
);

CookieBannerRoot.displayName = COOKIE_BANNER_ROOT_NAME;

export const CookieBannerTitle = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-title"
				styleKey="title"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerTitle.displayName = COOKIE_BANNER_TITLE_NAME;

export const CookieBannerDescription = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-description"
				styleKey="description"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerDescription.displayName = COOKIE_BANNER_DESCRIPTION_NAME;

export const CookieBannerFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-footer"
				styleKey="footer"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerFooter.displayName = COOKIE_BANNER_FOOTER_NAME;

export const CookieBannerCard = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-card"
				styleKey="card"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerCard.displayName = COOKIE_BANNER_CARD_NAME;

export const CookieBannerHeader = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-header"
				styleKey="header"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerHeader.displayName = COOKIE_BANNER_HEADER_NAME;

export const CookieBannerFooterSubGroup = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-footer-sub-group"
				styleKey="subGroup"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerFooterSubGroup.displayName = COOKIE_BANNER_FOOTER_SUB_GROUP_NAME;

export const CookieBannerRejectButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"rejectButton">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			action="reject-consent"
			closeCookieBanner
			{...props}
		>
			{children}
		</ConsentButton>
	);
});

CookieBannerRejectButton.displayName = COOKIE_BANNER_REJECT_BUTTON_NAME;

export const CookieBannerCustomizeButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"customizeButton">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton ref={ref as Ref<HTMLButtonElement>} action="open-consent-dialog" {...props}>
			{children}
		</ConsentButton>
	);
});

CookieBannerCustomizeButton.displayName = COOKIE_BANNER_CUSTOMIZE_BUTTON_NAME;

export const CookieBannerAcceptButton = forwardRef<
	HTMLButtonElement,
	ConsentButtonProps<"acceptButton">
>(({ children, ...props }, ref) => {
	return (
		<ConsentButton
			ref={ref as Ref<HTMLButtonElement>}
			action="accept-consent"
			variant="primary"
			closeCookieBanner
			{...props}
		>
			{children}
		</ConsentButton>
	);
});

CookieBannerAcceptButton.displayName = COOKIE_BANNER_ACCEPT_BUTTON_NAME;
