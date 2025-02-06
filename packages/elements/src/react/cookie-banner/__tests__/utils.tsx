import type { ReactNode } from 'react';
import { expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConsentManagerProvider } from '../../../index';

interface ComponentStyles {
	component: ReactNode;
	testCases: {
		testId: string;
		className: string;
	}[];
	noStyle?: boolean;
}

async function testComponentStyles({
	component,
	testCases,
	noStyle = false,
}: ComponentStyles): Promise<void> {
	const { getByTestId } = render(
		<ConsentManagerProvider>{component}</ConsentManagerProvider>
	);

	for (const { testId, className } of testCases) {
		const element = getByTestId(testId);
		// biome-ignore lint/suspicious/noMisplacedAssertion: utility function - will be called inside tests
		await expect.element(element).toHaveClass(className, { exact: noStyle });
	}
}

export default testComponentStyles;
