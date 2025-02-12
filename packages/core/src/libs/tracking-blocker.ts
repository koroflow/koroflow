/**
 * @packageDocumentation
 * Implements automatic blocking of tracking scripts and network requests until user consent is granted.
 */

import type { AllConsentNames, ConsentState } from '../types';
import DEFAULT_DOMAIN_CONSENT_MAP from './tracking-domains';

/**
 * Configuration options for the tracking blocker
 */
export interface TrackingBlockerConfig {
	/** Whether to disable automatic blocking (defaults to false) */
	disableAutomaticBlocking?: boolean;

	/** Override the default domain consent map */
	overrideDomainConsentMap?: boolean;

	/** Map of domains to their required consent types */
	domainConsentMap?: Record<string, AllConsentNames>;
}

/**
 * Create default consent state with all consents set to their default values
 */
function createDefaultConsentState(): ConsentState {
	return {
		experience: false,
		functionality: false,
		marketing: false,
		measurement: false,
		necessary: true,
	};
}

interface TrackingBlocker {
	updateConsents: (newConsents: ConsentState) => void;
	destroy: () => void;
}

/**
 * Creates a tracking blocker instance that handles blocking of tracking scripts and network requests
 */
export function createTrackingBlocker(
	config: TrackingBlockerConfig = {},
	initialConsents?: ConsentState
): TrackingBlocker {
	const blockerConfig = {
		disableAutomaticBlocking: false,
		...config,
		domainConsentMap: config.overrideDomainConsentMap
			? config.domainConsentMap
			: { ...DEFAULT_DOMAIN_CONSENT_MAP, ...config.domainConsentMap },
	};

	let consents = initialConsents || createDefaultConsentState();
	const originalFetch = window.fetch;
	const originalXHR = window.XMLHttpRequest;
	let mutationObserver: MutationObserver | null = null;

	/**
	 * Check if a URL requires consent and if that consent has been granted
	 */
	function isRequestAllowed(url: string): boolean {
		try {
			const domain = new URL(url).hostname;
			const requiredConsent = blockerConfig.domainConsentMap?.[domain];

			if (!requiredConsent) {
				return true; // Allow if no consent required
			}

			return consents[requiredConsent] === true;
		} catch {
			return true; // Allow malformed URLs
		}
	}

	/**
	 * Handle individual script elements
	 */
	function handleScriptElement(script: HTMLScriptElement): void {
		const src = script.src;
		if (src && !isRequestAllowed(src)) {
			script.remove();
		}
	}

	/**
	 * Remove existing tracking scripts
	 */
	function removeTrackingScripts(): void {
		const scripts = document.getElementsByTagName('script');
		for (const script of Array.from(scripts)) {
			handleScriptElement(script);
		}
	}

	/**
	 * Set up blocking of tracking scripts
	 */
	function setupScriptBlocking(): void {
		// Block existing scripts
		removeTrackingScripts();

		// Set up observer for dynamically added scripts
		mutationObserver = new MutationObserver(handleMutations);

		// Start observing
		mutationObserver.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	/**
	 * Handle DOM mutations to block new tracking scripts
	 */
	function handleMutations(mutations: MutationRecord[]): void {
		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				for (const node of mutation.addedNodes) {
					if (node instanceof HTMLScriptElement) {
						handleScriptElement(node);
					}
				}
			}
		}
	}

	/**
	 * Intercept and potentially block network requests
	 */
	function interceptNetworkRequests(): void {
		// Override fetch
		window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
			const url = input instanceof Request ? input.url : input.toString();

			if (!isRequestAllowed(url)) {
				throw new Error(`Request to ${url} blocked due to missing consent`);
			}

			return originalFetch.call(window, input, init);
		};

		// Override XMLHttpRequest
		window.XMLHttpRequest = class extends originalXHR {
			open(
				method: string,
				url: string | URL,
				async = true,
				username?: string,
				password?: string
			) {
				if (!isRequestAllowed(url.toString())) {
					throw new Error(`Request to ${url} blocked due to missing consent`);
				}

				super.open(method, url, async, username, password);
			}
		};
	}

	// Initialize if automatic blocking is enabled
	if (!blockerConfig.disableAutomaticBlocking) {
		interceptNetworkRequests();
		setupScriptBlocking();
	}

	return {
		updateConsents: (newConsents: ConsentState) => {
			consents = newConsents;
		},
		destroy: () => {
			window.fetch = originalFetch;
			window.XMLHttpRequest = originalXHR;
			mutationObserver?.disconnect();
		},
	};
}
