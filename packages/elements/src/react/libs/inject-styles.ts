import stylesheetContent from "../../styles.css";

const STYLESHEET_SIGIL = "data-elements-injected-styles";

/**
 * Injects the default styles into the document head.
 * If noStyle is true, styles will not be injected.
 * If styles are already injected, they will not be injected again.
 */
export function injectStyles({ noStyle = false }: { noStyle?: boolean } = {}) {
	if (noStyle) {
		return;
	}

	// Check if styles are already injected
	const existingStylesheet = document.querySelector(`[${STYLESHEET_SIGIL}]`);
	if (existingStylesheet) {
		return;
	}

	// Create style element and inject CSS content
	const stylesheet = document.createElement("style");
	stylesheet.textContent = stylesheetContent.toString();
	stylesheet.setAttribute(STYLESHEET_SIGIL, "");

	// Add as first stylesheet so that application styles take precedence
	document.head.prepend(stylesheet);
}
