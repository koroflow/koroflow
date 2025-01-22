"use client";

import type React from "react";

import { cn } from "@/lib/utils";

export function AuroraText({
	children,
	className,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<span className={cn("relative overflow-hidden inline-flex bg-background", className)}>
			{children}
			<div className="aurora absolute inset-0 pointer-events-none mix-blend-lighten dark:mix-blend-darken">
				{[...Array(5)].map((_, index) => (
					<div
						key={`aurora-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}`}
						className="aurora__item absolute w-[60vw] h-[60vw] animate-aurora-border animate-aurora-${index + 1}"
						style={{
							backgroundColor: `hsl(var(--color-${index + 1}))`,
							filter: "blur(1rem)",
							mixBlendMode: "overlay",
							...getInitialPosition(index),
						}}
					/>
				))}
			</div>
		</span>
	);
}

function getInitialPosition(index: number): React.CSSProperties {
	const positions = [
		{ top: "-50%" },
		{ right: 0, top: 0 },
		{ bottom: 0, left: 0 },
		{ bottom: "-50%", right: 0 },
	];
	return positions[index] || {};
}
