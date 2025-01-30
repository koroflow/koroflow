import { forwardRef, type Ref } from "react";
import { ConsentButton } from "~/react/primitives/button";
import type { ConsentButtonProps } from "~/react/primitives/button.types";

/**
 * Button to accept all available cookies.
 *
 * @remarks
 * - Enables all consent options
 * - Closes dialog after action
 * - Triggers necessary callbacks
 */
export const ConsentManagerWidgetAcceptAllButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				variant="neutral"
				mode="stroke"
				size="small"
				action="accept-consent"
				{...props}
				themeKey="consent-manager-widget.footer.accept-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

export const ConsentManagerWidgetCustomizeButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				action="open-consent-dialog"
				{...props}
				themeKey="consent-manager-widget.footer.customize-button"
			>
				{children}
			</ConsentButton>
		);
	},
);

export const ConsentManagerWidgetSaveButton = forwardRef<HTMLButtonElement, ConsentButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<ConsentButton
				ref={ref as Ref<HTMLButtonElement>}
				action="custom-consent"
				variant="primary"
				closeCustomizeDialog
				{...props}
				themeKey="consent-manager-widget.footer.save-button"
			>
				{children}
			</ConsentButton>
		);
	},
);