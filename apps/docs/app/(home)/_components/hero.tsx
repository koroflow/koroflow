"use client";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

import { ArrowRight } from "lucide-react";
import { AuroraText } from "../../../components/marketing/aurora-text";
import { BorderIcon } from "../../../components/marketing/border-icon";
import { GoogleGeminiEffect } from "../../../components/marketing/gemini";
import { Section } from "../../../components/marketing/section";
import { siteConfig } from "../config";

export function Hero() {
	const ref = useRef(null);

	const pathAnimations = [
		{
			startColor: "#076EFF",
			stopColor: "#4FABFF",
			delay: 0.4,
		},
		{
			startColor: "#4FABFF",
			stopColor: "#B1C5FF",
			delay: 0.6,
		},
		{
			startColor: "#B1C5FF",
			stopColor: "#FFDDB7",
			delay: 0,
		},
		{
			startColor: "#FFDDB7",
			stopColor: "#FFB7C5",
			delay: 0.2,
		},
		{
			startColor: "#FFB7C5",
			stopColor: "#FFE7EA",
			delay: 0.3,
		},
	];

	return (
		<Section id="hero">
			<div className="relative grid  gap-x-8 w-full border mt-8">
				<div className="flex flex-col relative justify-start items-start px-12 pt-8 pb-6 space-y-6">
					<h1 className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter">
						<span className="inline-block text-balance">
							<AuroraText className="leading-normal">{siteConfig.hero.title}</AuroraText>
						</span>
					</h1>
					<div className="flex flex-row justify-between gap-4 w-full">
						<p className="text-left z-20 max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance">
							{siteConfig.hero.description}
						</p>
						<div className="relative flex flex-row space-x-4 justify-end items-center">
							<div className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
								<Link
									href="/docs/getting-started"
									className={cn(
										buttonVariants({ variant: "default" }),
										"w-full sm:w-auto text-background flex gap-2 rounded-lg",
									)}
								>
									{siteConfig.hero.cta}
									<ArrowRight className="h-6 w-6" />
								</Link>
							</div>
							<div className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
								<Link
									href="/demo"
									className={cn(
										buttonVariants({ variant: "outline" }),
										"w-full sm:w-auto flex gap-2 rounded-lg",
									)}
								>
									{siteConfig.hero.demo}
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-[400px]">
					<div className="w-full rounded-md overflow-clip relative h-full" ref={ref}>
						{/* <div className="w-full absolute inset-0 bg-gradient-to-r from-background via-background/0 to-background z-30" /> */}
						<div className="absolute inset-0 flex items-center justify-center z-20">
							<div className="bg-[#FFF] text-[#000] font-bold rounded-full px-4 py-2">
								Consent Managent Platform
							</div>
						</div>
						<div className="absolute inset-0 flex items-center justify-center z-10">
							<GoogleGeminiEffect pathAnimations={pathAnimations} />
						</div>
					</div>
				</div>

				<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
			</div>
		</Section>
	);
}
