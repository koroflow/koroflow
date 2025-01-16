"use client"

import React, { useEffect, useState } from 'react';
import { AllConsentNames, ComplianceRegion, ComplianceSettings, PrivacyConsentState, store } from '@koroflow/core-js';


interface ConsentManagerProviderProps {
  children: React.ReactNode;
  initialGdprTypes?: AllConsentNames[];
  initialComplianceSettings?: Record<ComplianceRegion, ComplianceSettings>;
}

export function ConsentManagerProvider({ 
  children, 
  initialGdprTypes,
  initialComplianceSettings
}: ConsentManagerProviderProps) {
  useEffect(() => {
    const { setGdprTypes, setComplianceSetting, setDetectedCountry } = store.getState();

    if (initialGdprTypes) {
      setGdprTypes(initialGdprTypes);
    }
    if (initialComplianceSettings) {
      Object.entries(initialComplianceSettings).forEach(([region, settings]) => {
        setComplianceSetting(region as ComplianceRegion, settings);
      });
    }
    const country = document.querySelector('meta[name="user-country"]')?.getAttribute('content') || 'US';
    setDetectedCountry(country);
  }, [initialGdprTypes, initialComplianceSettings]);

  return <>{children}</>;
}

export function useConsentManager() {
  const [state, setState] = useState<PrivacyConsentState>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}

