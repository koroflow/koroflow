import type { FC } from "react";
import { CookieBanner, type CookieBannerTheme } from "~/index";

/**
 * A CookieBanner component with string-based custom styles.
 *
 * This variant of the CookieBanner applies styles using string class names.
 *
 * @component
 * @returns {JSX.Element} The rendered cookie banner with string styles.
 */
export const StringStyledCookieBanner: FC = () => {
	const customStyles: Partial<CookieBannerTheme> = {
		"cookie-banner.root": "fixed bottom-0 left-0 right-0 z-50",
		"cookie-banner.header.root": "bg-gray-800 text-white p-4 md:p-6",
		"cookie-banner.header.title": "text-xl font-bold mb-2",
		"cookie-banner.header.description": "mb-4",
		"cookie-banner.footer": "flex justify-end space-x-2",
		"cookie-banner.footer.reject-button":
			"px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700",
		"cookie-banner.footer.customize-button":
			"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
		"cookie-banner.footer.accept-button":
			"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",
	};

	return <CookieBanner theme={customStyles} />;
};
