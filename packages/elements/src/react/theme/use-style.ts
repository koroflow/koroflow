"use client";

import { useMemo } from "react";
import { useThemeContext } from "./context";
import type { AllThemeKeys } from "./types/style-keys";
import type { ClassNameStyle, ThemeValue } from "./types/style-types";
import { getNestedStyle } from "./utils/get-nested-style";
import { mergeStyles } from "./utils/merge-styles";

export function useStyles(themeKey: AllThemeKeys, componentStyle?: ThemeValue): ClassNameStyle {
	const { theme } = useThemeContext();

	return useMemo(() => {
		const contextStyle = getNestedStyle(theme, themeKey);

		// If componentStyle is provided and is of type "none", return it directly
		if (
			typeof componentStyle === "object" &&
			"themeType" in componentStyle &&
			componentStyle.themeType === "none"
		) {
			return componentStyle as ClassNameStyle;
		}

		// Merge context style with component style
		return mergeStyles(contextStyle as ThemeValue, componentStyle);
	}, [componentStyle, themeKey, theme]);
}

export { useThemeContext, type AllThemeKeys };
