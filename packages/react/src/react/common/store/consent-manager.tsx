'use client';
import {
	type AllConsentNames,
	type ComplianceRegion,
	type ComplianceSettings,
	type NamespaceProps,
	type PrivacyConsentState,
	createConsentManagerStore,
} from '@consent-management/core';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
/**
 * @packageDocumentation
 * Provides a React context-based consent management system for handling cookie and privacy preferences.
 */

/**
 * Configuration options for the ConsentManagerProvider component.
 *
 * @remarks
 * These props allow you to configure the initial state and behavior of the consent manager,
 * including GDPR types, compliance settings, and namespace configuration.
 *
 * @public
 */
interface ConsentManagerProviderProps extends NamespaceProps {
	/**
	 * @remarks
	 * React elements to be rendered within the consent manager context.
	 */
	children: ReactNode;

	/**
	 * @remarks
	 * Array of consent types to be pre-configured for GDPR compliance.
	 * These types define what kinds of cookies and tracking are initially allowed.
	 *
	 * @example
	 * ```tsx
	 * initialGdprTypes={['necessary', 'functional', 'analytics']}
	 * ```
	 */
	initialGdprTypes?: AllConsentNames[];

	/**
	 * @remarks
	 * Region-specific compliance settings that define how the consent manager
	 * should behave in different geographical regions.
	 *
	 * @example
	 * ```tsx
	 * initialComplianceSettings={{
	 *   'EU': { requireConsent: true, showBanner: true },
	 *   'US': { requireConsent: false, showBanner: false }
	 * }}
	 * ```
	 */
	initialComplianceSettings?: Record<ComplianceRegion, ComplianceSettings>;

	/**
	 * @remarks
	 * Whether to skip injecting default styles
	 * @default false
	 */
	noStyle?: boolean;
}

/**
 * Internal context value interface for the consent manager.
 *
 * @remarks
 * Combines both the current state and store instance for complete
 * consent management functionality.
 *
 * @internal
 */
interface ConsentManagerContextValue {
	/** Current privacy consent state */
	state: PrivacyConsentState;
	/** Store instance for managing consent state */
	store: ReturnType<typeof createConsentManagerStore>;
}

/**
 * React context for sharing consent management state.
 *
 * @remarks
 * This context provides access to both the current consent state and
 * the methods to modify it throughout the application.
 *
 * @internal
 */
export const ConsentStateContext = createContext<
	ConsentManagerContextValue | undefined
>(undefined);

/**
 * Provider component for consent management functionality.
 *
 * @remarks
 * This component initializes and manages the consent management system, including:
 * - Setting up the consent store with initial configuration
 * - Detecting user's region for compliance
 * - Managing consent state updates
 * - Providing access to consent management throughout the app
 * - Injecting default styles (unless noStyle is true)
 *
 * @example
 * Basic usage:
 * ```tsx
 * function App() {
 *   return (
 *     <ConsentManagerProvider>
 *       <YourApp />
 *     </ConsentManagerProvider>
 *   );
 * }
 * ```
 *
 * @example
 * With full configuration:
 * ```tsx
 * <ConsentManagerProvider
 *   namespace="MyApp"
 *   initialGdprTypes={['necessary', 'functional']}
 *   initialComplianceSettings={{
 *     'EU': { requireConsent: true, showBanner: true },
 *     'US': { requireConsent: false, showBanner: false }
 *   }}
 *   noStyle={false}
 * >
 *   <YourApp />
 * </ConsentManagerProvider>
 * ```
 *
 * @public
 */
export function ConsentManagerProvider({
	children,
	initialGdprTypes,
	initialComplianceSettings,
	namespace = 'ConsentManagerStore',
	noStyle = false,
}: ConsentManagerProviderProps) {
	// Create a stable reference to the store
	const store = useMemo(
		() => createConsentManagerStore(namespace),
		[namespace]
	);

	// Initialize state with the current state from the consent manager store
	const [state, setState] = useState<PrivacyConsentState>(store.getState());

	useEffect(() => {
		const { setGdprTypes, setComplianceSetting, setDetectedCountry } =
			store.getState();

		// Initialize GDPR types if provided
		if (initialGdprTypes) {
			setGdprTypes(initialGdprTypes);
		}

		// Initialize compliance settings if provided
		if (initialComplianceSettings) {
			for (const [region, settings] of Object.entries(
				initialComplianceSettings
			)) {
				setComplianceSetting(region as ComplianceRegion, settings);
			}
		}

		// Set detected country
		const country =
			document
				.querySelector('meta[name="user-country"]')
				?.getAttribute('content') || 'US';
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
		[state, store]
	);

	return (
		<ConsentStateContext.Provider value={contextValue}>
			{children}
		</ConsentStateContext.Provider>
	);
}

/**
 * Hook for accessing and managing consent state.
 *
 * @remarks
 * This hook provides access to the complete consent management API, including:
 * - Current consent state (what consents are given/required)
 * - Methods to update consents
 * - Compliance settings and region detection
 * - State persistence and retrieval
 *
 * The hook must be used within a ConsentManagerProvider component.
 *
 * @throws {Error}
 * Throws if used outside of a ConsentManagerProvider context.
 *
 * @example
 * Basic consent checking:
 * ```tsx
 * function CookieBanner() {
 *   const { isConsentRequired, hasConsent } = useConsentManager();
 *
 *   if (!isConsentRequired) return null;
 *
 *   return (
 *     <div>
 *       {!hasConsent('analytics') && (
 *         <p>Please accept analytics cookies to enable this feature.</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Managing consents:
 * ```tsx
 * function ConsentButtons() {
 *   const { saveConsents, setGdprTypes } = useConsentManager();
 *
 *   const handleAcceptAll = () => {
 *     setGdprTypes(['necessary', 'functional', 'analytics']);
 *     saveConsents('all');
 *   };
 *
 *   return (
 *     <button onClick={handleAcceptAll}>Accept All</button>
 *   );
 * }
 * ```
 *
 * @returns Combined state and methods for consent management
 * @public
 */
export function useConsentManager() {
	const context = useContext(ConsentStateContext);

	if (context === undefined) {
		throw new Error(
			'useConsentManager must be used within a ConsentManagerProvider'
		);
	}

	return {
		...context.state,
		...context.store.getState(),
	};
}
