import type { NestedThemeValue, StylesObject } from "../types/style-types";
import type { AllThemeKeys } from "../use-style";

export function getNestedStyle(styles: StylesObject, key: AllThemeKeys): NestedThemeValue;

export function getNestedStyle(
	styles: StylesObject,
	key: readonly AllThemeKeys[],
): NestedThemeValue[];
export function getNestedStyle(
	styles: StylesObject,
	key: AllThemeKeys | readonly AllThemeKeys[],
): NestedThemeValue | NestedThemeValue[] {
	if (Array.isArray(key)) {
		return key.map((k) => getNestedStyle(styles, k));
	}

	if (typeof key === "string") {
		const parts = key.split(".");
		let value: NestedThemeValue = styles;
		for (const part of parts) {
			function isNestedThemeValueObject(
				value: NestedThemeValue,
			): value is { readonly [key: string]: NestedThemeValue } {
				return (
					typeof value === "object" &&
					value !== null &&
					!("className" in value) &&
					!("style" in value)
				);
			}
			if (isNestedThemeValueObject(value) && part in value) {
				value = value[part];
			} else {
				return undefined;
			}
		}
		return value;
	}
}
