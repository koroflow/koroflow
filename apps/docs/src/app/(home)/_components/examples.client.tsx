"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BorderIcon } from "~/components/marketing/border-icon";

interface FeatureOption {
	id: number;
	title: string;
	description: string;
	code: React.ReactNode;
}

interface ExamplesClientProps {
	features: FeatureOption[];
}

export function ExamplesClient({ features }: ExamplesClientProps) {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [progress, setProgress] = useState(0);
	const autoPlayInterval = 10000; // 10 seconds per example

	useEffect(() => {
		const timer = setInterval(() => {
			if (progress < 100) {
				setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
			} else {
				setSelectedIndex((prev) => (prev + 1) % features.length);
				setProgress(0);
			}
		}, 100);

		return () => clearInterval(timer);
	}, [progress, features.length]);

	return (
		<motion.div
			className="relative grid grid-cols-1 gap-6 md:grid-cols-5"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* Features Selection */}
			<motion.div className="sticky top-[var(--header-height)] z-20 bg-background md:col-span-2">
				<div className="flex flex-col space-y-4 pb-4 md:pb-0">
					<div className="relative flex min-w-full flex-col space-y-4 sm:space-y-8">
						{features.map((option, index) => (
							<motion.button
								key={option.id}
								onClick={() => {
									setSelectedIndex(index);
									setProgress(0);
								}}
								className={`
									shrink-0 
									w-[280px] sm:w-[320px] md:w-full 
									text-left p-4 
									rounded border relative 
									${selectedIndex === index ? "bg-accent/70" : "hover:bg-muted/50"}
								`}
								animate={{
									opacity: index === selectedIndex ? 1 : 0.7,
									scale: index === selectedIndex ? 1.02 : 1,
								}}
								transition={{ duration: 0.5 }}
							>
								<div className="flex items-center gap-4">
									<motion.div
										className={`flex size-6 shrink-0 items-center justify-center rounded-full sm:size-8 border-2${
											index === selectedIndex
												? "border-primary bg-primary text-primary-foreground"
												: "border-muted-foreground bg-muted"
										}
										`}
									>
										{index <= selectedIndex ? (
											<span className="font-bold text-base sm:text-lg">✓</span>
										) : (
											<span className="font-semibold text-base sm:text-lg">
												{index + 1}
											</span>
										)}
									</motion.div>
									<div>
										<h3 className="font-medium text-sm tracking-tight sm:text-base">
											{option.title}
										</h3>
										<p className="text-muted-foreground text-xs sm:text-sm">
											{option.description}
										</p>
									</div>
								</div>
								{index === selectedIndex && (
									<motion.div
										className="absolute bottom-0 left-0 mx-4 h-1 bg-primary"
										initial={{ width: "0%" }}
										animate={{ width: `${progress}%` }}
										transition={{ duration: 0.1, ease: "linear" }}
									/>
								)}

								<BorderIcon className="-top-3 -left-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
								<BorderIcon className="-bottom-3 -left-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
								<BorderIcon className="-top-3 -right-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
								<BorderIcon className="-bottom-3 -right-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
							</motion.button>
						))}
					</div>
				</div>
			</motion.div>

			{/* Code Display */}
			<div className="relative mt-4 sm:mt-0 md:col-span-3">
				<AnimatePresence mode="wait">
					{features.map(
						(feature, index) =>
							index === selectedIndex && (
								<motion.div
									key={feature.id}
									className="w-full [&>figure]:bg-transparent! [&>figure]:my-0! [&_code]:break-all"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								>
									{feature.code}

									<BorderIcon className="-top-3 -left-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
									<BorderIcon className="-bottom-3 -left-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
									<BorderIcon className="-top-3 -right-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
									<BorderIcon className="-bottom-3 -right-3 absolute h-4 w-4 text-black sm:h-6 sm:w-6 dark:text-white" />
								</motion.div>
							),
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
