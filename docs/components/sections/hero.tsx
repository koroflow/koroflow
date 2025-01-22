"use client";

import { motion } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";

import { Section } from "@/components/section";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

function HeroTitles() {
	return (
		<div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
			<motion.h1
				className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter"
				initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
				animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
				transition={{
					duration: 1,
					ease,
					staggerChildren: 0.2,
				}}
			>
				<motion.span
					className="inline-block text-balance"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.5,
						duration: 0.8,
						ease,
					}}
				>
					<AuroraText className="leading-normal">{siteConfig.hero.title}</AuroraText>
				</motion.span>
			</motion.h1>
			<motion.p
				className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.6,
					duration: 0.8,
					ease,
				}}
			>
				{siteConfig.hero.description}
			</motion.p>
		</div>
	);
}

function HeroCTA() {
	return (
		<div className="relative mt-6">
			<motion.div
				className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.8, ease }}
			>
				<Button className="flex items-center gap-2" asChild>
					<Link href="/docs/getting-started">Get Started</Link>
				</Button>
			</motion.div>
		</div>
	);
}

const LazySpline = lazy(() => import("@splinetool/react-spline"));

export function Hero() {
	const [showSpline, setShowSpline] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024); // Assuming 1024px is the breakpoint for lg
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		// Don't show on mobile
		if (!isMobile) {
			const timer = setTimeout(() => {
				setShowSpline(true);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [isMobile]);

	return (
		<Section id="hero">
			<div className="mt-8 bg-background relative grid grid-cols-1 lg:grid-cols-2 gap-x-8 w-full p-6 lg:p-12 border-x border-t overflow-hidden rounded-t-xl">
				<div className="flex flex-col justify-start items-start lg:col-span-1">
					{/* <HeroPill /> */}
					<HeroTitles />
					<HeroCTA />
				</div>
				{!isMobile && (
					<div className="relative lg:h-full lg:col-span-1">
						<Suspense>
							{showSpline && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 1, duration: 0.8 }}
								>
									<LazySpline
										scene="https://prod.spline.design/mZBrYNcnoESGlTUG/scene.splinecode"
										className="absolute inset-0 w-full h-full origin-top-left flex items-center justify-center"
									/>
								</motion.div>
							)}
						</Suspense>
					</div>
				)}
			</div>
		</Section>
	);
}
