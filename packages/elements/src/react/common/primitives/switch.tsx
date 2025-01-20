"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";
import { cn } from "../../libs/utils";

const Switch = forwardRef<
	ComponentRef<typeof SwitchPrimitives.Root>,
	ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			" inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-gray-a4 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-9 data-[state=unchecked]:bg-white",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
