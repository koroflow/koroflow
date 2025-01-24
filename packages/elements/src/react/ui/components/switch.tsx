import * as SwitchPrimitives from "@radix-ui/react-switch";

import "./switch.css";
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";
import { Box } from "../../primitives/box";
import type { ClassNameStyleWithKey } from "../../theme/types";
import { useStyles } from "../../theme/useStyle";

const Switch = forwardRef<
	ComponentRef<typeof SwitchPrimitives.Root>,
	ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & ClassNameStyleWithKey
>(
	(
		{ className, disabled, styleKey = ["switch", "root"], styleType, style, ...rest },
		forwardedRef,
	) => {
		const switchRoot = useStyles(styleKey, {
			baseClassName: ["switch switch-root"],
			className,
			styleType,
			style,
		});

		const switchThumb = useStyles(["switch", "thumb"], {
			baseClassName: ["switch-thumb", disabled && "switch-thumb-disabled"],
			style: {
				["--mask" as string]:
					"radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat",
			},
		});
		return (
			<SwitchPrimitives.Root ref={forwardedRef} disabled={disabled} {...rest} {...switchRoot}>
				<Box
					styleKey={["switch", "track"]}
					baseClassName={["switch-track", disabled && "switch-track-disabled"]}
				>
					<SwitchPrimitives.Thumb {...switchThumb} />
				</Box>
			</SwitchPrimitives.Root>
		);
	},
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch as Root };
