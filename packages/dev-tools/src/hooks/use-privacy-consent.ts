

import { useEffect, useCallback } from 'react'
import { useConsentRender } from './use-consent-render'
import { usePrivacyConsentStore,allConsentNames, ComplianceRegion, ComplianceSettings } from '@better-events/react'

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

  return children
}

export function usePrivacyConsent() {
  const state = usePrivacyConsentStore()
  const { renderIfConsent } = useConsentRender(state.getEffectiveConsents)

  const setConsentWithUpdate = useCallback((name: allConsentNames, value: boolean) => {
    state.setConsent(name, value)
    state.updateConsentMode()
  }, [state])

  const saveConsentsWithUpdate = useCallback((type: 'all' | 'custom' | 'necessary') => {
    state.saveConsents(type)
    state.updateConsentMode()
  }, [state])

  return {
    consents: state.consents,
    consentInfo: state.consentInfo,
    showPopup: state.showPopup,
    gdprTypes: state.gdprTypes,
    isPrivacyDialogOpen: state.isPrivacyDialogOpen,
    complianceSettings: state.complianceSettings,
    callbacks: state.callbacks,
    detectedCountry: state.detectedCountry,
    displayedConsents: state.getDisplayedConsents(),
    setConsent: setConsentWithUpdate,
    setShowPopup: state.setShowPopup,
    setIsPrivacyDialogOpen: state.setIsPrivacyDialogOpen,
    saveConsents: saveConsentsWithUpdate,
    resetConsents: state.resetConsents,
    setGdprTypes: state.setGdprTypes,
    setComplianceSetting: state.setComplianceSetting,
    resetComplianceSettings: state.resetComplianceSettings,
    setCallback: state.setCallback,
    hasConsented: state.hasConsented,
    clearAllData: state.clearAllData,
    getEffectiveConsents: state.getEffectiveConsents,
    hasConsentFor: state.hasConsentFor,
    renderIfConsent,
    privacySettings: state.privacySettings,
    setPrivacySettings: state.setPrivacySettings,
  }
}

