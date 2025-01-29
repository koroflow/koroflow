import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ConsentManagerProvider } from "../../headless";
import { CookieBannerRoot } from "../atoms/root";
import { CookieBannerHeader } from "../components";

test("renders name", async () => {
	const { getByText, getByRole } = render(
		<ConsentManagerProvider>
			<CookieBannerRoot>
				<CookieBannerHeader>Hello Vitest x1! </CookieBannerHeader>
			</CookieBannerRoot>
		</ConsentManagerProvider>,
	);

	await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
	await getByRole("button", { name: "Increment " }).click();
});
