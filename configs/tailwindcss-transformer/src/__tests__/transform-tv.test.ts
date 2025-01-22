import { describe, expect, it } from "vitest";
import { transform } from "../index.js";

describe("tv transformation", () => {
	it("should transform tv class names", () => {
		const input = `
      export const buttonVariants = tv({
        slots: {
          root: [
            "relative inline-flex items-center justify-center",
            "transition duration-200",
          ],
          icon: [
            "flex size-5 shrink-0 items-center justify-center",
          ],
        },
        variants: {
          variantStyle: {
            primary: {
              root: "bg-primary-500 text-white",
            },
            neutral: {
              root: "bg-gray-500 text-white",
            },
          },
          size: {
            small: {
              root: "h-8 px-3 text-sm",
              icon: "-mx-1",
            },
            medium: {
              root: "h-10 px-4 text-base",
              icon: "-mx-2",
            },
          },
        },
        compoundVariants: [
          {
            variantStyle: "primary",
            size: "small",
            class: {
              root: [
                "hover:bg-primary-600",
                "focus:ring-2 focus:ring-primary-500",
              ],
            },
          },
        ],
        defaultVariants: {
          variantStyle: "primary",
          size: "medium",
        },
      });
    `;

		const styleCache = new Map();
		const result = transform(input, { styleCache });

		// Verify the transformation kept tv structure
		expect(result).toContain("tv({");
		expect(result).toContain("slots:");
		expect(result).toContain("variants:");
		expect(result).toContain("compoundVariants:");
		expect(result).toContain("defaultVariants:");

		// Verify class names were transformed
		expect(result).not.toContain("relative inline-flex");
		expect(result).not.toContain("bg-primary-500");
		expect(result).not.toContain("hover:bg-primary-600");

		// Verify hashed class names were generated
		expect(result).toMatch(/kf-[a-z0-9]{8}/);

		// Verify styleCache was populated
		expect(styleCache.size).toBeGreaterThan(0);

		// Verify specific transformations
		for (const [hash, original] of styleCache.entries()) {
			expect(hash).toMatch(/^kf-[a-z0-9]{8}$/);
			expect(result).toContain(hash);
			expect(typeof original).toBe("string");
		}

		// Verify structure is maintained
		const transformed = result.replace(/kf-[a-z0-9]{8}/g, "HASHED");
		expect(transformed).toMatchInlineSnapshot(`
      "
            export const buttonVariants = tv({
              slots: {
                root: [
                  "HASHED",
                  "HASHED",
                ],
                icon: [
                  "HASHED",
                ],
              },
              variants: {
                variantStyle: {
                  primary: {
                    root: "HASHED",
                  },
                  neutral: {
                    root: "HASHED",
                  },
                },
                size: {
                  small: {
                    root: "HASHED",
                    icon: "HASHED",
                  },
                  medium: {
                    root: "HASHED",
                    icon: "HASHED",
                  },
                },
              },
              compoundVariants: [
                {
                  variantStyle: "primary",
                  size: "small",
                  class: {
                    root: [
                      "HASHED",
                      "HASHED",
                    ],
                  },
                },
              ],
              defaultVariants: {
                variantStyle: "primary",
                size: "medium",
              },
            });
          "
    `);
	});
});
