import { type FC, type ReactNode, type Ref, forwardRef } from "react";
import { Box, type BoxProps } from "../primitives/box";


import { ConsentButton } from "../primitives/button";
import type { ConsentButtonProps } from "../primitives/button.types";


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




export const CookieBannerTitle = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-title"
				themeKey="cookie-banner.header.title"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerTitle.displayName = COOKIE_BANNER_TITLE_NAME;

export const CookieBannerDescription = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-description"
				themeKey="cookie-banner.header.description"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerDescription.displayName = COOKIE_BANNER_DESCRIPTION_NAME;

export const CookieBannerFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-footer"
				themeKey="cookie-banner.footer"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerFooter.displayName = COOKIE_BANNER_FOOTER_NAME;

export const CookieBannerCard = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-card"
				themeKey="cookie-banner.card"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerCard.displayName = COOKIE_BANNER_CARD_NAME;

export const CookieBannerHeader = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-header"
				themeKey="cookie-banner.header.root"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerHeader.displayName = COOKIE_BANNER_HEADER_NAME;

export const CookieBannerFooterSubGroup = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="cookie-banner-footer-sub-group"
				themeKey="cookie-banner.footer.sub-group"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

CookieBannerFooterSubGroup.displayName = COOKIE_BANNER_FOOTER_SUB_GROUP_NAME;

export const CookieBannerRejectButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
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
	},
);

CookieBannerRejectButton.displayName = COOKIE_BANNER_REJECT_BUTTON_NAME;

export const CookieBannerCustomizeButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton ref={ref as Ref<HTMLButtonElement>} action="open-consent-dialog" {...props}>
				{children}
			</ConsentButton>
		);
	},
);

CookieBannerCustomizeButton.displayName = COOKIE_BANNER_CUSTOMIZE_BUTTON_NAME;

export const CookieBannerAcceptButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
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
	},
);

CookieBannerAcceptButton.displayName = COOKIE_BANNER_ACCEPT_BUTTON_NAME;
