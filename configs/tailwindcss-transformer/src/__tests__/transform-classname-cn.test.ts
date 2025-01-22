import { describe, expect, it } from "vitest";
import { transform } from "../index";

describe("transform", () => {
	it("should transform className with cn/cx/clsx", () => {
		const result = transform(
			`const ButtonCn: React.FC<ButtonProps> = ({ children, className }) => {
        return <button className={cn('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}>{children}</button>
      }
    
      const ButtonCx: React.FC<ButtonProps> = ({ children, className }) => {
        return <button className={cx('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}>{children}</button>
      }
      
      const ButtonClsx: React.FC<ButtonProps> = ({ children, className }) => {
        return <button className={clsx('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}>{children}</button>
      }`,
			{
				styleCache: new Map(),
			},
		);
		expect(result).toMatchSnapshot();
	});
});
