"use client";

import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "motion/react";
import {
	type HTMLAttributes,
	type ReactNode,
	forwardRef,
	useEffect,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { useCookieBannerContext } from "../context";
import { useStyles } from "../hooks/use-styles";
import { Overlay } from "./overlay";

/**
 * Props for the content section of the CookieBanner.
 *
 * @public
 */
interface CookieBannerContentProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * @remarks
	 * React elements to be rendered within the content section.
	 * This typically includes the title, description, and action buttons.
	 */
	children: ReactNode;

	/**
	 * @remarks
	 * When true, the component will render its children directly without wrapping them in a DOM element.
	 * This enables better composition with other components.
	 */
	asChild?: boolean;
}

/**
 * Content component for the CookieBanner that handles layout and animations.
 *
 * @remarks
 * This component manages the main content area of the cookie banner, including:
 * - Client-side portal rendering to ensure proper stacking context
 * - Optional entrance/exit animations (controlled via CookieBanner.Root)
 * - Conditional rendering based on banner visibility state
 * - Style composition through the CookieBanner context
 *
 * @example
 * Basic usage with default styling and animations:
 * ```tsx
 * <CookieBannerContent>
 *   <CookieBanner.Title>Privacy Notice</CookieBanner.Title>
 *   <CookieBanner.Description>
 *     We use cookies to improve your experience
 *   </CookieBanner.Description>
 *   <CookieBanner.Actions>
 *     <CookieBanner.RejectButton>Decline</CookieBanner.RejectButton>
 *     <CookieBanner.AcceptButton>Accept</CookieBanner.AcceptButton>
 *   </CookieBanner.Actions>
 * </CookieBannerContent>
 * ```
 *
 * @example
 * Using asChild for custom wrapper:
 * ```tsx
 * <CookieBannerContent asChild>
 *   <Card className="my-custom-card">
 *     {Content}
 *   </Card>
 * </CookieBannerContent>
 * ```
 *
 * @public
 */
export const CookieBannerContent = forwardRef<
	HTMLDivElement,
	CookieBannerContentProps
>(({ asChild, children, className, style, ...props }, ref) => {
	const { showPopup, disableAnimation } = useCookieBannerContext();

	/**
	 * Apply styles from the CookieBanner context and merge with local styles.
	 * Uses the 'content' style key for consistent theming.
	 */
	const contentStyle = useStyles({
		baseClassName:
			"fixed inset-x-0 bottom-0 z-50 flex items-center justify-center p-4",
		componentStyle: className,
		styleKey: "content",
	});

	/**
	 * Track client-side mounting state to prevent SSR hydration issues
	 * with the portal rendering
	 */
	const [isMounted, setIsMounted] = useState(false);

	/**
	 * Initialize mounting state after initial render
	 * This ensures we only render the portal on the client side
	 */
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Prevent rendering until client-side mount is complete
	if (!isMounted) {
		return null;
	}

	// Only render when the banner should be shown
	return showPopup
		? createPortal(
				<>
					<Overlay />
					{disableAnimation ? (
						<div
							ref={ref}
							{...contentStyle}
							style={{ ...style, ...contentStyle.style }}
							{...props}
						>
							{children}
						</div>
					) : (
						<AnimatePresence>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 50 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								{...contentStyle}
								style={{ ...style, ...contentStyle.style }}
							>
								{children}
							</motion.div>
						</AnimatePresence>
					)}
				</>,
				document.body,
			)
		: null;
});

CookieBannerContent.displayName = "CookieBannerContent";
