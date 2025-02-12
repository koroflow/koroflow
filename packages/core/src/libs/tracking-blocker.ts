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

	/**
	 * Normalize a domain by removing 'www.' prefix and ensuring consistent format
	 */
	function normalizeDomain(domain: string): string {
		return domain.toLowerCase().replace(/^www\./, '');
	}

	/**
	 * Check if a domain matches any entry in the domain map, including subdomains
	 */
	function findMatchingDomain(
		domain: string,
		domainMap: Record<string, AllConsentNames>
	): AllConsentNames | undefined {
		const normalizedDomain = normalizeDomain(domain);

		// First try exact match
		const directMatch = domainMap[normalizedDomain];
		if (directMatch) {
			return directMatch;
		}

		// Then try matching as a subdomain
		for (const [mapDomain, consent] of Object.entries(domainMap)) {
			const normalizedMapDomain = normalizeDomain(mapDomain);
			if (
				normalizedDomain.endsWith(`.${normalizedMapDomain}`) ||
				normalizedDomain === normalizedMapDomain
			) {
				return consent;
			}
		}

		return undefined;
	}

	/**
	 * Check if a URL requires consent and if that consent has been granted
	 */
	function isRequestAllowed(url: string): boolean {
		try {
			const domain = new URL(url).hostname;
			const requiredConsent = findMatchingDomain(
				domain,
				blockerConfig.domainConsentMap || {}
			);

			if (!requiredConsent) {
				return true; // Allow if no consent required
			}

			return consents[requiredConsent] === true;
		} catch {
			return true; // Allow malformed URLs
		}
	}

	/**
	 * Dispatch an event when a request is blocked due to missing consent
	 */
	function dispatchConsentBlockedEvent(url: string): void {
		document.dispatchEvent(
			new CustomEvent('ConsentBlockedRequest', { detail: { url } })
		);
	}

	/**
	 * Intercept and potentially block network requests
	 */
	function interceptNetworkRequests(): void {
		// Override fetch only if it hasn't been modified by another script
		if (window.fetch === originalFetch) {
			window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
				const url = input instanceof Request ? input.url : input.toString();

				if (!isRequestAllowed(url)) {
					dispatchConsentBlockedEvent(url);
					return Promise.reject(
						new Error(`Request to ${url} blocked due to missing consent`)
					);
				}

				return await originalFetch.call(window, input, init);
			};
		}

		// Override XMLHttpRequest only if it hasn't been modified
		if (window.XMLHttpRequest === originalXHR) {
			window.XMLHttpRequest = class extends originalXHR {
				override open(
					method: string,
					url: string | URL,
					async = true,
					username?: string,
					password?: string
				) {
					if (!isRequestAllowed(url.toString())) {
						dispatchConsentBlockedEvent(url.toString());
						throw new Error(`Request to ${url} blocked due to missing consent`);
					}

					super.open(method, url, async, username, password);
				}
			};
		}
	}

	/**
	 * Safe restoration of fetch and XHR
	 */
	function restoreOriginalRequests(): void {
		// Only restore if the current implementations are our overridden versions
		const currentFetch = window.fetch.toString();
		const currentXHR = window.XMLHttpRequest.toString();

		// Check if the current implementations match our overridden versions
		if (currentFetch.includes('dispatchConsentBlockedEvent')) {
			window.fetch = originalFetch;
		}
		if (currentXHR.includes('dispatchConsentBlockedEvent')) {
			window.XMLHttpRequest = originalXHR;
		}
	}

	// Initialize if automatic blocking is enabled
	if (!blockerConfig.disableAutomaticBlocking) {
		interceptNetworkRequests();
	}

	return {
		updateConsents: (newConsents: ConsentState) => {
			consents = newConsents;
		},
		destroy: () => {
			restoreOriginalRequests();
		},
	};
}
