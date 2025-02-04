import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConsentManagerProvider, CookieBanner } from '../../../index';
import * as ExpandedCookieBanner from '../index';

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

test('Renders cookie banner with custom text', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<CookieBanner
				title="Custom Privacy Notice"
				description="Please accept our cookies"
				acceptButtonText="Yes, accept"
				rejectButtonText="No, thanks"
				customizeButtonText="More options"
			/>
		</ConsentManagerProvider>
	);

	await expect.element(screen.getByText('Custom Privacy Notice')).toBeVisible();
	await expect
		.element(screen.getByText('Please accept our cookies'))
		.toBeVisible();
	await expect.element(screen.getByText('Yes, accept')).toBeVisible();
	await expect.element(screen.getByText('No, thanks')).toBeVisible();
	await expect.element(screen.getByText('More options')).toBeVisible();
});

test('Renders cookie banner using namespaced components', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<ExpandedCookieBanner.Root>
				<ExpandedCookieBanner.Title>Custom Title</ExpandedCookieBanner.Title>
				<ExpandedCookieBanner.Description>
					Custom description here
				</ExpandedCookieBanner.Description>
				<ExpandedCookieBanner.Footer>
					<ExpandedCookieBanner.AcceptButton themeKey="accept">
						OK
					</ExpandedCookieBanner.AcceptButton>
					<ExpandedCookieBanner.RejectButton themeKey="reject">
						Decline
					</ExpandedCookieBanner.RejectButton>
					<ExpandedCookieBanner.CustomizeButton themeKey="customize">
						Settings
					</ExpandedCookieBanner.CustomizeButton>
				</ExpandedCookieBanner.Footer>
			</ExpandedCookieBanner.Root>
		</ConsentManagerProvider>
	);

	await expect.element(screen.getByText('Custom Title')).toBeVisible();
	await expect
		.element(screen.getByText('Custom description here'))
		.toBeVisible();
	await expect.element(screen.getByText('OK')).toBeVisible();
	await expect.element(screen.getByText('Decline')).toBeVisible();
	await expect.element(screen.getByText('Settings')).toBeVisible();
});

test('Renders expanded cookie banner with custom classNames', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<ExpandedCookieBanner.Root className="custom-root">
				<ExpandedCookieBanner.Title className="custom-title">
					Cookie Settings
				</ExpandedCookieBanner.Title>
				<ExpandedCookieBanner.Description className="custom-description">
					Please accept our cookies
				</ExpandedCookieBanner.Description>
				<ExpandedCookieBanner.Footer className="custom-footer">
					<ExpandedCookieBanner.AcceptButton
						themeKey="accept"
						className="custom-accept"
					>
						Accept
					</ExpandedCookieBanner.AcceptButton>
					<ExpandedCookieBanner.RejectButton
						themeKey="reject"
						className="custom-reject"
					>
						Reject
					</ExpandedCookieBanner.RejectButton>
					<ExpandedCookieBanner.CustomizeButton
						themeKey="customize"
						className="custom-customize"
					>
						Customize
					</ExpandedCookieBanner.CustomizeButton>
				</ExpandedCookieBanner.Footer>
			</ExpandedCookieBanner.Root>
		</ConsentManagerProvider>
	);

	await expect
		.element(screen.getByTestId('cookie-banner-root'))
		.toHaveClass('custom-root');
	await expect
		.element(screen.getByText('Cookie Settings'))
		.toHaveClass('custom-title');
	await expect
		.element(screen.getByText('Please accept our cookies'))
		.toHaveClass('custom-description');
	await expect
		.element(screen.getByTestId('cookie-banner-footer'))
		.toHaveClass('custom-footer');
	await expect
		.element(screen.getByRole('button', { name: 'Accept' }))
		.toHaveClass('custom-accept');
	await expect
		.element(screen.getByRole('button', { name: 'Reject' }))
		.toHaveClass('custom-reject');
	await expect
		.element(screen.getByRole('button', { name: 'Customize' }))
		.toHaveClass('custom-customize');
});

test('Renders cookie banner elements with asChild prop', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<ExpandedCookieBanner.Root>
				<ExpandedCookieBanner.Card asChild>
					<section>
						<ExpandedCookieBanner.Title asChild>
							<h2>Cookie Settings</h2>
						</ExpandedCookieBanner.Title>
						<ExpandedCookieBanner.Description asChild>
							<p>Please accept our cookies</p>
						</ExpandedCookieBanner.Description>
						<ExpandedCookieBanner.Footer asChild>
							<div>
								<ExpandedCookieBanner.AcceptButton asChild themeKey="accept">
									<button type="button">Accept</button>
								</ExpandedCookieBanner.AcceptButton>
								<ExpandedCookieBanner.RejectButton asChild themeKey="reject">
									<button type="button">Reject</button>
								</ExpandedCookieBanner.RejectButton>
								<ExpandedCookieBanner.CustomizeButton
									asChild
									themeKey="customize"
								>
									<button type="button">Customize</button>
								</ExpandedCookieBanner.CustomizeButton>
							</div>
						</ExpandedCookieBanner.Footer>
					</section>
				</ExpandedCookieBanner.Card>
			</ExpandedCookieBanner.Root>
		</ConsentManagerProvider>
	);

	const heading = screen.getByRole('heading', { level: 2 });
	const acceptButton = screen.getByRole('button', { name: 'Accept' });
	const rejectButton = screen.getByRole('button', { name: 'Reject' });
	const customizeButton = screen.getByRole('button', { name: 'Customize' });

	await expect.element(heading).toHaveTextContent('Cookie Settings');

	await expect.element(acceptButton).toHaveTextContent('Accept');
	await expect.element(rejectButton).toHaveTextContent('Reject');
	await expect.element(customizeButton).toHaveTextContent('Customize');
});

test('Shows error boundary fallback when used without ConsentManagerProvider', async () => {
	const screen = render(<CookieBanner />);

	await expect
		.element(screen.getByText('Something went wrong with the Cookie Banner.'))
		.toBeVisible();
});

test('Custom theme can be passed by object with custom classnames', async () => {
	const screen = render(
		<ConsentManagerProvider>
			<CookieBanner
				theme={{
					'cookie-banner.root': 'custom-root',
					'cookie-banner.card': 'custom-card',
					'cookie-banner.header.root': 'custom-header',
					'cookie-banner.header.title': 'custom-title',
					'cookie-banner.header.description': 'custom-description',
					'cookie-banner.footer': 'custom-footer',
					'cookie-banner.footer.reject-button': 'custom-reject',
					'cookie-banner.footer.customize-button': 'custom-customize',
					'cookie-banner.footer.accept-button': 'custom-accept',
				}}
			/>
		</ConsentManagerProvider>
	);

	await expect
		.element(screen.getByTestId('cookie-banner-root'))
		.toHaveClass('custom-root');
	await expect
		.element(screen.getByTestId('cookie-banner-footer'))
		.toHaveClass('custom-footer');
	await expect
		.element(screen.getByText('We value your privacy'))
		.toHaveClass('custom-title');
	await expect
		.element(
			screen.getByText(
				'This site uses cookies to improve your browsing experience, analyze site traffic, and show personalized content.'
			)
		)
		.toHaveClass('custom-description');
	await expect
		.element(screen.getByRole('button', { name: 'Reject All' }))
		.toHaveClass('custom-reject');
	await expect
		.element(screen.getByRole('button', { name: 'Customize' }))
		.toHaveClass('custom-customize');
	await expect
		.element(screen.getByRole('button', { name: 'Accept All' }))
		.toHaveClass('custom-accept');
});
