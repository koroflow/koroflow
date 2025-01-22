import { cn } from "@/lib/utils";

/**
 * Props for the ComponentWrapper component.
 */
interface ComponentWrapperProps {
	/**
	 * Additional class names to apply to the wrapper.
	 */
	className?: string;

	/**
	 * The child components to be wrapped.
	 */
	children: React.ReactNode;
}

/**
 * A simple wrapper component that provides a consistent layout and styling for previewing components.
 *
 * @param props - The props for the ComponentWrapper component.
 * @returns A JSX element that wraps the provided children with additional styling.
 *
 * @remarks
 * This component is used to wrap components that are being previewed, providing a consistent layout and styling.
 */
const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ className, children }) => {
	return (
		<div
			className={cn(
				"max-w-screen relative flex flex-col items-center justify-center p-0 md:border md:p-16",
				className,
			)}
		>
			<div
				className={cn(
					"absolute inset-0 size-full",
					"bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]",
					"lab-bg pointer-events-none [background-size:16px_16px]",
				)}
			/>
			{children}
		</div>
	);
};

export default ComponentWrapper;
