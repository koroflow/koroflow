import type { FC } from "react";
import CookieBanner from "..";
import type { CookieBannerStyles } from "../types";

/**
 * A CookieBanner component with object-based custom styles.
 *
 * This variant of the CookieBanner applies styles using inline style objects.
 *
 * @component
 * @returns {JSX.Element} The rendered cookie banner with object styles.
 */
export const ObjectStyledCookieBanner: FC = () => {
	const customStyles: CookieBannerStyles = {
		root: {
			style: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 },
		},
		content: {
			style: { backgroundColor: "#1a202c", color: "white", padding: "1rem" },
			className: "rounded-lg shadow-lg",
		},
		title: {
			style: {
				fontSize: "1.25rem",
				fontWeight: "bold",
				marginBottom: "0.5rem",
			},
		},
		description: { style: { fontSize: "0.875rem", marginBottom: "1rem" } },
		actions: {
			style: { display: "flex", justifyContent: "flex-end", gap: "0.5rem" },
		},
		rejectButton: {
			style: {
				padding: "0.5rem 1rem",
				backgroundColor: "#4a5568",
				color: "white",
				borderRadius: "0.25rem",
			},
			className: "hover:bg-gray-700 transition-colors",
		},
		customizeButton: {
			style: {
				padding: "0.5rem 1rem",
				backgroundColor: "#3182ce",
				color: "white",
				borderRadius: "0.25rem",
			},
			className: "hover:bg-blue-600 transition-colors",
		},
		acceptButton: {
			style: {
				padding: "0.5rem 1rem",
				backgroundColor: "#38a169",
				color: "white",
				borderRadius: "0.25rem",
			},
			className: "hover:bg-green-600 transition-colors",
		},
	};

	return <CookieBanner styles={customStyles} />;
};
