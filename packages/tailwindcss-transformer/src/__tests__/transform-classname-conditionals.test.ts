import { describe, expect, it } from "vitest";
import { transform } from "../index";

describe("transform", () => {
	it("should transform className with conditionals", () => {
		const result = transform(
			`const Button: React.FC<ButtonProps> = ({ children, display }) => {
      return <button className={display === 'flex' ? 'flex' : 'inline-flex'}>{children}</button>
    }`,
			{
				styleCache: new Map(),
			},
		);
		expect(result).toMatchSnapshot();
	});
});
