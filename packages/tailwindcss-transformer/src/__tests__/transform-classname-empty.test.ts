import { describe, expect, it } from "vitest";
import { transform } from "../index";

describe("transform", () => {
	it("should transform empty className", () => {
		const result = transform(
			`const Button: React.FC<ButtonProps> = ({ children, className }) => {
      return <button className=''>{children}</button>
    }`,
			{
				styleCache: new Map(),
			},
		);
		expect(result).toMatchSnapshot();
	});
});
