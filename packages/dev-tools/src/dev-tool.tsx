"use client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Router } from "./router/router";
import { PrivacyConsentState } from "@koroflow/core-js";
import { ErrorState } from "./components/error-state";
import { Header } from "./components/header";
import DevToolWrapper from "./components/wrapper";

const PrivacyConsentContext = createContext<{
  state: PrivacyConsentState | null;
  store: any | null;
} | null>(null);

export const getStore = () => {
  const context = useContext(PrivacyConsentContext);
  if (context === null) {
    throw new Error(
      "useConsentManagerContext must be used within a ConsentManagerProvider"
    );
  }
  
  // Create a subscription to the store updates
  const [localState, setLocalState] = useState(context.state);
  
  useEffect(() => {
    if (!context.store) return;
    
    // Update local state when context state changes
    setLocalState(context.state);
    
    // Subscribe to store updates
    const unsubscribe = context.store.subscribe((newState: PrivacyConsentState) => {
      setLocalState(newState);
    });
    
    return () => {
      unsubscribe();
    };
  }, [context.store, context.state]);
  
  return localState;
};

export default PrivacyConsentContext;

interface ConsentManagerProviderProps {
  namespace?: string;
}

export const KoroflowDevTool: React.FC<ConsentManagerProviderProps> = ({
  namespace = 'KoroflowStore'
}) => {
  const [state, setState] = useState<PrivacyConsentState | null>(null);
  const [store, setStore] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const storeInstance =
      (typeof window !== "undefined" && (window as any)[namespace]) ||
      null;
      
    if (storeInstance) {
      setStore(storeInstance);
      const currentState = storeInstance.getState() as PrivacyConsentState;
      setState(currentState);
      
      // Subscribe to store updates
      const unsubscribe = storeInstance.subscribe((newState: PrivacyConsentState) => {
        setState(newState);
      });
      
      return () => {
        unsubscribe();
      };
    } else {
      console.log(`${namespace} is not available on the window object.`);
    }
  }, [namespace]);

  return (
    <PrivacyConsentContext.Provider value={{ state, store }}>
      <DevToolWrapper isOpen={isOpen} toggleOpen={toggleOpen}>
        <Header onClose={() => setIsOpen(false)} />
        {state ? (
          <Router onClose={() => setIsOpen(false)} />
        ) : (
          <ErrorState namespace={namespace} />
        )}
      </DevToolWrapper>
    </PrivacyConsentContext.Provider>
  );
};