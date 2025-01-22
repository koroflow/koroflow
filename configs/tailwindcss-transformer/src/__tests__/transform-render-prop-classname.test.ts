import { describe, expect, it } from "vitest";
import { transform } from "../index";

describe("transform", () => {
	it("should transform render prop with className", () => {
		const result = transform(
			`const Button: React.FC<ButtonProps> = ({ children, className }) => {
      return <div render={() => <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{children}</button>} />
    }`,
			{
				styleCache: new Map(),
			},
		);
		expect(result).toMatchSnapshot();
	});
});
