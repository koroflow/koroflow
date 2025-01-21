import { createHash } from "node:crypto";

/**
 * Generates a deterministic hashed class name from a given value
 * @param value - The original class name value to hash
 * @returns A hashed class name prefixed with 'kf-'
 * @internal
 */
export function generateHashedClassName(value: string): string {
	return `kf-${createHash("sha256").update(value, "utf8").digest("hex").slice(0, 8)}`;
}

/**
 * Regular expression for matching generated class names
 * @internal
 */
export const clRegex = /^kf-[a-z0-9]{8}$/;

/**
 * Regular expression for matching test class names
 * @internal
 */
export const clTestRegex = /^kf-test/;
