"use client";
import { useMemo } from "react";
import { cnExt } from "../ui/libs/cn";
import { useThemeContext } from "./context";
import type { ClassNameStyle } from "./types";
import type { CookieBannerStyles, NestedStyleValue, StyleValue } from "./types";

export type NestedStyleKey = string | string[];

function getNestedStyle(
	styles: CookieBannerStyles,
	key: NestedStyleKey,
): NestedStyleValue | undefined {
	if (typeof key === "string") {
		return styles[key as keyof CookieBannerStyles];
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let current: any = styles;
	for (const k of key) {
		if (current[k] === undefined) {
			return undefined;
		}
		current = current[k];
	}
	return current;
}

export function useStyles(styleKey: NestedStyleKey, componentStyle?: StyleValue): ClassNameStyle {
	const { styles } = useThemeContext();

	return useMemo(() => {
		const contextStyle = getNestedStyle(styles, styleKey);

		// If componentStyle is provided and is of type "none", return it directly
		if (typeof componentStyle === "object" && componentStyle.styleType === "none") {
			return componentStyle as ClassNameStyle;
		}

		// Merge context style with component style
		const { styleType: _, ...mergedStyle } = mergeStyles(contextStyle, componentStyle);

		return mergedStyle;
	}, [componentStyle, styleKey, styles]);
}

function mergeStyles(style1?: NestedStyleValue, style2?: StyleValue): ClassNameStyle {
	const getStyleValue = (style: NestedStyleValue | undefined): StyleValue | undefined => {
		if (typeof style === "string" || style === undefined) {
			return style;
		}
		if ("className" in style || "style" in style || "styleType" in style) {
			return style;
		}
		return undefined;
	};

	const s1 = getStyleValue(style1);
	const s2 = getStyleValue(style2);

	const className = cnExt([
		typeof s1 === "string" ? s1 : s1?.className,
		typeof s2 === "string" ? s2 : s2?.className,
		typeof s1 === "object" && s1?.baseClassName,
		typeof s2 === "object" && s2?.baseClassName,
	]);

	const style = {
		...(typeof s1 === "object" && s1?.style),
		...(typeof s2 === "object" && s2?.style),
	};

	return {
		className: className || undefined,
		style: Object.keys(style).length > 0 ? style : undefined,
		styleType: (typeof s2 === "object" && s2?.styleType) || "full",
	};
}
