import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConsentManagerProvider, CookieBanner } from '../../../index';

test('Renders default cookie banner', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<CookieBanner />
		</ConsentManagerProvider>
	);

	await expect.element(screen.getByText('We value your privacy')).toBeVisible();
	await expect.element(screen.getByText('Accept all')).toBeVisible();
	await expect.element(screen.getByText('Reject all')).toBeVisible();
	await expect.element(screen.getByText('Customize')).toBeVisible();
});
