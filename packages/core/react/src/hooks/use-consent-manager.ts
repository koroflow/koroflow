import { useEffect, useState } from "react";
import {
  createConsentManagerStore,
  PrivacyConsentState,
  NamespaceProps,
} from "@koroflow/core-js";

/**
 * Options for configuring the useConsentManager hook.
 */
interface UseConsentManagerOptions extends NamespaceProps {}

/**
 * A custom React hook that manages privacy consent state using a consent manager store.
 *
 * @param options - The options for configuring the consent manager, including the namespace.
 * @returns The current privacy consent state.
 *
 * @remarks
 * This hook initializes a consent manager store with the specified namespace and subscribes to its state changes.
 * It returns the current state of the privacy consents, allowing components to react to changes.
 */
export function useConsentManager({
  namespace = "KoroflowStore",
}: UseConsentManagerOptions = {}) {
  // Initialize state with the current state from the consent manager store
  const [state, setState] = useState<PrivacyConsentState>(
    createConsentManagerStore(namespace).getState()
  );

  useEffect(() => {
    // Subscribe to state changes in the consent manager store
    const unsubscribe = createConsentManagerStore(namespace).subscribe(
      (newState) => {
        // Update the state when a new state is emitted
        setState(newState);
      }
    );

    // Cleanup function to unsubscribe from the store when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [namespace]); // Re-run the effect if the namespace changes

  // Return the current privacy consent state
  return state;
}
