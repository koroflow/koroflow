import { cn } from "@/lib/utils";
import { type LucideIcon, Waypoints, TypeIcon as type } from "lucide-react";
import type React from "react";
import { useId } from "react";

interface GradientIconProps {
	icon?: LucideIcon;
	className?: string;
	iconColor?: string;
}

export const GradientIcon: React.FC<GradientIconProps> = ({
	icon: Icon = Waypoints,
	className,
	iconColor = "#FFFFFF",
}) => {
	const id = useId();
	const gradientId = `icon-gradient-${id}`;
	const maskId = `icon-mask-${id}`;

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center rounded-full bg-[hsl(var(--docs-primary))] size-8",
				"before:content-[''] before:absolute before:inset-0 before:rounded-full",
				"before:shadow-[inset_0_-0.5em_0.5em_rgba(255,255,255,0.5)] dark:before:shadow-[inset_0_-0.5em_0.5em_rgba(0,0,0,0.5)]",
				"overflow-hidden",
				className,
			)}
		>
			<svg
				className="w-full h-full p-[15%]"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Gradient Icon</title>
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="31%" stopColor={iconColor} stopOpacity="1" />
						<stop offset="100%" stopColor={iconColor} stopOpacity="0" />
					</linearGradient>
					<mask id={maskId}>
						<Icon
							className="w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 color-white"
							color="white"
						/>
					</mask>
				</defs>
				<rect width="24" height="24" fill={`url(#${gradientId})`} mask={`url(#${maskId})`} />
			</svg>
		</div>
	);
};
