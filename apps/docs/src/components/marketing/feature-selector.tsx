import { cn } from "@koroflow/shadcn/libs";
import * as React from "react";
import { BorderIcon } from "./border-icon";

// Types
interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

// Components
const Root = React.forwardRef<HTMLDivElement, RootProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mx-auto border sm:border-x-0 border-y dark:border-neutral-800",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);
Root.displayName = "FeaturesRoot";

const Item = React.forwardRef<HTMLDivElement, FeatureProps>(
	({ title, description, icon, index, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 border-b sm:border-b-0",
					(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
					index < 4 && "lg:border-b dark:border-neutral-800",
					className,
				)}
				{...props}
			>
				<BorderIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
				<BorderIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
				{index < 4 ? (
					<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
				) : (
					<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
				)}
				<div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
					{icon}
				</div>
				<div className="text-lg font-bold mb-2 relative z-10 px-10">
					<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
					<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
						{title}
					</span>
				</div>
				<p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
					{description}
				</p>
			</div>
		);
	},
);
Item.displayName = "FeaturesItem";

// Export as a namespace object
const Features = {
	Root,
	Item,
};

// Export the namespace as default
export default Features;
