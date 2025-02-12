'use client';

import {
	type ComplianceRegion,
	type PrivacyConsentState,
	createConsentManagerStore,
	defaultTranslationConfig,
} from '@consent-management/core';
import { useEffect, useMemo, useState } from 'react';
import { ConsentStateContext } from '../context/consent-manager-context';
import type { ConsentManagerProviderProps } from '../types/consent-manager';
import {
	detectBrowserLanguage,
	mergeTranslationConfigs,
} from '../utils/translations';

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
 * @public
 */
export function ConsentManagerProvider({
	children,
	initialGdprTypes,
	initialComplianceSettings,
	namespace = 'KoroflowStore',
	noStyle = false,
	translationConfig,
	trackingBlockerConfig,
}: ConsentManagerProviderProps) {
	const preparedTranslationConfig = useMemo(() => {
		const mergedConfig = mergeTranslationConfigs(
			defaultTranslationConfig,
			translationConfig
		);
		const defaultLanguage = detectBrowserLanguage(
			mergedConfig.translations,
			mergedConfig.defaultLanguage,
			mergedConfig.disableAutoLanguageSwitch
		);
		return { ...mergedConfig, defaultLanguage };
	}, [translationConfig]);

	// Create a stable reference to the store with prepared translation config
	const store = useMemo(() => {
		const store = createConsentManagerStore(namespace, {
			trackingBlockerConfig,
		});
		// Set translation config immediately
		store.getState().setTranslationConfig(preparedTranslationConfig);
		return store;
	}, [namespace, preparedTranslationConfig, trackingBlockerConfig]);

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
