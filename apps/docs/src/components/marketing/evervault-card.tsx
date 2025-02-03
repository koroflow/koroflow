"use client";

import { cn } from "@koroflow/shadcn/libs";
import { type MotionValue, useMotionValue } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";
import { useEffect, useState } from "react";

export const EvervaultCard = ({
	text,
	className,
}: {
	text?: string;
	className?: string;
}) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		const str = generateRandomString(1500);
		setRandomString(str);
	}, []);

	function onMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: {
		currentTarget: HTMLElement;
		clientX: number;
		clientY: number;
	}) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);

		const str = generateRandomString(1500);
		setRandomString(str);
	}

	return (
		<div
			className={cn(
				"relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5",
				className,
			)}
		>
			<div
				onMouseMove={onMouseMove}
				className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
			>
				<CardPattern
					mouseX={mouseX}
					mouseY={mouseY}
					randomString={randomString}
				/>
				<div className="relative z-10 flex items-center justify-center">
					<div className="relative flex h-44 w-44 items-center justify-center rounded-full font-bold text-4xl text-white">
						<div className="absolute h-full w-full rounded-full bg-white/[0.8] blur-sm dark:bg-black/[0.8]" />
						<span className="z-20 text-black dark:text-white">{text}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export function CardPattern({
	mouseX,
	mouseY,
	randomString,
}: {
	mouseX: MotionValue<number>;
	mouseY: MotionValue<number>;
	randomString: string;
}) {
	const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div className="pointer-events-none">
			<div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />
			<motion.div
				className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
				style={style}
			/>
			<motion.div
				className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
				style={style}
			>
				<p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-bold font-mono text-white text-xs transition duration-500">
					{randomString}
				</p>
			</motion.div>
		</div>
	);
}

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};
