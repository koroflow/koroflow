import React from "react";
import { cn } from "../../libs/utils";

// title component
export const CookieBannerTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
));
CookieBannerTitle.displayName = "CookieBannerTitle";
