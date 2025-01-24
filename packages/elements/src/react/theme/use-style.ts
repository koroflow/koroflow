"use client";

import { useMemo } from "react";
import { useThemeContext } from "./context";
import type { AllThemeKeys } from "./types/style-keys";
import type { ClassNameStyle, StylesObject, ThemeValue } from "./types/style-types";
import { getNestedStyle } from "./utils/get-nested-style";
import { mergeStyles } from "./utils/merge-styles";

export function useStyles(themeKey: AllThemeKeys, componentStyle?: ThemeValue): ClassNameStyle {
	const { theme, noStyle: contextNoStyle } = useThemeContext();

	return useMemo(() => {
		// If noStyle is set in context or component, return empty styles
		if (contextNoStyle || (typeof componentStyle === "object" && componentStyle?.noStyle)) {
			return {
				className: undefined,
				style: undefined,
			};
		}

		// Cast theme to StylesObject to satisfy TypeScript
		const contextStyle = getNestedStyle(theme as StylesObject, themeKey);

		// If componentStyle is provided and is of type "none", return it directly
		if (typeof componentStyle === "object" && componentStyle.noStyle) {
			return componentStyle as ClassNameStyle;
		}

		// Merge context style with component style
		return mergeStyles(contextStyle as ThemeValue, componentStyle);
	}, [componentStyle, themeKey, theme, contextNoStyle]);
}

export { useThemeContext, type AllThemeKeys };
