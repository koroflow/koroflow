"use client";

import { buttonVariants } from "@koroflow/shadcn/components";

import { cn } from "@koroflow/shadcn/libs";
import Link from "next/link";
import { useRef } from "react";

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
			<div className="relative grid gap-x-8 w-full border mt-8">
				<div className="flex flex-col relative justify-start items-start px-4 sm:px-12 pt-8 pb-6 space-y-6">
					<h1 className="text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tighter text-foreground tracking-tighter">
						<span className="inline-block text-balance">
							<AuroraText className="leading-normal">{siteConfig.hero.title}</AuroraText>
						</span>
					</h1>
					<div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
						<p className="text-left z-20 max-w-xl text-sm sm:text-base lg:text-lg leading-normal text-muted-foreground text-balance">
							{siteConfig.hero.description}
						</p>
						<div className="relative flex flex-col sm:flex-row gap-4 justify-start sm:justify-end items-start sm:items-center">
							<Link
								href={siteConfig.hero.cta.href}
								className={cn(
									buttonVariants({ variant: "outline" }),
									"w-full sm:w-auto text-background flex gap-2 rounded-lg",
								)}
							>
								{siteConfig.hero.cta.text}
								<ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
							</Link>
							<Link
								href={siteConfig.hero.demo.href}
								className={cn(
									buttonVariants({ variant: "ghost" }),
									"w-full sm:w-auto flex gap-2 rounded-lg",
								)}
							>
								{siteConfig.hero.demo.text}
							</Link>
						</div>
					</div>
				</div>
				<div className="w-full h-[250px] sm:h-[300px] md:h-[400px] scale-100 md:scale-100 ">
					<div className="w-full rounded-md overflow-clip relative h-full" ref={ref}>
						{/* <div className="w-full absolute inset-0 bg-gradient-to-r from-background via-background/0 to-background z-30" /> */}
						<div className="absolute inset-0 flex items-center justify-center z-20">
							<div className="hidden sm:block dark:bg-[#FFF] dark:text-[#000] bg-[#000] text-[#FFF] font-bold text-xs  md:text-base rounded-full px-4 py-3">
								Consent Management Platform
							</div>
							<div className="block sm:hidden dark:bg-[#FFF] dark:text-[#000] bg-[#000] text-[#FFF] text-center text-[0.6rem]  md:text-base rounded-xl px-2 py-2">
								Consent <br /> Management <br /> Platform
							</div>
						</div>
						<div className="absolute inset-0 flex items-center justify-center z-10">
							<GoogleGeminiEffect pathAnimations={pathAnimations} />
						</div>
					</div>
				</div>

				<BorderIcon className="absolute h-4 w-4 sm:h-6 sm:w-6 -top-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-4 w-4 sm:h-6 sm:w-6 -bottom-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-4 w-4 sm:h-6 sm:w-6 -top-3 -right-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-4 w-4 sm:h-6 sm:w-6 -bottom-3 -right-3 dark:text-white text-black" />
			</div>
		</Section>
	);
}
