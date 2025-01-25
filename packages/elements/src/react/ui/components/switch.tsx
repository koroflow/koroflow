import * as SwitchPrimitives from "@radix-ui/react-switch";

import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";
import { Box } from "../../primitives/box";

import { type AllThemeKeys, type ExtendThemeKeys, type ThemeValue, useStyles } from "../../theme";

import "./switch.css";

export type SwitchStylesKeys = {
	"switch.root": ThemeValue;
	"switch.thumb": ThemeValue;
	"switch.track": ThemeValue;
};
/**
 * Props for the description text component of the CookieBanner.
 * Extends standard HTML div attributes.
 *
 * @public
 */
export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	asChild?: boolean;
	theme?: {
		root: ExtendThemeKeys;
		thumb: ExtendThemeKeys;
		track: ExtendThemeKeys;
	};
}

const Switch = forwardRef<ComponentRef<typeof SwitchPrimitives.Root>, SwitchProps>(
	({ className, disabled, slot, theme, ...rest }, forwardedRef) => {
		const switchRoot = useStyles(theme?.root.themeKey ?? "switch.root", {
			baseClassName: ["switch switch-root"],
			...theme?.root,
		});
		const switchThumb = useStyles(theme?.thumb.themeKey ?? "switch.thumb", {
			baseClassName: ["switch-thumb", disabled && "switch-thumb-disabled"],
			style: {
				["--mask" as string]:
					"radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat",
				...theme?.thumb.style,
			},
			...theme?.thumb,
		});
		const switchTrack = useStyles(theme?.track.themeKey ?? "switch.track", {
			baseClassName: ["switch-track", disabled && "switch-track-disabled"],
			...theme?.track,
		});

		return (
			<SwitchPrimitives.Root ref={forwardedRef} disabled={disabled} {...rest} {...switchRoot}>
				<Box themeKey={theme?.track.themeKey ?? "switch.track"} {...switchTrack}>
					<SwitchPrimitives.Thumb {...switchThumb} />
				</Box>
			</SwitchPrimitives.Root>
		);
	},
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch as Root };
