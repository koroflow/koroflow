import { describe, expect, it } from "vitest";
import { transform } from "../index";

describe("transform", () => {
	it("should transform cva correctly", () => {
		const result = transform(
			`const button = cva({
        base: "rounded border font-semibold",
        variants: {
          intent: {
            primary: [
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: "border-gray-400 bg-white text-gray-800 hover:bg-gray-100",
          },
          size: {
            small: "px-2 py-1 text-sm",
            medium: "px-4 py-2 text-base",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "uppercase"
          },
        ],
        defaultVariants: {
          intent: "primary",
          size: "medium",
        },
      });
      
      const Button: React.FC<ButtonProps> = ({ children, intent, size = 'sm', className }) => {
        return <button className={button({ intent: 'primary', size, className: ['text-white', className] })}>{children}</button>
      }
      
      const ButtonLink: React.FC<LinkProps> = ({ children, intent, size, className }) => {
        return <a className={button({ intent, size: 'sm', className })}>{children}</a>
      }`,
			{
				styleCache: new Map(),
			},
		);
		expect(result).toMatchSnapshot();
	});
});
