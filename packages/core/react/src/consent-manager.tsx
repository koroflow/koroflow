"use client";
import {
	type AllConsentNames,
	type ComplianceRegion,
	type ComplianceSettings,
	type NamespaceProps,
	type PrivacyConsentState,
	createConsentManagerStore,
} from "@koroflow/core-js";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Props for the ConsentManagerProvider component.
 */
interface ConsentManagerProviderProps extends NamespaceProps {
	/**
	 * The child components to be rendered within the provider.
	 */
	children: React.ReactNode;
	/**
	 * Initial GDPR consent types to be set in the consent manager.
	 */
	initialGdprTypes?: AllConsentNames[];
	/**
	 * Initial compliance settings for different regions.
	 */
	initialComplianceSettings?: Record<ComplianceRegion, ComplianceSettings>;
}

/**
 * Context value interface containing both state and store references
 */
interface ConsentManagerContextValue {
	/**
	 * Current state of the privacy consent
	 */
	state: PrivacyConsentState;
	/**
	 * Reference to the consent manager store
	 */
	store: ReturnType<typeof createConsentManagerStore>;
}

/**
 * Context for the consent state and store
 */
export const ConsentStateContext = createContext<ConsentManagerContextValue | undefined>(undefined);

/**
 * ConsentManagerProvider component initializes and provides consent management context.
 * This component manages the state of privacy consents and provides access to consent
 * management functionality throughout the application.
 *
 * @param {ConsentManagerProviderProps} props - The properties for the provider.
 * @returns {JSX.Element} The rendered children components with consent state context.
 */
export function ConsentManagerProvider({
	children,
	initialGdprTypes,
	initialComplianceSettings,
	namespace = "KoroflowStore",
}: ConsentManagerProviderProps) {
	// Create a stable reference to the store
	const store = useMemo(() => createConsentManagerStore(namespace), [namespace]);

	// Initialize state with the current state from the consent manager store
	const [state, setState] = useState<PrivacyConsentState>(store.getState());

	useEffect(() => {
		const { setGdprTypes, setComplianceSetting, setDetectedCountry } = store.getState();

		// Initialize GDPR types if provided
		if (initialGdprTypes) {
			setGdprTypes(initialGdprTypes);
		}

		// Initialize compliance settings if provided
		if (initialComplianceSettings) {
			for (const [region, settings] of Object.entries(initialComplianceSettings)) {
				setComplianceSetting(region as ComplianceRegion, settings);
			}
		}

		// Set detected country
		const country =
			document.querySelector('meta[name="user-country"]')?.getAttribute("content") || "US";
		setDetectedCountry(country);

		// Subscribe to state changes
		const unsubscribe = store.subscribe((newState) => {
			setState(newState);
		});

		// Cleanup subscription on unmount
		return () => {
			unsubscribe();
		};
	}, [store, initialGdprTypes, initialComplianceSettings]);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			state,
			store,
		}),
		[state, store],
	);

	return (
		<ConsentStateContext.Provider value={contextValue}>{children}</ConsentStateContext.Provider>
	);
}

/**
 * Hook to access the consent manager state and functionality.
 * Must be used within a ConsentManagerProvider.
 *
 * This hook provides access to both the current privacy consent state and
 * all methods available in the consent manager store. It combines both the
 * state values and store methods into a single object for easier access.
 *
 * @returns {PrivacyConsentState & ReturnType<typeof createConsentManagerStore>['getState']}
 * The current privacy consent state and store methods
 * @throws {Error} If used outside of a ConsentManagerProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isConsentRequired, setGdprTypes } = useConsentManager();
 *
 *   return (
 *     <div>
 *       {isConsentRequired && <ConsentBanner />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useConsentManager() {
	const context = useContext(ConsentStateContext);

	if (context === undefined) {
		throw new Error("useConsentManager must be used within a ConsentManagerProvider");
	}

	return {
		...context.state,
		...context.store.getState(),
	};
}
