"use client";
import type {
	PrivacyConsentState,
	createConsentManagerStore,
} from "@koroflow/core-js";
import { useContext } from "react";
import { ConsentStateContext } from "./consent-manager";

/**
 * A custom React hook that provides access to the privacy consent state and methods.
 *
 * @returns An object containing both the privacy consent state and store methods.
 *
 * @remarks
 * This hook must be used within a ConsentManagerProvider component.
 * It provides access to both the consent state and store methods for managing consent.
 *
 * @throws {Error} If used outside of a ConsentManagerProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isConsentRequired, setGdprTypes } = useConsentManager();
 *   return (
 *     <div>
 *       {isConsentRequired && (
 *         <button onClick={() => setGdprTypes(['analytics'])}>
 *           Accept Analytics
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useConsentManager(): PrivacyConsentState &
	ReturnType<typeof createConsentManagerStore>["getState"] {
	const context = useContext(ConsentStateContext);

	if (context === undefined) {
		throw new Error(
			"useConsentManager must be used within a ConsentManagerProvider",
		);
	}

	const storeState = context.store.getState();

	return {
		...context.state,
		...storeState,
	} as PrivacyConsentState &
		ReturnType<typeof createConsentManagerStore>["getState"];
}
