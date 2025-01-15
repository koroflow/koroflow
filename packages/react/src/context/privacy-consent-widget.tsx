"use client"

import React, { useEffect, useCallback } from 'react'
import { usePrivacyConsentStore } from '../store/privacy-consent-store'
import { allConsentNames, ComplianceRegion, ComplianceSettings } from '../types/privacy'

interface PrivacyConsentProviderProps {
  children: React.ReactNode
  initialGdprTypes?: allConsentNames[]
  initialComplianceSettings?: Record<ComplianceRegion, ComplianceSettings>
}

export function PrivacyConsentProvider({ 
  children, 
  initialGdprTypes,
  initialComplianceSettings
}: PrivacyConsentProviderProps) {
  const setGdprTypes = usePrivacyConsentStore(state => state.setGdprTypes)
  const setComplianceSetting = usePrivacyConsentStore(state => state.setComplianceSetting)
  const setDetectedCountry = usePrivacyConsentStore(state => state.setDetectedCountry)

  useEffect(() => {
    if (initialGdprTypes) {
      setGdprTypes(initialGdprTypes)
    }
    if (initialComplianceSettings) {
      Object.entries(initialComplianceSettings).forEach(([region, settings]) => {
        setComplianceSetting(region as ComplianceRegion, settings)
      })
    }
    const country = document.querySelector('meta[name="user-country"]')?.getAttribute('content') || 'US'
    setDetectedCountry(country)
  }, [initialGdprTypes, initialComplianceSettings, setGdprTypes, setComplianceSetting, setDetectedCountry])

  return <>{children}</>
}

export function usePrivacyConsent() {
  const state = usePrivacyConsentStore()

  return {
    consents: state.consents,
    showPopup: state.showPopup,
    gdprTypes: state.gdprTypes,
    isPrivacyDialogOpen: state.isPrivacyDialogOpen,
    complianceSettings: state.complianceSettings,
    hasConsented: state.hasConsented,
    callbacks: state.callbacks,
    detectedCountry: state.detectedCountry,
    displayedConsents: state.getDisplayedConsents(),
    setConsent: useCallback(state.setConsent, []),
    setShowPopup: useCallback(state.setShowPopup, []),
    setIsPrivacyDialogOpen: useCallback(state.setIsPrivacyDialogOpen, []),
    saveConsents: useCallback(state.saveConsents, []),
    resetConsents: useCallback(state.resetConsents, []),
    setGdprTypes: useCallback(state.setGdprTypes, []),
    setComplianceSetting: useCallback(state.setComplianceSetting, []),
    resetComplianceSettings: useCallback(state.resetComplianceSettings, []),
    setCallback: useCallback(state.setCallback, []),
  }
}

