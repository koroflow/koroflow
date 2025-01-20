import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../libs/utils";

export const CookieBannerDescription = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CookieBannerDescription.displayName = "CardDescription";
