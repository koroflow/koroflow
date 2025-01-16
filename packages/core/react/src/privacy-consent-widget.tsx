"use client";

import React, { useEffect } from "react";
import {
  AllConsentNames,
  ComplianceRegion,
  NamespaceProps,
  ComplianceSettings,
  createConsentManagerStore,
} from "@koroflow/core-js";

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
 * ConsentManagerProvider component initializes and provides consent management context.
 *
 * @param {ConsentManagerProviderProps} props - The properties for the provider.
 * @returns {JSX.Element} The rendered children components.
 */
export function ConsentManagerProvider({
  children,
  initialGdprTypes,
  initialComplianceSettings,
  namespace = "KoroflowStore",
}: ConsentManagerProviderProps) {
  useEffect(() => {
    const { setGdprTypes, setComplianceSetting, setDetectedCountry } =
      createConsentManagerStore(namespace).getState();

    if (initialGdprTypes) {
      setGdprTypes(initialGdprTypes);
    }
    if (initialComplianceSettings) {
      Object.entries(initialComplianceSettings).forEach(
        ([region, settings]) => {
          setComplianceSetting(region as ComplianceRegion, settings);
        }
      );
    }
    const country =
      document
        .querySelector('meta[name="user-country"]')
        ?.getAttribute("content") || "US";
    setDetectedCountry(country);
  }, [initialGdprTypes, initialComplianceSettings]);

  return <>{children}</>;
}
