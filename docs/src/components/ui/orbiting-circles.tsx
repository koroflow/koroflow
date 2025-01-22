import { cn } from "@/lib/utils";

export interface OrbitingCirclesProperties {
	delay?: number;
	path?: boolean;
	radius?: number;
	reverse?: boolean;
	duration?: number;
	className?: string;
	children?: React.ReactNode;
}

export default function OrbitingCircles({
	children,
	className,
	delay = 10,
	duration = 20,
	path = true,
	radius = 50,
	reverse,
}: OrbitingCirclesProperties) {
	return (
		<>
			{path && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					className="pointer-events-none absolute inset-0 size-full"
				>
					<title>Orbiting Circles</title>
					<circle
						className="stroke-border stroke-1 dark:stroke-border"
						cx="50%"
						cy="50%"
						r={radius}
						fill="none"
					/>
				</svg>
			)}

			<div
				style={
					{
						"--delay": -delay,
						"--duration": duration,
						"--radius": radius,
					} as React.CSSProperties
				}
				className={cn(
					"absolute flex size-[2rem] transform-gpu animate-orbit items-center justify-center rounded-full border border-border bg-background [animation-delay:calc(var(--delay)*1000ms)] dark:bg-background",
					{ "[animation-direction:reverse]": reverse },
					className,
				)}
			>
				{children}
			</div>
		</>
	);
}
