"use client"

import React, { useEffect, useState } from 'react';
import { AllConsentNames, ComplianceRegion, ComplianceSettings, PrivacyConsentState, store } from '@koroflow/core-js';


interface PrivacyConsentProviderProps {
  children: React.ReactNode;
  initialGdprTypes?: AllConsentNames[];
  initialComplianceSettings?: Record<ComplianceRegion, ComplianceSettings>;
}

export function PrivacyConsentProvider({ 
  children, 
  initialGdprTypes,
  initialComplianceSettings
}: PrivacyConsentProviderProps) {
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

export function usePrivacyConsent() {
  const [state, setState] = useState<PrivacyConsentState>(store.getState());

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}

