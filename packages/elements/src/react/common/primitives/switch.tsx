import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "../libs/cn";
import "./switch.css";

const Switch = React.forwardRef<
	React.ComponentRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, disabled, ...rest }, forwardedRef) => {
	return (
		<SwitchPrimitives.Root
			className={cn("switch switch-root", className)}
			ref={forwardedRef}
			disabled={disabled}
			{...rest}
		>
			<div
				className={cn(
					// base
					"switch-track",
					disabled && "switch-track-disabled",
				)}
			>
				<SwitchPrimitives.Thumb
					className={cn("switch-thumb", disabled && "switch-thumb-disabled")}
					style={{
						["--mask" as string]:
							"radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat",
					}}
				/>
			</div>
		</SwitchPrimitives.Root>
	);
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch as Root };
