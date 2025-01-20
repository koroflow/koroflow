import type { FC } from "react";
import CookieBanner from "..";
import type { CookieBannerStyles } from "../types";

/**
 * A CookieBanner component with string-based custom styles.
 *
 * This variant of the CookieBanner applies styles using string class names.
 *
 * @component
 * @returns {JSX.Element} The rendered cookie banner with string styles.
 */
export const StringStyledCookieBanner: FC = () => {
	const customStyles: CookieBannerStyles = {
		root: "fixed bottom-0 left-0 right-0 z-50",
		content: "bg-gray-800 text-white p-4 md:p-6",
		title: "text-xl font-bold mb-2",
		description: "text-sm mb-4",
		actions: "flex justify-end space-x-2",
		rejectButton: "px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700",
		customizeButton:
			"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
		acceptButton:
			"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",
	};

	return <CookieBanner styles={customStyles} />;
};
