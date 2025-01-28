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
			className="grid grid-cols-1 md:grid-cols-5 relative gap-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div className="md:col-span-2 border-b md:border-b-0 bg-background sticky top-[var(--header-height)]">
				<div className="flex md:flex-col space-y-8">
					{features.map((option, index) => (
						<motion.button
							key={option.id}
							onClick={() => {
								setSelectedIndex(index);
								setProgress(0);
							}}
							className={`flex-shrink-0 w-64 md:w-full text-left p-4 mb-2 mr-2 last:mr-0 md:mr-0 rounded border relative ${
								selectedIndex === index ? "bg-accent/70" : "hover:bg-muted/50"
							}`}
							animate={{
								opacity: index === selectedIndex ? 1 : 0.7,
								scale: index === selectedIndex ? 1.02 : 1,
							}}
							transition={{ duration: 0.5 }}
						>
							<div className="flex items-center gap-4">
								<motion.div
									className={`size-8 shrink-0 rounded-full flex items-center justify-center border-2 ${
										index === selectedIndex
											? "bg-primary border-primary text-primary-foreground"
											: "bg-muted border-muted-foreground"
									}`}
								>
									{index <= selectedIndex ? (
										<span className="text-lg font-bold">✓</span>
									) : (
										<span className="text-lg font-semibold">{index + 1}</span>
									)}
								</motion.div>
								<div>
									<h3 className="font-medium tracking-tight">{option.title}</h3>
									<p className="text-sm text-muted-foreground">{option.description}</p>
								</div>
							</div>
							{index === selectedIndex && (
								<motion.div
									className="absolute bottom-0 left-0 h-1 bg-primary mx-4"
									initial={{ width: "0%" }}
									animate={{ width: `${progress}%` }}
									transition={{ duration: 0.1, ease: "linear" }}
								/>
							)}

							<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
							<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
							<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
							<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
						</motion.button>
					))}
				</div>
			</motion.div>
			<div className="col-span-1 md:col-span-3 relative">
				<AnimatePresence mode="wait">
					{features.map(
						(feature, index) =>
							index === selectedIndex && (
								<motion.div
									key={feature.id}
									className="w-full [&>figure]:!bg-transparent [&>figure]:!my-0 [&_code]:break-all"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								>
									{feature.code}

									<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
									<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
									<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
									<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
								</motion.div>
							),
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
